"use strict";

// [[https://adventofcode.com/2023/day/23]]
// Input file [[inputs/2023/day23.input.txt]]

import Puzzle from "src/Puzzle.ts";
import Graph, {DirectedGraph, Vertex} from "src/Graph.ts";
import {UArray} from "src/Utils.ts";
import MaxDistance from "src/Algorithm/Graph/MaxDistance.ts";

type Solution = number | string | undefined;

type Input = {
    graph: Graph,
    map: string[][]
};

export default class Day23 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const map = input.split('\n').filter((line) => line !== '').map((line) => line.split(''));
        const graph = new DirectedGraph();
        const v = graph.addVertex(`"1,1"`);
        const queue: {
            x: number,
            y: number,
            v: Vertex,
            w: number,
            slope: number,
            prev: { x: number, y: number }
        }[] = [{col: 1, row: 0, v, w: 0, slope: 1, prev: {col: -10, row: -10}}];

        graph.addVertex(`"${map[0].length - 2},${map.length - 1}"`);
        map[map.length - 1][map[0].length - 2] = 'O';

        while (queue.length > 0) {
            const pos = queue.shift();

            if (pos === undefined) {
                continue;
            }

            const hash = `"${pos.x},${pos.y}"`;

            if (map[pos.y][pos.x] === 'O') {
                if (pos.v.id === hash) {
                    continue;
                }

                pos.v.addEdge(graph.getVertex(hash), pos.w * pos.slope);

                continue;
            }

            // map[pos.y][pos.x] = '#';

            let source = pos.v;
            let weight = pos.w;
            let slope = pos.slope;
            let options = 0;
            let top = UArray.matrixValue(map, pos.x, pos.y - 1);
            let bottom = UArray.matrixValue(map, pos.x, pos.y + 1);
            let left = UArray.matrixValue(map, pos.x - 1, pos.y);
            let right = UArray.matrixValue(map, pos.x + 1, pos.y);
            let canGoTop = false;
            let canGoBottom = false;
            let canGoLeft = false;
            let canGoRight = false;

            if (top !== undefined && top !== '#' && pos.prev.y !== (pos.y - 1)) {
                options++;
                canGoTop = true;
            }
            if (bottom !== undefined && bottom !== '#' && pos.prev.y !== (pos.y + 1)) {
                options++;
                canGoBottom = true;
            }
            if (left !== undefined && left !== '#' && pos.prev.x !== (pos.x - 1)) {
                options++;
                canGoLeft = true;
            }
            if (right !== undefined && right !== '#' && pos.prev.x !== (pos.x + 1)) {
                options++;
                canGoRight = true;
            }

            if (options > 1) {
                canGoTop = top !== undefined && top !== '#';
                canGoBottom = bottom !== undefined && bottom !== '#';
                canGoLeft = left !== undefined && left !== '#';
                canGoRight = right !== undefined && right !== '#';

                const newVertex = graph.addVertex(hash);
                pos.v.addEdge(newVertex, pos.w * slope);
                map[pos.y][pos.x] = 'O'
                source = newVertex;
                weight = 0;
                slope = 1;
            }

            if (canGoTop) {
                let s = slope;
                if (top === 'v') {
                    s = -1;
                }
                queue.push({
                    col: pos.x,
                    row: pos.y - 1,
                    v: source,
                    w: weight + 1,
                    slope: s,
                    prev: {col: pos.x, row: pos.y}
                });
            }

            if (canGoBottom) {
                let s = slope;
                if (bottom === '^') {
                    s = -1;
                }

                queue.push({
                    col: pos.x,
                    row: pos.y + 1,
                    v: source,
                    w: weight + 1,
                    slope: s,
                    prev: {col: pos.x, row: pos.y}
                });
            }

            if (canGoLeft) {
                let s = slope;
                if (left === '>') {
                    s = -1;
                }
                queue.push({
                    col: pos.x - 1,
                    row: pos.y,
                    v: source,
                    w: weight + 1,
                    slope: s,
                    prev: {col: pos.x, row: pos.y}
                });
            }

            if (canGoRight) {
                let s = slope;
                if (right === '<') {
                    s = -1;
                }
                queue.push({
                    col: pos.x + 1,
                    row: pos.y,
                    v: source,
                    w: weight + 1,
                    slope: s,
                    prev: {col: pos.x, row: pos.y}
                });
            }
        }

        return {
            graph,
            map
        };
    }

    async run1(input: Input): Promise<Solution> {
        const path: Vertex[] = [];

        const graph = input.graph.clone();
        for (const vertex of graph.vertices) {
            for (const edge of vertex.edges) {
                if (edge.weight < 0) {
                    vertex.removeEdge(edge.vertex);
                }
            }
        }

        return MaxDistance.solve(graph, '"1,1"', `"${input.map[0].length - 2},${input.map.length - 1}"`, path);
    }

    async run2(input: Input): Promise<Solution> {
        const path: Vertex[] = [];

        const graph = input.graph.clone();
        for (const vertex of graph.vertices) {
            for (const edge of vertex.edges) {
                if (edge.weight < 0) {
                    vertex.addEdge(edge.vertex, -edge.weight);
                }
            }
        }

        return MaxDistance.solve(graph, '"1,1"', `"${input.map[0].length - 2},${input.map.length - 1}"`, path);
    }
}