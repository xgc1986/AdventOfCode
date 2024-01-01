"use strict";

// [[https://adventofcode.com/2022/day/6]]
// Input file [[inputs/2022/day6.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Input = string[];

export default class Day6 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n');
    }

    async run1(lines: Input): Promise<Solution> {
        const line = lines[0];
        const size = 4

        for (let i = size - 1; i < line.length; i++) {
            const tmp = [];
            for (let j = 0; j < size; j++) {
                tmp.push(line[i - j]);
            }

            let found = false;
            while (tmp.length > 0 && !found) {
                let pivot = tmp.pop() ?? '';
                if (tmp.includes(pivot)) {
                    found = true;
                }
            }

            if (!found) {
                return i + 1;
            }
        }

        return -1;
    }

    async run2(lines: Input): Promise<Solution> {
        const line = lines[0];
        const size = 14

        for (let i = size - 1; i < line.length; i++) {
            const tmp = [];
            for (let j = 0; j < size; j++) {
                tmp.push(line[i - j]);
            }

            let found = false;
            while (tmp.length > 0 && !found) {
                let pivot = tmp.pop() ?? '';
                if (tmp.includes(pivot)) {
                    found = true;
                }
            }

            if (!found) {
                return i + 1;
            }
        }

        return -1;
    }
}