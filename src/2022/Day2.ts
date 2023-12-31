"use strict";

// [[https://adventofcode.com/2022/day/2]]
// Input file [[inputs/2022/day2.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | undefined;

type Input = string[];

export default class Day2 extends Puzzle<Input> {

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