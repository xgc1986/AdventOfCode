import DirectedGraph, {Vertex} from "src/Graph";
import {UMap} from "src/Utils";

export default class MaxDistanceBetweenTwoVertices {

    static solve(graph: DirectedGraph, from: string, to: string, path: Vertex[]): number {
        const visited: UMap<boolean> = {};
        visited[from] = true;
        path.push(graph.getVertex(from));

        return MaxDistanceBetweenTwoVertices.maxDistance(graph, from, to, visited, 0, path);
    }

    private static maxDistance(graph: DirectedGraph, from: string, to: string, visited: UMap<boolean> = {}, weight: number, path: Vertex[]): number {
        if (from === to) {
            return weight;
        }

        const vertex = graph.getVertex(from);

        let maxDistance = 0;
        let bestPath = path;
        for (const edge of vertex.edges) {
            if (!visited[edge.vertex.id]) {
                const clonePath = [...path];
                clonePath.push(edge.vertex);
                visited[edge.vertex.id] = true;
                const distance = MaxDistanceBetweenTwoVertices.maxDistance(graph, edge.vertex.id, to, visited, weight + edge.weight, clonePath);
                visited[edge.vertex.id] = false;
                if (distance > maxDistance) {
                    bestPath = clonePath;
                    maxDistance = distance;
                }
            }
        }

        for (let i = path.length; i < bestPath.length; i++) {
            path.push(bestPath[i]);
        }

        return maxDistance;
    }
}