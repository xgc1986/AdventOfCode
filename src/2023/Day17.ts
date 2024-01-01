"use strict";

import { Heap } from 'heap-js';

// [[https://adventofcode.com/2023/day/17]]
// Input file [[inputs/2023/day17.input.txt]]

import Puzzle from "src/Puzzle";
import {StringMap} from "src/Utils";

type Solution = number | string| undefined;

interface Cell {
    i: number;
    j: number;
    heat: number;
    dir: number[];
    momentum: number;
}

type Input = number[][];

export default class Day17 extends Puzzle<Input> {

    private directions = {
        U: [-1, 0],
        D: [1, 0],
        L: [0, -1],
        R: [0, 1],
    };

    solve(map: number[][], minMomentum: number, maxMomentum: number): number|undefined {
        const heap = new Heap<Cell>((a, b) => a.heat - b.heat);

        heap.init([
            { i: 1, j: 0, heat: 0, dir: this.directions.D, momentum: 1 },
            { i: 0, j: 1, heat: 0, dir: this.directions.R, momentum: 1 },
        ]);
        const seen: StringMap<number>[][] = map.map((row) => row.map(() => ({})));
        while (heap.length) {
            const h = heap.pop();
            if (h === undefined) {
                continue;
            }
            const { i, j, heat, dir, momentum } = h;
            const key = dir.concat(momentum).join();
            if (!map[i]?.[j] || seen[i][j][key]) {
                continue;
            }

            seen[i][j][key] = 1;

            if (
                i === map.length - 1 &&
                j === map[0].length - 1 &&
                momentum >= minMomentum
            ) {
                return heat + map[i][j];
            }

            const nextDirs = [];
            switch (momentum >= minMomentum && dir) {
                case this.directions.U:
                case this.directions.D:
                    nextDirs.push(this.directions.L);
                    nextDirs.push(this.directions.R);
                    break;
                case this.directions.L:
                case this.directions.R:
                    nextDirs.push(this.directions.U);
                    nextDirs.push(this.directions.D);
            }
            if (momentum < maxMomentum) {
                nextDirs.push(dir);
            }
            for (const nextDir of nextDirs) {
                const [di, dj] = nextDir;
                heap.push({
                    i: i + di,
                    j: j + dj,
                    heat: heat + map[i][j],
                    dir: nextDir,
                    momentum: 1 + +(dir === nextDir) * momentum,
                });
            }
        }
    }

    parseInput(input: string): Input {
        return input.split('\n').filter((line) => line !== '').map((line) => line.split('').map(Number));
    }

    async run1(map: Input): Promise<Solution> {
        return this.solve(map, 0, 3);
    }

    async run2(map: Input): Promise<Solution> {
        return this.solve(map, 4, 10);
    }
}