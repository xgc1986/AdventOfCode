"use strict";

// [[https://adventofcode.com/2024/day/11]]
// Input file [[inputs/2024/day11.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Input = number[];

export default class Day11 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n')[0].split(' ').map(Number);
    }

    async run1(input: Input): Promise<Solution> {
        return this.solve(input, 25);
    }

    async run2(input: Input): Promise<Solution> {
        return this.solve(input, 75);
    }

    solve(input: Input, iterations: number): number {
        let map = new Map<number, number>();

        for (let i = 0; i < input.length; i++) {
            map.set(input[i], 1);
        }

        for (let i = 0; i < iterations; i++) {
            let newMap = new Map<number, number>();
            for (const [value, times] of map.entries()) {
                if (value === 0) {
                    let newValue = 1;
                    let prevTimes = newMap.get(newValue) ?? 0;
                    newMap.set(newValue, prevTimes + times);
                    continue;
                }

                const size = Math.floor(Math.log10(value)) + 1;

                if (size % 2 == 0) {
                    const dec = Math.pow(10, size / 2);

                    let left = Math.floor(value / dec);
                    let leftPrevTimes = newMap.get(left) ?? 0;
                    newMap.set(left, leftPrevTimes + times);

                    let right = value % dec;
                    let rightPrevTimes = newMap.get(right) ?? 0;
                    newMap.set(right, rightPrevTimes + times);
                    continue;
                }

                let newValue = value * 2024;
                let prevTimes = newMap.get(newValue) ?? 0;
                newMap.set(newValue, prevTimes + times);
            }

            map = newMap;
        }

        let total = 0;
        for (const [value, times] of map.entries()) {
            total += times;
        }

        return total;
    }
}