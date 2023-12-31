"use strict";

// [[https://adventofcode.com/2022/day/10]]
// Input file [[inputs/2022/day10.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | undefined;

interface Instructions {
    action: string;
    value: number;
}

type Input = Instructions[];

export default class Day10 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').map(line => {
            const [action, value] = line.split(' ');
            return {action, value: +value};
        });
    }

    async run1(instructions: Input): Promise<Solution> {
        let cycles = [20, 60, 100, 140, 180, 220];
        let cycle = 1;
        let x = 1;
        let total = 0;

        for (const inst of instructions) {
            cycle++;

            if (cycles.includes(cycle)) {
                total += cycle * x;
            }

            if (inst.action !== 'noop') {
                x += inst.value;

                cycle++;

                if (cycles.includes(cycle)) {
                    total += cycle * x;
                }
            }
        }

        return total;
    }

    async run2(instructions: Input): Promise<Solution> {
        let cycle = 1;

        const screen = [
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ];

        let sprite = 1;

        for (const inst of instructions) {
            let row = Math.floor((cycle - 1) / 40);
            let col = (cycle - 1) % 40;

            if (col >= (sprite - 1) && col <= (sprite + 1)) {
                screen[row][col] = '#';
            }

            cycle++;

            if (inst.action !== 'noop') {
                row = Math.floor((cycle - 1) / 40);
                col = (cycle - 1) % 40;

                if (col >= (sprite - 1) && col <= (sprite + 1)) {
                    screen[row][col] = '#';
                }

                cycle++;

                sprite += inst.value;
            }
        }

        for (const line of screen) {
            console.log(line.join(''));
        }

        return 69;
    }
}