"use strict";

// [[https://adventofcode.com/2024/day/3]]
// Input file [[inputs/2024/day3.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Input = string;

const DO: string = "do()";
const DONT: string = "don't()";
const MUL_START: string = "mul(";
const MUL_END: string = ')';
const MUL_MIDDLE: string = ',';

export default class Day3 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input;
    }

    async run1(data: Input): Promise<Solution> {
        let total = 0;
        let num1 = -1;
        let num2 = -1;
        let group = "";
        let executing = false;
        let first = true;

        for (const c of data) {

            if (executing) {
                if (c === MUL_MIDDLE && !first) {
                    num1 = -1;
                }

                if (c === MUL_MIDDLE) {
                    first = false;
                    continue;
                }

                if (c >= '0' && c <= '9') {
                    if (first) {
                        num1 = Math.max(num1, 0);
                        num1 = num1 * 10 + Number(c);
                    } else {
                        num2 = Math.max(num2, 0);
                        num2 = num2 * 10 + Number(c);
                    }
                    continue;
                }

                if (c === MUL_END && num1 !== -1 && num2 !== -1) {
                    total += num1 * num2;
                }

                num1 = -1;
                num2 = -1;
                group = "";
                executing = false;
                first = true;
            }

            group += c;
            if (!MUL_START.startsWith(group)) {
                group = c;
            }

            if (group === MUL_START) {
                executing = true;
            }
        }

        return total;
    }

    async run2(data: Input): Promise<Solution> {
        let total = 0;
        let num1 = -1;
        let num2 = -1;
        let group = "";
        let executing = false;
        let first = true;
        let enabled = true;

        for (const c of data) {
            group += c;

            if (
                !DO.startsWith(group) &&
                !DONT.startsWith(group) &&
                !MUL_START.startsWith(group)
            ) {
                group = c;
            }

            if (group === DO) {
                enabled = true;
            }

            if (group === DONT) {
                enabled = false;
            }

            if (!enabled) {
                continue;
            }

            if (group === MUL_START) {
                executing = true;
                group = "";
                continue;
            }

            if (executing) {
                if (c === MUL_MIDDLE && !first) {
                    num1 = -1;
                }

                if (c === MUL_MIDDLE) {
                    first = false;
                    continue;
                }

                if (c >= '0' && c <= '9') {
                    if (first) {
                        num1 = Math.max(num1, 0);
                        num1 = num1 * 10 + Number(c);
                    } else {
                        num2 = Math.max(num2, 0);
                        num2 = num2 * 10 + Number(c);
                    }
                    continue;
                }

                if (c === MUL_END && num1 !== -1 && num2 !== -1) {
                    total += num1 * num2;
                }

                num1 = -1;
                num2 = -1;
                group = "";
                executing = false;
                first = true;
            }
        }

        return total;
    }
}