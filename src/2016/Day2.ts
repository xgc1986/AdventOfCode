"use strict";

// [[https://adventofcode.com/2016/day/2]]
// Input file [[inputs/2016/day2.input.txt]]

import Puzzle from "src/Puzzle";
import {StringMap} from "src/Utils.ts";

type Solution = string | undefined;

type Input = string[];

export default class Day2 extends Puzzle<Input> {

    private directions: StringMap<number[]> = {
        'U': [-1, 0],
        'D': [1, 0],
        'L': [0, -1],
        'R': [0, 1]
    }

    parseInput(input: string): Input {
        return input.split('\n');
    }

    private getCode(pad: string[][], instructions: string, pos: number[]): number[] {
        for (const char of instructions) {
            if (
                (pos[0] + this.directions[char][0]).between(0, pad.length - 1) &&
                (pos[1] + this.directions[char][1]).between(0, pad[0].length - 1) &&
                pad[pos[0] + this.directions[char][0]][pos[1] + this.directions[char][1]] !== ''
            ) {
                pos[0] += this.directions[char][0];
                pos[1] += this.directions[char][1];
            }
        }

        return pos;
    }

    async run1(instructions: Input): Promise<Solution> {
        const pad = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9']
        ];

        let number = '';
        let pos = [1, 1];
        for (const instruction of instructions) {
            pos = this.getCode(pad, instruction, pos);
            number += pad[pos[0]][pos[1]];
        }

        return number;
    }

    async run2(instructions: Input): Promise<Solution> {
        const pad = [
            ['', '', '1', '', ''],
            ['', '2', '3', '4', ''],
            ['5', '6', '7', '8', '9'],
            ['', 'A', 'B', 'C', ''],
            ['', '', 'D', '', '']
        ];

        let number = '';
        let pos = [2, 0];
        for (const instruction of instructions) {
            pos = this.getCode(pad, instruction, pos);
            number += pad[pos[0]][pos[1]];
        }

        return number;
    }
}