"use strict";

// [[https://adventofcode.com/2022/day/16]]
// Input file [[inputs/2022/day16.input.txt]]

import Puzzle from "src/Puzzle";
import Graph, {UndirectedGraph} from "src/Graph";
import {Debug, UMap} from "src/Utils";

type Solution = number | undefined;

interface Cave {
    flows: UMap<number>;
    map: Graph;
}

type Input = Cave;

export default class Day16 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const graph = new UndirectedGraph();
        const lines = input.split('\n');
        const flows: UMap<number> = {};
        const distances: UMap<number> = {};

        for (const line of lines) {
            const [_, from, flow, __, destinations] = line.match(/Valve (\w+) has flow rate=(\d+); (tunnels lead to valves|tunnel leads to valve) ([\w, ]+)/) ?? ['', '', '', ''];
            distances[from] = Number.MAX_SAFE_INTEGER;
            flows[from] = +flow;
            for (const destination of destinations.split(', ')) {
                graph.addEdge(from, destination, 1);
            }
        }

        Debug.generateGraph(graph, true, 'dot', 'full');

        return {
            map: graph,
            flows: flows,
        };
    }

    calculateFlow(cave: Cave, from: string, opened: UMap<boolean>, minutes: number, withElephant: boolean, cache: UMap<UMap<number>>): number {
        if (minutes === 0) {
            return !withElephant ? 0 : this.calculateFlow(cave, 'AA', opened, 26, false, cache);
        }

        let key = '';
        for (const k of Object.keys(opened).sort()) {
            if (opened[k]) {
                key += k;
            }
        }
        key = `${key}${minutes}${withElephant ? 'E' : 'P'}`;

        cache[from] ??= {};
        if (cache[from][key] !== undefined) {
            return cache[from][key];
        }
        let max = 0;

        if (!opened[from] && cave.flows[from] > 0) {
            opened[from] = true;
            const flow = cave.flows[from] * (minutes - 1);
            max = Math.max(flow + this.calculateFlow(cave, from, opened, minutes - 1, withElephant, cache), max);
            opened[from] = false;
        }

        const v = cave.map.getVertex(from);
        for (const edge of v.edges) {
            max = Math.max(this.calculateFlow(cave, edge.vertex.id, opened, minutes - 1, withElephant, cache), max);
        }

        cache[from][key] = max;

        return max;
    }

    async run1(cave: Input): Promise<Solution> {
        let opened: UMap<boolean> = {};
        for (const id in cave.flows) {
            opened[id] = false;
        }
        return this.calculateFlow(cave, 'AA', opened, 30, false, {});
    }

    async run2(cave: Input): Promise<Solution> {
        let opened: UMap<boolean> = {};
        for (const id in cave.flows) {
            opened[id] = false;
        }
        return this.calculateFlow(cave, 'AA', opened, 26, true, {});
    }
}