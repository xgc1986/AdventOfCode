"use strict";

// [[https://adventofcode.com/2016/day/12]]
// Input file [[inputs/2016/day12.input.txt]]

import Puzzle from "src/Puzzle";
import {StringMap} from "src/Utils.ts";

type Solution = number | undefined;

interface Instruction {
    type: 'cpy' | 'inc' | 'dec' | 'jnz';
    arg1: string;
    arg2: string
}

interface Program {
    instructions: Instruction[];
    memory: StringMap<number>;
}

type Input = Program;

export default class Day12 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const lines = input.split('\n');

        const program: Program = {
            instructions: [],
            memory: {
                a: 0,
                b: 0,
                c: 0,
                d: 0
            }
        };

        for (const line of lines) {
            const [type, arg1, arg2] = line.split(' ');
            program.instructions.push({type: type as 'cpy' | 'inc' | 'dec' | 'jnz', arg1, arg2: arg2 ?? '0'});
        }

        return program;
    }

    readVariable(program: Program, variable: string): number {
        if (variable.match(/[a-d]/)) {
            return program.memory[variable];
        } else {
            return parseInt(variable);
        }
    }

    saveVariable(program: Program, variable: string, value: number): void {
        program.memory[variable] = value;
    }

    async run1(program: Input): Promise<Solution> {
        program = program.copy();
        for (let i = 0; i < program.instructions.length; i++) {
            const instruction = program.instructions[i];
            switch (instruction.type) {
                case 'cpy':
                    this.saveVariable(program, instruction.arg2, this.readVariable(program, instruction.arg1));
                    break;
                case 'inc':
                    this.saveVariable(program, instruction.arg1, this.readVariable(program, instruction.arg1) + 1);
                    break;
                case 'dec':
                    this.saveVariable(program, instruction.arg1, this.readVariable(program, instruction.arg1) - 1);
                    break;
                case 'jnz':
                    if (this.readVariable(program, instruction.arg1) !== 0) {
                        const jump = this.readVariable(program, instruction.arg1);
                        if (jump !== 0) {
                            i += this.readVariable(program, instruction.arg2) - 1;
                        }
                    }
                    break;
            }
        }

        return this.readVariable(program, 'a');
    }

    async run2(program: Input): Promise<Solution> {
        program.memory.c = 1;
        for (let i = 0; i < program.instructions.length; i++) {
            const instruction = program.instructions[i];
            switch (instruction.type) {
                case 'cpy':
                    this.saveVariable(program, instruction.arg2, this.readVariable(program, instruction.arg1));
                    break;
                case 'inc':
                    this.saveVariable(program, instruction.arg1, this.readVariable(program, instruction.arg1) + 1);
                    break;
                case 'dec':
                    this.saveVariable(program, instruction.arg1, this.readVariable(program, instruction.arg1) - 1);
                    break;
                case 'jnz':
                    if (this.readVariable(program, instruction.arg1) !== 0) {
                        const jump = this.readVariable(program, instruction.arg1);
                        if (jump !== 0) {
                            i += this.readVariable(program, instruction.arg2) - 1;
                        }
                    }
                    break;
            }
        }

        return this.readVariable(program, 'a');
    }
}