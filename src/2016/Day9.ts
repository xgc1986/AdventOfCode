"use strict";

// [[https://adventofcode.com/2016/day/9]]
// Input file [[inputs/2016/day9.input.txt]]

import Puzzle from "src/Puzzle";
import {Debug} from "src/Utils.ts";

type Solution = number | undefined;

type Input = string;

export default class Day9 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input;
    }

    decompress(file: Input, from: number = 0, size: number = file.length, multiplier: number = 1, version: number = 1): number {
        let memory = 0;
        for (let c = from; c < size; c++) {
            const char = file[c];
            if (char === "(") {
                c++;
                let lengthString = '';
                let repeatString = '';
                while (file[c] !== "x") {
                    lengthString += file[c];
                    c++;
                }
                c++;
                while (file[c] !== ")") {
                    repeatString += file[c];
                    c++;
                }

                const subLength = +lengthString;
                const repeat = +repeatString;

                if (version === 1) {
                    memory += subLength * repeat;
                    c += subLength;
                } else {
                    memory += this.decompress(file, c + 1, c + subLength + 1, repeat * multiplier, version);
                    c += subLength;
                }
            } else {
                memory += multiplier;
            }
        }

        return memory;
    }

    async run1(file: Input): Promise<Solution> {
        return this.decompress(file);
    }

    async run2(file: Input): Promise<Solution> {
        return this.decompress(file, 0, file.length, 1, 2);
    }
}