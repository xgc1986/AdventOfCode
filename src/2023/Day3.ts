"use strict";

// https://adventofcode.com/2023/day/3
// Input file [[inputs/2023/day3.input.txt]]

import Puzzle from "src/Puzzle.ts";
import {UArray, UMap, UObject} from "src/Utils.ts";

interface Value {
    value: number;
}

interface Slot {
    value: Value;
    symbol: boolean;
}

type Input = Slot[][];

export default class Day3 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const lines = input.split('\n').filter((line) => line !== '');
        const numbers: UMap<boolean> = {
            '0': true,
            '1': true,
            '2': true,
            '3': true,
            '4': true,
            '5': true,
            '6': true,
            '7': true,
            '8': true,
            '9': true
        }

        const ret: Slot[][] = [];
        const zero: Value = {value: 0};

        for (let i = 0; i < lines.length; i++) {
            let pending: Slot[] = [];
            let number = 0;
            const row: Slot[] = [];

            for (let j = 0; j < lines[i].length; j++) {
                const value = lines[i][j];
                const slot: Slot = {
                    value: zero,
                    symbol: false
                };

                if (numbers[value]) {
                    number = number * 10 + parseInt(value);
                    pending.push(slot);
                } else {
                    let val = {value: number};
                    for (const slot of pending) {
                        slot.value = val;
                    }
                    pending = [];
                    number = 0;
                    slot.symbol = value !== '.';
                }

                if (j === lines[i].length - 1) {
                    let val = {value: number};
                    for (const slot of pending) {
                        slot.value = val;
                    }
                    pending = [];
                    number = 0;
                }

                row.push(slot);
            }

            ret.push(row);
        }

        return ret;
    }

    async run1(input: Input): Promise<number> {
        input = UObject.deepCopy(input);
        let total = 0;

        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                if (!input[i][j].symbol && input[i][j].value.value > 0) {
                    const surround = UArray.surround8(input, i, j);
                    let found = false;
                    for (const sur of surround) {
                        if (sur.symbol) {
                            found = true;
                            break;
                        }
                    }

                    if (found) {
                        total += input[i][j].value.value;
                        input[i][j].value.value = 0;
                    }
                }
            }
        }

        return total;
    }

    async run2(input: Input): Promise<number> {
        let total = 0;

        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                if (input[i][j].symbol) {
                    const values: number[] = [];
                    const surround = UArray.surround8(input, i, j);
                    for (const sur of surround) {
                        if (sur.value.value > 0) {
                            values.push(sur.value.value);
                            sur.value.value = 0;
                        }
                    }

                    if (values.length > 1) {
                        total += values.reduce((acc, val) => acc * val, 1);
                    }
                }
            }
        }

        return total;
    }
}