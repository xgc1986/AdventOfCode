"use strict";

// [[https://adventofcode.com/2016/day/6]]
// Input file [[inputs/2016/day6.input.txt]]

import Puzzle from "src/Puzzle";
import {StringMap} from "src/Utils.ts";

type Solution = string | undefined;

type Input = string[];

export default class Day6 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n');
    }

    async run1(signals: Input): Promise<Solution> {
        let message = '';

        for (let i = 0; i < signals[0].length; i++) {
            const map: StringMap<{char: string, amount: number}> = {};

            for (const signal of signals) {
                const char = signal[i];
                map[char] ??= {char, amount: 0};
                map[char].amount++;
            }

            message += Object.values(map).sort((a, b) => b.amount - a.amount)[0].char;
        }

        return message;
    }

    async run2(signals: Input): Promise<Solution> {
        let message = '';

        for (let i = 0; i < signals[0].length; i++) {
            const map: StringMap<{char: string, amount: number}> = {};

            for (const signal of signals) {
                const char = signal[i];
                map[char] ??= {char, amount: 0};
                map[char].amount++;
            }

            message += Object.values(map).sort((a, b) => a.amount - b.amount)[0].char;
        }

        return message;
    }
}