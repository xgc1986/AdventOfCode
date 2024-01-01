"use strict";

// [[https://adventofcode.com/2022/day/5]]
// Input file [[inputs/2022/day5.input.txt]]

import Puzzle from "src/Puzzle";
import {UArray, UObject, UString} from "src/Utils";

type Solution = string | undefined;

interface Instruction {
    from: number;
    to: number;
    amount: number;
}

interface Cargo {
    stacks: string[][];
    instructions: Instruction[];
}

type Input = Cargo;

export default class Day5 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const cargo: Cargo = {
            stacks: [],
            instructions: []
        };
        input.split('\n').reverse().forEach(line => {
            if (line === '' || line.startsWith(' 1')) {
                return;
            }

            if (line.startsWith('move')) {
                const parts = line.match(/\d+/gi)?.map(Number) ?? [0, 0, 0];

                cargo.instructions.push({
                    amount: parts[0],
                    from: parts[1] - 1,
                    to: parts[2] - 1,
                })

                return;
            }

            const parts = UString.divideInSubstringsBySize(line, 4);
            for (const p in parts) {
                const part = parts[p];
                if (part.startsWith('[')) {
                    cargo.stacks[p] ??= [];
                    cargo.stacks[p].push(part[1]);
                }
            }

        });

        cargo.instructions = cargo.instructions.reverse();

        return cargo;
    }

    async run1(cargo: Input): Promise<Solution> {
        cargo = UObject.deepCopy(cargo);
        for (const instruction of cargo.instructions) {
            for (let i = 0; i < instruction.amount; i++) {
                cargo.stacks[instruction.to].push(cargo.stacks[instruction.from].pop() ?? '');
            }
        }

        return cargo.stacks.reduce((acc, stack) => acc + UArray.end(stack), '');
    }

    async run2(cargo: Input): Promise<Solution> {
        for (const instruction of cargo.instructions) {
            const tmp = [];
            for (let i = 0; i < instruction.amount; i++) {
                tmp.push(cargo.stacks[instruction.from].pop() ?? '');
            }
            for (let i = 0; i < instruction.amount; i++) {
                cargo.stacks[instruction.to].push(tmp.pop() ?? '');
            }
        }


        return cargo.stacks.reduce((acc, stack) => acc + UArray.end(stack), '');
    }
}