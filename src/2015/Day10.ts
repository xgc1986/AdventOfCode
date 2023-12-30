"use strict";

// [[https://adventofcode.com/2015/day/10]]
// Input file [[inputs/2015/day10.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | undefined;

interface Say {
    times: number;
    number: number;
}

type Input = string;

export default class Day10 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input;
    }

    lookAndSay(input: string): string {
        let last = '0';
        let index = -1;
        const res = [];

        for (const char of input) {
            if (char === last) {
                res[index].times++;
            } else {
                index++;
                last = char;
                res[index] = {
                    times: 1,
                    number: parseInt(char)
                };
            }
        }

        return res.reduce((acc, r) => acc + `${r.times}${r.number}`, '');
    }

    solve(input: Input, times: number): number {
        for (let i = 0; i < times; i++) {
            input = this.lookAndSay(input);
        }
        return input.length;
    }

    async run1(value: Input): Promise<Solution> {
        return this.solve(value, 40);
    }

    async run2(value: Input): Promise<Solution> {
        return this.solve(value, 50);
    }
}