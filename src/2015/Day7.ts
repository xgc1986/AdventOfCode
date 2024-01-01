"use strict";

// [[https://adventofcode.com/2015/day/7]]
// Input file [[inputs/2015/day7.input.txt]]

import Puzzle from "src/Puzzle";
import {StringMap} from "src/Utils";

type Solution = number | undefined;

interface Instruction {
    operation: string;
    input1: string | number;
    input2: string | number
    output: string;
}

type Input = Instruction[];

export default class Day7 extends Puzzle<Input> {

    private A: number = 0;

    parseValue(input: string): number|string {
        if (input.match(/^\d+$/)) {
            return +input;
        }

        return input;
    }

    loadVariable(input: string|number, map: StringMap<number>): number {
        if (typeof input === 'number') {
            return input;
        }

        return map[input] ?? 0;
    }

    saveVariable(variable: string, value: number, map: StringMap<number>): void {
        map[variable] = value;
    }

    existsVariable(variable: string|number, map: StringMap<number>): boolean {
        if (typeof variable === 'number') {
            return true;
        }

        return map[variable] !== undefined;
    }

    parseInput(input: string): Input {
        const lines = input.split('\n');
        return lines.map(line => {
            const parts = line.split(' ');
            if (parts[0] === 'NOT') {
                return {
                    operation: 'NOT',
                    input1: this.parseValue(parts[1]),
                    input2: 0,
                    output: parts[3]
                };
            }
            if (parts[1] === 'AND') {
                return {
                    operation: 'AND',
                    input1: this.parseValue(parts[0]),
                    input2: this.parseValue(parts[2]),
                    output: parts[4]
                };
            }
            if (parts[1] === 'OR') {
                return {
                    operation: 'OR',
                    input1: this.parseValue(parts[0]),
                    input2: this.parseValue(parts[2]),
                    output: parts[4]
                };
            }
            if (parts[1] === 'LSHIFT') {
                return {
                    operation: 'LSHIFT',
                    input1: this.parseValue(parts[0]),
                    input2: this.parseValue(parts[2]),
                    output: parts[4]
                };
            }
            if (parts[1] === 'RSHIFT') {
                return {
                    operation: 'RSHIFT',
                    input1: this.parseValue(parts[0]),
                    input2: this.parseValue(parts[2]),
                    output: parts[4]
                };
            }

            return {
                operation: 'ASSIGN',
                input1: this.parseValue(parts[0]),
                input2: 0,
                output: parts[2]
            };
        });
    }

    findVariable(instructions: Input, variable: string, dictionary: StringMap<number>): number {
        if (dictionary[variable] !== undefined) {
            return dictionary[variable];
        }

        const instruction = instructions.find(i => i.output === variable);

        if (!instruction) {
            return 0;
        }

        if (instruction.operation === 'ASSIGN') {
            if (!this.existsVariable(instruction.input1, dictionary)) {
                this.findVariable(instructions, instruction.input1 as string, dictionary);
            }

            const value = this.loadVariable(instruction.input1, dictionary);
            this.saveVariable(variable, value, dictionary);
            return value;
        }

        if (instruction.operation === 'NOT') {
            if (!this.existsVariable(instruction.input1, dictionary)) {
                this.findVariable(instructions, instruction.input1 as string, dictionary);
            }

            const value = ~this.loadVariable(instruction.input1, dictionary);
            this.saveVariable(variable, value, dictionary);
            return value;
        }

        if (instruction.operation === 'AND') {
            if (!this.existsVariable(instruction.input1, dictionary)) {
                this.findVariable(instructions, instruction.input1 as string, dictionary);
            }
            if (!this.existsVariable(instruction.input2, dictionary)) {
                this.findVariable(instructions, instruction.input2 as string, dictionary);
            }

            const value = this.loadVariable(instruction.input1, dictionary) & this.loadVariable(instruction.input2, dictionary);
            this.saveVariable(variable, value, dictionary);
            return value;
        }

        if (instruction.operation === 'OR') {
            if (!this.existsVariable(instruction.input1, dictionary)) {
                this.findVariable(instructions, instruction.input1 as string, dictionary);
            }
            if (!this.existsVariable(instruction.input2, dictionary)) {
                this.findVariable(instructions, instruction.input2 as string, dictionary);
            }

            const value = this.loadVariable(instruction.input1, dictionary) | this.loadVariable(instruction.input2, dictionary);
            this.saveVariable(variable, value, dictionary);
            return value;
        }

        if (instruction.operation === 'LSHIFT') {
            if (!this.existsVariable(instruction.input1, dictionary)) {
                this.findVariable(instructions, instruction.input1 as string, dictionary);
            }
            if (!this.existsVariable(instruction.input2, dictionary)) {
                this.findVariable(instructions, instruction.input2 as string, dictionary);
            }

            const value = this.loadVariable(instruction.input1, dictionary) << this.loadVariable(instruction.input2, dictionary);
            this.saveVariable(variable, value, dictionary);
            return value;
        }

        if (instruction.operation === 'RSHIFT') {
            if (!this.existsVariable(instruction.input1, dictionary)) {
                this.findVariable(instructions, instruction.input1 as string, dictionary);
            }
            if (!this.existsVariable(instruction.input2, dictionary)) {
                this.findVariable(instructions, instruction.input2 as string, dictionary);
            }

            const value = this.loadVariable(instruction.input1, dictionary) >> this.loadVariable(instruction.input2, dictionary);
            this.saveVariable(variable, value, dictionary);
            return value;
        }

        return 0;
    }

    async run1(instructions: Input): Promise<Solution> {
        this.A = this.findVariable(instructions, 'a', {});

        return this.A;
    }

    async run2(instructions: Input): Promise<Solution> {
        return this.findVariable(instructions, 'a', {'b': this.A});
    }
}