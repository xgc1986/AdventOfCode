"use strict";

// [[https://adventofcode.com/2017/day/1]]
// Input file [[inputs/2017/day1.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Input = string;

export default class Day1 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n')[0];
    }

    async run1(input: Input): Promise<Solution> {
        let total = 0;
        const length = input.length;

        for (let i = 0; i < length; i++) {
            if (input[i] === input[(i + 1) % length]) {
                total += Number(input[i]);
            }
        }

        return total;
    }

    async run2(input: Input): Promise<Solution> {
        let total = 0;
        const length = input.length;

        for (let i = 0; i < length; i++) {
            if (input[i] === input[(i + (length / 2)) % length]) {
                total += Number(input[i]);
            }
        }

        return total;
    }
}
