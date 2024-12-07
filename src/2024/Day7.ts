"use strict";

// [[https://adventofcode.com/2024/day/7]]
// Input file [[inputs/2024/day7.input.txt]]

import Puzzle from "src/Puzzle";
import * as console from "node:console";
import * as process from "node:process";

type Solution = number | undefined;

type Input = number[][];

export default class Day7 extends Puzzle<Input> {

    parseInput(input: string): Input {
        input = input.replaceAll(":", '');

        return input.split('\n').map(line => line.split(' ').map(Number));
    }

    async run1(input: Input): Promise<Solution> {
        let total = 0;
        for (const row of input) {
            if (this.rec2(row, row.length - 1, row[0], false)) {
                total += row[0];
            }
        }

        return total;
    }

    async run2(input: Input): Promise<Solution> {
        let total = 0;
        for (const row of input) {
            if (this.rec2(row, row.length - 1, row[0], true)) {
                total += row[0];
            }
        }

        return total;
    }


    rec2(numbers: number[], pos: number, value: number, allowConcats: boolean) {
        if (pos == 1) {
            return value === numbers[1];
        }

        if (value >= numbers[pos] && this.rec2(numbers, pos - 1, value - numbers[pos], allowConcats)) {
            return true;
        }

        if ((value % numbers[pos] == 0) && this.rec2(numbers, pos - 1, value / numbers[pos], allowConcats)) {
            return true;
        }

        if (allowConcats) {
            let newValue = value - numbers[pos];
            let factor = (Math.pow(10, Math.floor(Math.log10(numbers[pos]))) * 10);
            if (newValue % factor == 0 && this.rec2(numbers, pos - 1, newValue / factor, allowConcats)) {
                return true;
            }
        }

        return false;
    }
}