"use strict";

// [[https://adventofcode.com/2022/day/15]]
// Input file [[inputs/2022/day15.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | undefined;

type Input = string[];

export default class Day15 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n');
    }

    async run1(lines: Input): Promise<Solution> {
        const Y = this.mode !== 'input' ? 2000000 : 10;
        const set = new Set();

        for (const line of lines) {
            const matches = line.match(/\d+/gi) ?? ['0', '0', '0', '0'];
            const sx = parseInt(matches[0]);
            const sy = parseInt(matches[1]);
            const bx = parseInt(matches[2]);
            const by = parseInt(matches[3]);

            const distance = Math.abs(sx - bx) + Math.abs(sy - by);
            const range = distance - Math.abs(Y - sy);

            if (range < 0) {
                continue;
            }

            for (let x = sx - range; x < sx + range; x++) {
                set.add(`${x},${Y}`);
            }
        }

        return set.size;
    }

    async run2(_: Input): Promise<Solution> {
        return undefined;
    }
}