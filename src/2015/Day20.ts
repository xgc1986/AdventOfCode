"use strict";

// [[https://adventofcode.com/2015/day/20]]
// Input file [[inputs/2015/day20.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | undefined;

type Input = number;

export default class Day20 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return +input;
    }

    async run1(limit: Input): Promise<Solution> {
        limit /= 10;

        for (let i = 1; i <= limit; i++) {
            let sum = 0;
            for (let j = 1; j <= Math.sqrt(i); j++) {
                if (i % j === 0) {
                    let extra = i / j;
                    sum += j + (extra !== j ? extra : 0);
                }
            }

            if (sum >= limit) {
                return i;
            }
        }

        return -1;
    }

    async run2(limit: Input): Promise<Solution> {
        let houses = (new Array(2_000_000)).fill(0);

        for (let i = 1; i <= limit / 10; i++) {
            for (let j = 1; j <= 50; j++) {
                if (i * j >= houses.length) {
                    break;
                }
                houses[j * i] += i * 11;
            }
        }

        for (let i = 0; i < houses.length; i++) {
            if (houses[i] >= limit) {
                return i;
            }
        }

        return -1;
    }
}