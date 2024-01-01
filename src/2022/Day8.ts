"use strict";

// [[https://adventofcode.com/2022/day/8]]
// Input file [[inputs/2022/day8.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Input = number[][];

export default class Day8 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').map(line => line.split('').map(Number));
    }

    async run1(forest: Input): Promise<Solution> {
        const set = new Set();

        for (let row = 0; row < forest.length; row++) {
            let max = -1;
            for (let col = 0; col < forest[0].length; col++) {
                if (forest[row][col] > max) {
                    set.add(`${row},${col}`);
                    max = forest[row][col];
                }
            }

            max = -1;
            for (let j = forest[0].length - 1; j >= 0; j--) {
                if (forest[row][j] > max) {
                    set.add(`${row},${j}`);
                    max = forest[row][j];
                }
            }
        }

        for (let j = 0; j < forest[0].length; j++) {
            let max = -1;
            for (let i = 0; i < forest[0].length; i++) {
                if (forest[i][j] > max) {
                    set.add(`${i},${j}`);
                    max = forest[i][j];
                }
            }

            max = -1;
            for (let i = forest[0].length - 1; i >= 0; i--) {
                if (forest[i][j] > max) {
                    set.add(`${i},${j}`);
                    max = forest[i][j];
                }
            }
        }

        return set.size;
    }

    visibility(forest: number[][], row: number, col: number) {
        if ((row === 0) || (col === 0) || (row === forest.length - 1) || (col === forest[0].length - 1)) {
            return 0;
        }
        let total = 1;
        let find = 1;
        for (let r = row - find; r >= 0; r--) {
            if (forest[r][col] >= forest[row][col]) {
                break;
            }
            if (r > 0) {
                find++;
            }
        }
        total *= find;

        find = 1;
        for (let r = row + find; r < forest.length; r++) {
            if (forest[r][col] >= forest[row][col]) {
                break;
            }
            if (r < (forest.length - 1)) {
                find++;
            }
        }
        total *= find;

        find = 1;
        for (let c = col - find; c >= 0; c--) {
            if (forest[row][c] >= forest[row][col]) {
                break;
            }
            if (c > 0) {
                find++;
            }
        }
        total *= find;

        find = 1;
        for (let c = col + find; c < forest[0].length; c++) {
            if (forest[row][c] >= forest[row][col]) {
                break;
            }
            if (c < (forest[0].length - 1)) {
                find++;
            }
        }
        total *= find;

        return total;
    }

    async run2(forest: Input): Promise<Solution> {
        let total = 0;

        for (let row = 0; row < forest.length; row++) {
            for (let col = 0; col < forest[0].length; col++) {
                total = Math.max(this.visibility(forest, row, col), total);
            }
        }

        return total;
    }
}