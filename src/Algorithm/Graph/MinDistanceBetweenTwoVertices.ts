import DirectedGraph, {Vertex} from "src/Graph";
import {UMap} from "src/Utils";

export default class MinDistanceBetweenTwoVertices {

    static solve(graph: DirectedGraph, from: string, to: string, path: Vertex[]): number {
        const visited: UMap<boolean> = {};
        visited[from] = true;
        path.push(graph.getVertex(from));

        return MinDistanceBetweenTwoVertices.minDistance(graph, from, to, visited, 0, path);
    }

    private static minDistance(graph: DirectedGraph, from: string, to: string, visited: UMap<boolean> = {}, weight: number, path: Vertex[]): number {
        if (from === to) {
            return weight;
        }

        const vertex = graph.getVertex(from);

        let minDistance = Number.MAX_VALUE;
        let bestPath = path;
        for (const edge of vertex.edges) {
            if (!visited[edge.vertex.id]) {
                const clonePath = [...path];
                clonePath.push(edge.vertex);
                visited[edge.vertex.id] = true;
                const distance = MinDistanceBetweenTwoVertices.minDistance(graph, edge.vertex.id, to, visited, weight + edge.weight, clonePath);
                visited[edge.vertex.id] = false;
                if (distance < minDistance) {
                    bestPath = clonePath;
                    minDistance = distance;
                }
            }
        }

        for (let i = path.length; i < bestPath.length; i++) {
            path.push(bestPath[i]);
        }

        return minDistance;
    }
}