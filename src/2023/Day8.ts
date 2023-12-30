"use strict";

// [[https://adventofcode.com/2023/day/8]]
// Input file [[inputs/2023/day8.input.txt]]

import Puzzle from "src/Puzzle.ts";
import {Debug, UMap, UMath} from "src/Utils.ts";
import {DirectedGraph} from "src/Graph.ts";

interface Camel {
    direction: string,
    map: UMap<string[]>;
}

type Input = Camel;

export default class Day8 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const lines = input.split('\n').filter((line) => line !== '');
        const camel: Camel = {
            direction: lines[0],
            map: {}
        };

        const graph = new DirectedGraph();
        for (let i = 1; i < lines.length; i++) {
            const nodes = lines[i].match(/(\w+)/gi) ?? ['', '', ''];
            camel.map[nodes[0]] = [nodes[1], nodes[2]];
            graph.addEdge(nodes[0], nodes[1], 1);
            graph.addEdge(nodes[0], nodes[2], 1);
        }

        Debug.generateGraph(graph, false);

        return camel;
    }

    async run1(camel: Input): Promise<number> {
        let steps = 0;
        let index = 0;
        let node = 'AAA';

        while (node !== 'ZZZ') {
            steps++;

            if (camel.direction[index] === 'L') {
                node = camel.map[node][0];
            } else {
                node = camel.map[node][1];
            }

            index = (index + 1) % camel.direction.length;
        }

        return steps;
    }

    async run2(camel: Input): Promise<number> {
        const ghosts = [];
        for (const node in camel.map) {
            if (node.endsWith('A')) {
                ghosts.push(node);
            }
        }

        const cycles: number[] = [];
        for (const ghost of ghosts) {
            let steps = 0;
            let index = 0;
            let node = ghost;

            while (!node.endsWith('Z')) {
                steps++;

                if (camel.direction[index] === 'L') {
                    node = camel.map[node][0];
                } else {
                    node = camel.map[node][1];
                }

                index = (index + 1) % camel.direction.length;
            }

            cycles.push(steps);
        }

        return cycles.reduce((acc, cycle) => UMath.lcm(acc, cycle), 1);
    }
}