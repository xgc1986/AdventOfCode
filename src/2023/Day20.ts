"use strict";

// [[https://adventofcode.com/2023/day/20]]
// Input file [[inputs/2023/day20.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | string| undefined;

type Input = string[];

export default class Day20 extends Puzzle<Input> {

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