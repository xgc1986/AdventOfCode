"use strict";

// [[https://adventofcode.com/2015/day/23]]
// Input file [[inputs/2015/day23.input.txt]]

import Puzzle from "src/Puzzle.ts";
import {UMap} from "src/Utils.ts";

type Solution = number | undefined;

interface Instruction {
    command: string;
    variable: string;
    value: number;
}

type Input = Instruction[];

export default class Day23 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').map(line => {
            const inst: Instruction = {
                value: 0,
                command: '',
                variable: ''
            };

            if (line.startsWith('jio')) {
                inst.command = 'jio';
                inst.variable = line.slice(4, 5);
                inst.value = (line.match(/-?\d+/gi)?.map(Number)[0] ?? 0);
            } else if (line.startsWith('jie')) {
                inst.command = 'jie';
                inst.variable = line.slice(4, 5);
                inst.value = (line.match(/-?\d+/gi)?.map(Number)[0] ?? 0);
            } else if (line.startsWith('jmp')) {
                inst.command = 'jmp';
                inst.value = (line.match(/-?\d+/gi)?.map(Number)[0] ?? 0);
            } else if (line.startsWith('inc')) {
                inst.command = 'inc';
                inst.variable = line.slice(4, 5);
            } else if (line.startsWith('tpl')) {
                inst.command = 'tpl';
                inst.variable = line.slice(4, 5);
            } else if (line.startsWith('hlf')) {
                inst.command = 'hlf';
                inst.variable = line.slice(4, 5);
            }

            return inst;
        });
    }

    execute(instructions: Input, variables: UMap<number>): number {
        let line = 0;
        while (line < instructions.length) {
            if (instructions[line].command === 'jio') {
                if (variables[instructions[line].variable] === 1) {
                    line += instructions[line].value;
                    continue;
                }
            } else if (instructions[line].command === 'jie') {
                if (variables[instructions[line].variable] % 2 === 0) {
                    line += instructions[line].value;
                    continue;
                }
            } else if (instructions[line].command === 'jmp') {
                line += instructions[line].value;
                continue;
            } else if (instructions[line].command === 'inc') {
                variables[instructions[line].variable]++;
            } else if (instructions[line].command === 'tpl') {
                variables[instructions[line].variable] *= 3;
            } else if (instructions[line].command === 'hlf') {
                variables[instructions[line].variable] /= 2;
            }

            line++;
        }

        return variables.b;
    }

    async run1(instructions: Input): Promise<Solution> {
        return this.execute(instructions, {a: 0, b: 0});
    }

    async run2(instructions: Input): Promise<Solution> {
        return this.execute(instructions, {a: 1, b: 0});
    }
}