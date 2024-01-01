"use strict";

// [[https://adventofcode.com/2015/day/8]]
// Input file [[inputs/2015/day8.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Input = string[];

export default class Day8 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n');
    }

    async run1(lines: Input): Promise<Solution> {
        let score = 0;

        for (const line of lines) {
            let lineEscapedSize = 0;
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (char === '"') {
                    continue;
                }
                lineEscapedSize++;
                if (char === "\\") {
                    if (line[i + 1] === 'x') {
                        i += 3;
                    } else {
                        i += 1;
                    }
                }
            }

            score += line.length - lineEscapedSize;
        }

        return score;
    }

    async run2(lines: Input): Promise<Solution> {
        let score = 0;

        for (const line of lines) {
            let lineEscapedSize = 2;
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                lineEscapedSize++;

                if (char === '"' || char === "\\") {
                    lineEscapedSize++;
                }
            }

            score += lineEscapedSize - line.length;
        }

        return score;
    }
}