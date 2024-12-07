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
            if (this.rec(row, row[1], 2, false)) {
                total += row[0];
            }
        }

        return total;
    }

    async run2(input: Input): Promise<Solution> {
        let total = 0;
        for (const row of input) {
            if (this.rec(row, row[1], 2, true)) {
                total += row[0];
            }
        }

        return total;
    }

    rec(list: number[], currentValue: number, position: number, allowConcat: boolean): boolean {
        if (currentValue === list[0]) {
            return true;
        }

        if (position === list.length || currentValue > list[0]) {
            return false;
        }

        if (this.rec(list, currentValue + list[position], position + 1, allowConcat)) {
            return true;
        }

        if (this.rec(list, currentValue * list[position], position + 1, allowConcat)) {
            return true;
        }

        if (allowConcat) {
            let value = ("" + currentValue + "_" + list[position]).replace("_", "");
            if (value.length < 16) {
                return this.rec(list, parseInt(value), position + 1, allowConcat);
            }
        }

        return false;
    }
}