"use strict";

// [[https://adventofcode.com/2015/day/4]]
// Input file [[inputs/2015/day4.input.txt]]

import Puzzle from "src/Puzzle";
import {createHash} from "node:crypto";

type Solution = number | undefined;

type Input = string;

export default class Day4 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input;
    }

    private findValue(input: string, prefix: string): number {
        let value = 1;

        while (true) {
            const hash = createHash('md5').update(input + value).digest('hex');

            if (hash.startsWith(prefix)) {
                return value;
            }

            value++;
        }
    }

    async run1(input: Input): Promise<Solution> {
        return this.findValue(input, '00000');
    }

    async run2(input: Input): Promise<Solution> {
        return this.findValue(input, '000000');
    }
}