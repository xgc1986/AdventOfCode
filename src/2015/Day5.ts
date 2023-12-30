"use strict";

// [[https://adventofcode.com/2015/day/5]]
// Input file [[inputs/2015/day5.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | undefined;

type Input = string[];

export default class Day5 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n');
    }

    async run1(lines: Input): Promise<Solution> {
        const invalidStrings = [
            'ab', 'cd', 'pq', 'xy'
        ];

        let score = 0;

        for (const line of lines) {
            const matches = line.match(/[aeiou]/g);
            if (matches === null) {
                continue;
            }

            if (matches.length < 3) {
                continue;
            }

            let parsedLine = line;
            for (const invalid of invalidStrings) {
                parsedLine = parsedLine.replace(invalid, '');
            }

            if (parsedLine.length !== line.length) {
                continue;
            }

            for (let i = 0; i < line.length - 1; i++) {
                if (line[i] === line[i + 1]) {
                    score++;
                    break;
                }
            }
        }

        return score;
    }

    async run2(lines: Input): Promise<Solution> {
        let score = 0;

        for (const line of lines) {

            let condition1 = false;
            for (let i = 0; i < line.length - 1; i++) {
                const pair = line[i] + line[i + 1];

                const index = line.lastIndexOf(pair);

                if (index >= (i + 2)) {
                    condition1 = true;
                }
            }

            let condition2 = false;
            for (let i = 0; i < line.length - 2; i++) {
                if (line[i] === line[i + 2]) {
                    condition2 = true;
                }
            }

            if (condition1 && condition2) {
                score++;
            }
        }

        return score;
    }
}