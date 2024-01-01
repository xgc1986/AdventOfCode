"use strict";

// [[https://adventofcode.com/2023/day/15]]
// Input file [[inputs/2023/day15.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | string| undefined;

interface Instruction {
    instruction: string;
    code: string;
    value: number;
    type: string;
    hash: string;
}

type Input = Instruction[];

export default class Day15 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const line = input.split('\n')[0];
        return line.split(',').map((part) => {
            const instruction: Instruction = {
                instruction: part,
                code: '',
                value: 0,
                type: '',
                hash: ''
            };

            if (part.endsWith('-')) {
                instruction.code = part.slice(0, -1);
                instruction.type = '-';
            } else {
                instruction.code = part.split('=')[0];
                instruction.type = '=';
                instruction.value = +part.split('=')[1];
            }

            return instruction;
        });
    }

    private hash(input: string): number {
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            hash += input.charCodeAt(i);
            hash *= 17;
            hash %= 256;
        }

        return hash;
    }

    async run1(instructions: Input): Promise<Solution> {
        return instructions.reduce((acc, instruction) => this.hash(instruction.instruction) + acc, 0);
    }

    async run2(instructions: Input): Promise<Solution> {
        const boxes: Instruction[][] = [];

        for (let i = 0; i < 256; i++) {
            boxes[i] = [];
        }

        for (const instruction of instructions) {
            if (instruction.type === '-') {
                const box = this.hash(instruction.code);
                boxes[box] = boxes[box].filter((b) => b.code !== instruction.code);
            } else {
                const box = this.hash(instruction.code);
                let found = false;
                for (let s = 0; s < boxes[box].length; s++) {
                    if (boxes[box][s].code === instruction.code) {
                        boxes[box][s] = instruction;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    boxes[box].push(instruction);
                }
            }
        }

        let sum = 0;
        for (let b = 0; b < Object.keys(boxes).length; b++) {
            const box = boxes[b];
            for (let s = 0; s < box.length; s++) {
                const slot = box[s];
                sum += (b + 1) * (s + 1) * slot.value;
            }
        }

        return sum;
    }
}