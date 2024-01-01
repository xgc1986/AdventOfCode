"use strict";

// [[https://adventofcode.com/2015/day/11]]
// Input file [[inputs/2015/day11.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Input = string[];

export default class Day11 extends Puzzle<Input> {

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