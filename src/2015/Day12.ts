"use strict";

// [[https://adventofcode.com/2015/day/12]]
// Input file [[inputs/2015/day12.input.txt]]

import Puzzle from "src/Puzzle";
import {JSON_OBJECT} from "src/Utils";

type Solution = number | undefined;

type Input = string;

export default class Day12 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input;
    }

    calculate(data: JSON_OBJECT | JSON_OBJECT[]) {
        let sum = 0;

        for (const x of Object.values(data)) {
            if (typeof x === 'number') {
                sum += x;
            } else if (typeof x === 'string') {
                if (!Array.isArray(data) && x === 'red') {
                    return 0;
                }
            } else if (typeof x === 'boolean' || x === null || x === undefined) {
                // nothing
            } else if (typeof x === 'object') {
                sum += this.calculate(x);
            }
        }

        return sum;
    }

    async run1(data: Input): Promise<Solution> {
        const matches = data.match(/-?\d+/gi) ?? [];

        return matches.reduce((acc, val) => acc + parseInt(val), 0);
    }

    async run2(data: Input): Promise<Solution> {
        return this.calculate(JSON.parse(data));
    }
}