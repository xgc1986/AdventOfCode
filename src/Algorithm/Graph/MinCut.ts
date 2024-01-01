import DirectedGraph, {Vertex} from "src/Graph";
import {StringMap} from "src/Utils";
import * as console from "console";

export default class MinCut {

    static solve(graph: DirectedGraph): Vertex[][] {
        if (graph.size < 2) {
            throw new Error("Graph must have at least 2 vertices");
        }

        const residualGraph = graph.clone();
        const parent: StringMap<Vertex> = {};

        const s = residualGraph.vertices[0];
        const t = residualGraph.vertices[graph.size - 1];

        while (this.bfs(residualGraph, s, t, parent)) {
            let pathFlow = Number.MAX_VALUE;
            for (let v = t; v !== s; v = parent[v.id]) {
                let u = parent[v.id];
                const edge = u.getEdge(v);
                if (edge !== undefined) {
                    pathFlow = Math.min(pathFlow, edge.weight);
                }
            }

            for (let v = t; v.id !== s.id; v = parent[v.id]) {
                let u = parent[v.id];
                residualGraph.addEdge(u.id, v.id, (u.getEdge(v)?.weight ?? 0) - pathFlow);
                residualGraph.addEdge(v.id, u.id, (v.getEdge(u)?.weight ?? 0) + pathFlow);
            }
        }

        const isVisited: StringMap<Vertex> = {};
        MinCut.dfs(residualGraph, s, isVisited);
        const ret: Vertex[][] = [];
        for (let i = 0; i < graph.vertices.length; i++) {
            for (let j = 0; j < graph.vertices.length; j++) {
                const vi = graph.vertices[i];
                const vj = graph.vertices[j];

                const edge = vi.getEdge(vj);
                if (edge !== undefined) {
                    if (edge.weight > 0 && isVisited[vi.id] && (isVisited[vj.id] === undefined)) {
                        ret.push([vi, vj]);
                    }
                }
            }
        }

        return ret;
    }

    private static dfs(residualGraph: DirectedGraph, vertex: Vertex, visited: StringMap<Vertex>): void {
        visited[vertex.id] = vertex;

        for (const edge of vertex.edges) {
            if (edge.weight > 0 && visited[edge.vertex.id] === undefined) {
                this.dfs(residualGraph, edge.vertex, visited);
            }
        }
    }

    private static bfs(residualGraph: DirectedGraph, source: Vertex, sink: Vertex, parent: StringMap<Vertex | undefined>): boolean {
        const queue: Vertex[] = [source];
        const visited: StringMap<boolean> = {};
        parent[source.id] = undefined;
        visited[source.id] = true;

        while (queue.length > 0) {
            const vertex = queue.shift() as Vertex;

            for (const i of residualGraph.vertices) {
                const edge = vertex.getEdge(i);
                if (edge !== undefined && edge.weight > 0 && visited[i.id] === undefined) {
                    queue.push(i);
                    parent[i.id] = vertex;
                    visited[i.id] = true;
                }
            }
        }

        return visited[sink.id] !== undefined;
    }
}