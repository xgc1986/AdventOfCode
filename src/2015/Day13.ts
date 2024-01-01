"use strict";

// [[https://adventofcode.com/2015/day/13]]
// Input file [[inputs/2015/day13.input.txt]]

import Puzzle from "src/Puzzle";
import Graph, {UndirectedGraph, Vertex} from "src/Graph";
import {Debug, StringMap} from "src/Utils";

type Solution = number | undefined;

type Input = Graph;

export default class Day13 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const graph = new UndirectedGraph();

        for (const line of input.split("\n")) {
            // Alice would gain 54 happiness units by sitting next to Bob.
            const [_, from, action, weight, to] = line.match(/(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)./) || ['', '', '', '', ''];

            const fromV = graph.addVertex(from);
            const toV = graph.addVertex(to);

            const previousWeight = fromV.getEdge(toV)?.weight ?? 0;

            if (action === "gain") {
                graph.addEdge(fromV, toV, previousWeight + (+weight));
            } else {
                graph.addEdge(fromV, toV, previousWeight -(+weight));
            }
        }

        Debug.generateGraph(graph, true, 'dot');

        return graph;
    }

    optimal(graph: Graph, visited: StringMap<boolean> = {}, from: Vertex|undefined = undefined, score: number = 0): number {
        from ??= graph.vertices[0];
        visited[from.id] = true;

        const allSeated = Object.keys(visited).length === graph.size && Object.values(visited).every(Boolean);
        if (allSeated) {
            return score + (from.getEdge(graph.vertices[0])?.weight ?? 0);
        }

        let best = -Infinity;
        for (const edge of from.edges) {
            if (!visited[edge.vertex.id]) {
                visited[edge.vertex.id] = true;
                best = Math.max(best, this.optimal(graph, visited, edge.vertex, score + edge.weight));
                visited[edge.vertex.id] = false;
            }
        }

        return best;
    }

    async run1(graph: Input): Promise<Solution> {
        return this.optimal(graph);
    }

    async run2(graph: Input): Promise<Solution> {
        for (const vertex of graph.vertices) {
            graph.addEdge('Me', vertex, 0);
            graph.addEdge(vertex, 'Me', 0);
        }

        return this.optimal(graph);
    }
}