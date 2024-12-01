"use strict";

// [[https://adventofcode.com/2024/day/1]]
// Input file [[inputs/2024/day1.input.txt]]

import Puzzle from "src/Puzzle";
import * as console from "node:console";

type Solution = number | undefined;

type Input = number[][];

//3351308
export default class Day1 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const lines = input.trim().split("\n");
        const left = [];
        const right = [];
        for (const line of lines) {
            const [a, b] = line.split("   ");
            left.push(Number(a));
            right.push(Number(b));
        }

        return [left.sort(), right.sort()];
    }

    async run1(input: Input): Promise<Solution> {
        const left = input[0].sort();
        const right = input[1].sort();

        let total = 0;
        for (let i = 0; i < left.length; i++) {
            total += Math.abs(left[i] - right[i]);
        }

        return total;
    }

    async run2(input: Input): Promise<Solution> {
        const times = new Map<number, number>();

        for (const item of input[1]) {
            times.set(item, (times.get(item) ?? 0) + 1);
        }

        return input[0].reduce((acc, item) => acc + item * (times.get(item) ?? 0), 0);
    }
}
