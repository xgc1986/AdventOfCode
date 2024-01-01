"use strict";

// [[https://adventofcode.com/year/day/Sample]]
// Input file [[inputs/year/daySample.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Input = string[];

export default class DaySample extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n');
    }

    async run1(_: Input): Promise<Solution> {
        return undefined;
    }

    async run2(_: Input): Promise<Solution> {
        return undefined;
    }
}