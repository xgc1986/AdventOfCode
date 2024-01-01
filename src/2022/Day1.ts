"use strict";

// [[https://adventofcode.com/2022/day/1]]
// Input file [[inputs/2022/day1.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Input = number[][];

export default class Day1 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const lines = input.split('\n');
        const numbers: number[][] = [];
        let row: number[] = [];
        numbers.push(row);

        for (const line of lines) {
            if (line === '') {
                row = [];
                numbers.push(row);
            } else {
                row.push(+line);
            }
        }

        return numbers;
    }

    async run1(calories: Input): Promise<Solution> {
        let list = [];

        for (const calorie of calories) {
            list.push(calorie.reduce((acc, val) => acc + val, 0));
        }

        const sorted = list.sort().reverse();

        return sorted[0];
    }

    async run2(calories: Input): Promise<Solution> {
        let list = [];

        for (const calorie of calories) {
            list.push(calorie.reduce((acc, val) => acc + val, 0));
        }

        const sorted = list.sort().reverse();

        return sorted[0] + sorted[1] + sorted[2];
    }
}