"use strict";

// [[https://adventofcode.com/2023/day/21]]
// Input file [[inputs/2023/day21.input.txt]]

import Puzzle from "src/Puzzle.ts";
import {UArray, UMap, UMath} from "src/Utils.ts";
import * as console from "console";
import * as process from "process";

type Solution = number | string | undefined;

type Input = string[][];

export default class Day21 extends Puzzle<Input> {

    private directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    private counts = [1];

    parseInput(input: string): Input {
        return input.split('\n').filter((line) => line !== '').map((line) => line.split(''));
    }

    private walk(map: string[][], x: number, y: number, steps: number): number {
        let positions = new Set();
        positions.add(`${x},${y}`);

        const size = map.length;

        const counts = [];
        for (let i = 0; i < steps; i++) {
            const nextPositions = new Set<string>();
            for (const p of positions) {

                const [x, y] = (p as string).split(',').map(Number);
                for (const [dr, dc] of this.directions) {
                    const r2 = y + dr;
                    const c2 = x + dc;

                    if (map[UMath.mod(r2, size)][UMath.mod(c2, size)] !== '#') {
                        nextPositions.add(`${c2},${r2}`);
                    }
                }
            }

            positions = nextPositions;
            if ((i + 1) % size === steps % size) {
                if (
                    counts.length >= 3 &&
                    positions.size - 2 * (counts.at(-1) ?? 0) + (counts.at(-2) ?? 0) ===
                    (counts.at(-1) ?? 0) - 2 * (counts.at(-2) ?? 0) + (counts.at(-3) ?? 0)
                ) {
                    break;
                }
                counts.push(positions.size);
            }
        }

        const d2 = (counts.at(-1) ?? 0) - 2 * (counts.at(-2) ?? 0) + (counts.at(-3) ?? 0);
        for (let i = counts.length * size + (steps % size); i <= steps; i += size) {
            counts.push(d2 + 2 * (counts.at(-1) ?? 0) - (counts.at(-2) ?? 0));
        }
        return (counts.at(-1)) ?? 0;
    }

    async run1(map: Input): Promise<Solution> {
        let x = -1;
        let y = -1;
        for (let i = 0; i < map.length; i++) {
            if (x >= 0) {
                break;
            }
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] === 'S') {
                    x = j;
                    y = i;
                    break;
                }
            }
        }

        return this.walk(map, x, y, 64);
    }

    async run2(map: Input): Promise<Solution> {
        let x = -1;
        let y = -1;
        for (let i = 0; i < map.length; i++) {
            if (x >= 0) {
                break;
            }
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] === 'S') {
                    x = j;
                    y = i;
                    break;
                }
            }
        }

        return this.walk(map, x, y, 26501365);
    }
}
