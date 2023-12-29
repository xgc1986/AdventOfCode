"use strict";

// [[https://adventofcode.com/year/day/Sample]]
// Input file [[inputs/year/daySample.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | string| undefined;

type Input = string[];

export default class DaySample extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').filter((line) => line !== '');
    }

    async run1(_: Input): Promise<Solution> {
        return undefined;
    }

    async run2(_: Input): Promise<Solution> {
        return undefined;
    }
}