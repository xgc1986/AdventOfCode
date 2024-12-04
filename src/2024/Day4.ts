"use strict";

// [[https://adventofcode.com/2024/day/4]]
// Input file [[inputs/2024/day4.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Input = string[][];

export default class Day4 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').map(line => line.split(''));
    }

    async run1(input: Input): Promise<Solution> {
        let total = 0;
        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[y].length; x++) {
                if (
                    y >= 3 &&
                    input[y][x] === 'X' &&
                    input[y - 1][x] === 'M' &&
                    input[y - 2][x] === 'A' &&
                    input[y - 3][x] === 'S') {
                    total++;
                }
                if (
                    y >= 3 &&
                    x < (input[y].length - 3) &&
                    input[y][x] === 'X' &&
                    input[y - 1][x + 1] === 'M' &&
                    input[y - 2][x + 2] === 'A' &&
                    input[y - 3][x + 3] === 'S') {
                    total++;
                }
                if (
                    x < (input[y].length - 3) &&
                    input[y][x] === 'X' &&
                    input[y][x + 1] === 'M' &&
                    input[y][x + 2] === 'A' &&
                    input[y][x + 3] === 'S') {
                    total++;
                }
                if (
                    y < (input.length - 3) &&
                    x < (input[y].length - 3) &&
                    input[y][x] === 'X' &&
                    input[y + 1][x + 1] === 'M' &&
                    input[y + 2][x + 2] === 'A' &&
                    input[y + 3][x + 3] === 'S') {
                    total++;
                }
                if (
                    y < (input.length - 3) &&
                    input[y][x] === 'X' &&
                    input[y + 1][x] === 'M' &&
                    input[y + 2][x] === 'A' &&
                    input[y + 3][x] === 'S') {
                    total++;
                }
                if (
                    y < (input.length - 3) &&
                    x >= 3 &&
                    input[y][x] === 'X' &&
                    input[y + 1][x - 1] === 'M' &&
                    input[y + 2][x - 2] === 'A' &&
                    input[y + 3][x - 3] === 'S') {
                    total++;
                }
                if (
                    x >= 3 &&
                    input[y][x] === 'X' &&
                    input[y][x - 1] === 'M' &&
                    input[y][x - 2] === 'A' &&
                    input[y][x - 3] === 'S') {
                    total++;
                }
                if (
                    y >= 3 &&
                    x >= 3 &&
                    input[y][x] === 'X' &&
                    input[y - 1][x - 1] === 'M' &&
                    input[y - 2][x - 2] === 'A' &&
                    input[y - 3][x - 3] === 'S') {
                    total++;
                }
            }
        }

        return total;
    }

    async run2(input: Input): Promise<Solution> {
        let total = 0;
        for (let y = 1; y < input.length - 1; y++) {
            for (let x = 1; x < input[y].length - 1; x++) {

                if (input[y][x] !== 'A') {
                    continue;
                }

                const nw = input[y - 1][x - 1];
                const ne = input[y - 1][x + 1];
                const sw = input[y + 1][x - 1];
                const se = input[y + 1][x + 1];

                if (
                    (nw == 'M' && ne == 'M' && se == 'S' && sw == 'S') ||
                    (nw == 'S' && ne == 'M' && se == 'M' && sw == 'S') ||
                    (nw == 'S' && ne == 'S' && se == 'M' && sw == 'M') ||
                    (nw == 'M' && ne == 'S' && se == 'S' && sw == 'M')
                ) {
                    total++;
                }
            }
        }

        return total;
    }
}