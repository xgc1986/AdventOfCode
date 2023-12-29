"use strict";

// [[https://adventofcode.com/2015/day/1]]
// Input file [[inputs/2015/day1.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | string| undefined;

type Input = string;

export default class Day1 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input;
    }

    async run1(line: Input): Promise<Solution> {
        let total = 0;

        for (const char of line) {
            if (char === '(') {
                total++;
            } else {
                total--;
            }
        }

        return total;
    }

    async run2(line: Input): Promise<Solution> {
        let total = 0;

        let position = 1;
        for (const char of line) {
            if (char === '(') {
                total++;
            } else {
                total--;
            }

            if (total < 0) {
                return position;
            }

            position++;
        }

        return position;
    }
}