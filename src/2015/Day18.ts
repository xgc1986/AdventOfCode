"use strict";

// [[https://adventofcode.com/2015/day/18]]
// Input file [[inputs/2015/day18.input.txt]]

import Puzzle from "src/Puzzle";
import {UArray, UObject} from "src/Utils";

type Solution = number | undefined;

type Input = string[][];

export default class Day18 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').map(line => line.split(''));
    }

    turn(matrix: string[][], row: number, col: number) {
        const nb = UArray.surround8(matrix, row, col).filter(cell => cell === '#').length;
        const cell = matrix[row][col];

        if (cell === '#') {
            return nb === 2 || nb === 3;
        } else {
            return nb === 3;
        }
    }

    fixPositions(matrix: string[][], fixes: number[][]) {
        for (const [row, col] of fixes) {
            matrix[row][col] = '#';
        }
    }

    evolve(matrix: string[][]) {
        const copy = UObject.deepCopy(matrix);
        for (let r = 0; r < matrix.length; r++) {
            for (let c = 0; c < matrix.length; c++) {
                if (this.turn(copy, r, c)) {
                    matrix[r][c] = '#';
                } else {
                    matrix[r][c] = '.';
                }
            }
        }
    }

    async run1(lights: Input): Promise<Solution> {
        lights = UObject.deepCopy(lights);
        for (let i = 0; i < 100; i++) {
            this.evolve(lights);
        }

        let sum = 0;
        for (let r = 0; r < lights.length; r++) {
            for (let c = 0; c < lights.length; c++) {
                if (lights[r][c] === '#') {
                    sum++;
                }
            }
        }

        return sum;
    }

    async run2(lights: Input): Promise<Solution> {
        const fixedLigthts = [
            [0, 0],
            [0, lights[0].length - 1],
            [lights.length - 1, 0],
            [lights.length - 1, lights[0].length - 1],
        ];

        for (let i = 0; i < 100; i++) {
            this.fixPositions(lights, fixedLigthts);
            this.evolve(lights);
        }
        this.fixPositions(lights, fixedLigthts);

        let sum = 0;
        for (let r = 0; r < lights.length; r++) {
            for (let c = 0; c < lights.length; c++) {
                if (lights[r][c] === '#') {
                    sum++;
                }
            }
        }

        return sum;
    }
}