"use strict";

// [[https://adventofcode.com/2015/day/6]]
// Input file [[inputs/2015/day6.input.txt]]

import Puzzle from "src/Puzzle.ts";
import {UArray} from "src/Utils.ts";

type Solution = number | undefined;

type Action = 'on' | 'off' | 'toggle';
interface Position {
    row: number;
    col: number;
}

interface Instruction {
    action: Action;
    from: Position;
    to: Position;
}

type Input = Instruction[];

export default class Day6 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').map((line) => {
            let action = 'toggle';
            if (line.startsWith('turn on')) {
                action = 'on';
            } else if (line.startsWith('turn off')) {
                action = 'off';
            }

            const [fr, fc, tr, tc] = line.match(/\d+/gi)?.map(Number) ?? [];

            return {
                action: action as Action,
                from: {row: fr, col: fc},
                to: {row: tr, col: tc},
            }
        });
    }

    async run1(instructions: Input): Promise<Solution> {
        const lights = UArray.matrix(1000, 1000, 0);

        for (const instruction of instructions) {
            for (let i = instruction.from.col; i <= instruction.to.col; i++) {
                for (let j = instruction.from.row; j <= instruction.to.row; j++) {
                    if (instruction.action === 'on') {
                        lights[i][j] = 1;
                    } else if (instruction.action === 'off') {
                        lights[i][j] = 0;
                    } else {
                        lights[i][j] = 1 - lights[i][j];
                    }
                }
            }
        }

        return lights.reduce((acc, value) => acc + value.reduce((acc2, value2) => acc2 + value2), 0);
    }

    async run2(instructions: Input): Promise<Solution> {
        const lights = UArray.matrix(1000, 1000, 0);

        for (const instruction of instructions) {
            for (let i = instruction.from.col; i <= instruction.to.col; i++) {
                for (let j = instruction.from.row; j <= instruction.to.row; j++) {
                    if (instruction.action === 'on') {
                        lights[i][j] += 1;
                    } else if (instruction.action === 'off') {
                        lights[i][j] = Math.max(0, lights[i][j] - 1);
                    } else {
                        lights[i][j] += 2;
                    }
                }
            }
        }

        return lights.reduce((acc, value) => acc + value.reduce((acc2, value2) => acc2 + value2), 0);
    }
}