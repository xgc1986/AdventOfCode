"use strict";

// [[https://adventofcode.com/2023/day/18]]
// Input file [[inputs/2023/day18.input.txt]]

import Puzzle from "src/Puzzle";
import {StringMap} from "src/Utils";

type Solution = number | string| undefined;

interface DigInstruction {
    direction1: string;
    direction2: string;
    amount1: number;
    amount2: number;
}

type Input = DigInstruction[];

export default class Day18 extends Puzzle<Input> {

    private readonly directions: StringMap<number[]> = {
        U: [-1, 0],
        D: [1, 0],
        L: [0, -1],
        R: [0, 1],
    };

    parseInput(input: string): Input {
        const d: StringMap<string> = {
            '0': 'R',
            '1': 'D',
            '2': 'L',
            '3': 'U',
        }
        return input.split('\n').filter((line) => line !== '').map((line) => {
            const parts = line.split(' ');

            return {
                direction1: parts[0],
                amount1: +parts[1],
                direction2: d[parts[2].slice(7, 8)],
                amount2: parseInt("0x" + parts[2].slice(2, 7))
            };
        });
    }

    private area(inputs: Input, version: number): number {
        let area = 0;
        let perimeter = 0;
        let row = 0;
        let column = 0;

        for (const input of inputs) {
            let direction = input.direction1;
            let amount = input.amount1;
            if (version === 2) {
                direction = input.direction2;
                amount = input.amount2;
            }
            const [drow, dcol] = this.directions[direction];
            const r0 = row;
            const c0 = column;

            row += drow * amount;
            column += dcol * amount;
            area += (row * c0 - r0 * column) / 2;
            perimeter += amount;
        }

        return area + perimeter / 2 + 1;
    }

    async run1(input: Input): Promise<Solution> {
        return this.area(input, 1);
    }

    async run2(input: Input): Promise<Solution> {
        return this.area(input, 2);
    }
}