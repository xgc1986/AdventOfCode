"use strict";

// [[https://adventofcode.com/2022/day/3]]
// Input file [[inputs/2022/day3.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | undefined;

type Input = string[];

export default class Day3 extends Puzzle<Input> {

    getCode(char: string): number {
        if (char >= 'a' && char <= 'z') {
            return char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        } else {
            return char.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
        }
    }

    parseInput(input: string): Input {
        return input.split('\n');
    }

    async run1(lines: Input): Promise<Solution> {
        let total = 0;
        for (const line of lines) {
            const length = line.length;

            const part1 = line.substring(0, length / 2);
            let part2 = line.substring(length / 2, length);
            let sub = 0;

            for (const char of part1) {
                if (part2.includes(char)) {
                    sub += this.getCode(char);
                    part2 = part2.replaceAll(char, '');
                }
            }

            total += sub;
        }

        return total;
    }

    async run2(lines: Input): Promise<Solution> {
        let total = 0;
        for (let i = 0; i < lines.length; i+=3) {
            const part1 = lines[i];
            let part2 = lines[i + 1];
            let part3 = lines[i + 2];

            let sub = 0;

            for (const char of part1) {
                if (part2.includes(char) && part3.includes(char)) {
                    sub += this.getCode(char);
                    part2 = part2.replaceAll(char, '');
                    part3 = part3.replaceAll(char, '');
                }
            }

            total += sub;
        }

        return total;
    }
}