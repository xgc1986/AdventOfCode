"use strict";

// [[https://adventofcode.com/2022/day/25]]
// Input file [[inputs/2022/day25.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = string | undefined;

type Input = string[];

export default class Day25 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n');
    }

    private fromSnafu(input: string): number {
        let sum = 0;
        for (let i = 0; i < input.length; i++) {
            sum *= 5;
            const char = input[i];
            if (char === '1') {
                sum += 1;
            } else if (char === '2') {
                sum += 2;
            } else if (char === '=') {
                sum -= 2;
            } else if (char === '-') {
                sum -= 1;
            }
        }

        return sum;
    }

    private toSnafu(input: number): string {
        let value = '';

        while (input > 0) {
            const mod = input % 5;

            if (mod === 1) {
                value = '1' + value;
                input -= 1;
            } else if (mod === 2) {
                value = '2' + value;
                input -= 2;
            } else if (mod === 3) {
                value = '=' + value;
                input += 2;
            } else if (mod === 4) {
                value = '-' + value;
                input += 1;
            } else {
                value = '0' + value;
            }

            input /= 5;
        }

        return value;
    }

    async run1(lines: Input): Promise<Solution> {
        return this.toSnafu(lines.map(this.fromSnafu).sum());
    }

    async run2(_: Input): Promise<Solution> {
        return ':)';
    }
}