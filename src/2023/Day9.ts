"use strict";

// [[https://adventofcode.com/2023/day/9]]
// Input file [[inputs/2023/day9.input.txt]]

import Puzzle from "src/Puzzle";
import Sequence from "src/Algorithm/Graph/Sequence";

type Input = number[][];

export default class Day9 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const lines = input.split('\n').filter((line) => line !== '');
        const ret: number[][]  = [];

        for (const line of lines) {
            ret.push(line.match(/[-\d]+/g)?.map(Number) ?? []);
        }

        return ret;
    }

    async run1(inputs: Input): Promise<number> {
        let sum = 0;
        for (const input of inputs) {
            sum += Sequence.sequence(input)[1] ?? 0;
        }
        return sum;
    }

    async run2(inputs: Input): Promise<number> {
        let sum = 0;
        for (const input of inputs) {
            sum += Sequence.sequence(input)[0] ?? 0;
        }
        return sum;
    }
}