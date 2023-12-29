"use strict";

// [[https://adventofcode.com/201/day/1]]
// Input file [[inputs/201/day1.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | string| undefined;

type Input = string[];

export default class Day1 extends Puzzle<Input> {

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