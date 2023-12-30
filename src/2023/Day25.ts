"use strict";

// https://adventofcode.com/2023/day/25
// Input file [[inputs/2023/day25.input.txt]]

import Puzzle from "src/Puzzle.ts";
import Graph, {UndirectedGraph} from "src/Graph.ts";
import MinCut from "src/Algorithm/Graph/MinCut.ts";
import {Debug} from "src/Utils.ts";

type Input = Graph;

export default class DaySample extends Puzzle<Input> {

    parseInput(input: string): Input {
        const lines = input.split('\n').filter((line) => line !== '');
        const graph = new UndirectedGraph();

        for (const line of lines) {
            const parts = line.split(':');
            for (const destiny of parts[1].trim().split(' ')) {
                graph.addEdge(parts[0], destiny, 1);
            }
        }

        Debug.generateGraph(graph, false);

        return graph;
    }

    async run1(input: Input): Promise<number> {
        return this.run1Fast(input);
    }

    async run1Fast(input: Input): Promise<number> {
        const edges = [
            ['dqf', 'cbx'],
            ['pzv', 'xft'],
            ['hbr', 'sds'],
        ];

        for (const edge of edges) {
            input.removeEdge(edge[0], edge[1]);
        }

        const graphs = input.separate();

        if (graphs.length === 1) {
            Debug.generateGraph(input, false);
            console.log(`Check file 'outputs/2023/day25b.svg' and add the valid edges, then execute problem again.`);
        }

        return graphs.reduce((acc, graph) => acc * graph.size, 1);
    }

    async run1Slow(input: Input): Promise<number> {
        const pairs = MinCut.solve(input);
        for (const vertices of pairs) {
            input.removeEdge(vertices[0], vertices[1]);
            input.removeEdge(vertices[1], vertices[0]);
        }
        const graphs = input.separate();
        return graphs.reduce((acc, graph) => acc * graph.size, 1);
    }

    async run2(): Promise<string> {
        return ':)';
    }
}