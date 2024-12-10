"use strict";

// [[https://adventofcode.com/2024/day/10]]
// Input file [[inputs/2024/day10.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Input = number[][];

export default class Day10 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').map(line => line.split('').map(Number));
    }

    async run1(input: Input): Promise<Solution> {
        let total = 0;

        let tmpMemo: number[][] = [];
        let tmpVisits: number[][] = tmpMemo;
        for (let i = 0; i < input.length; i++) {
            tmpMemo[i] = [];
            tmpVisits[i] = [];
            for (let j = 0; j < input[0].length; j++) {
                tmpMemo[i][j] = -1;
                tmpVisits[i][j] = -1;
            }
        }

        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[0].length; x++) {
                if (input[y][x] != 0) {
                    continue;
                }

                let visits =  tmpVisits.map(row => [...row]);
                let memo =  tmpMemo.map(row => [...row]);
                let score = this.solve(input, memo, visits, x, y, false);
                total += score;
            }
        }
        return total;
    }

    async run2(input: Input): Promise<Solution> {
        let total = 0;

        let tmpMemo: number[][] = [];
        let tmpVisits: number[][] = tmpMemo;
        for (let i = 0; i < input.length; i++) {
            tmpMemo[i] = [];
            tmpVisits[i] = [];
            for (let j = 0; j < input[0].length; j++) {
                tmpMemo[i][j] = -1;
                tmpVisits[i][j] = -1;
            }
        }

        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[0].length; x++) {
                if (input[y][x] != 0) {
                    continue;
                }

                let visits =  tmpVisits;
                let memo =  tmpMemo.map(row => [...row]);
                let score = this.solve(input, memo, visits, x, y, true);
                total += score;
            }
        }
        return total;
    }

    solve(
        mountain: number[][],
        memo: number[][],
        visits: number[][],
        x: number,
        y: number,
        allowDistincs: boolean
    ) {
        if (!allowDistincs && visits[y][x] == 1) {
            return 0;
        }
        visits[y][x] = 1;

        if (mountain[y][x] == 9) {
            memo[y][x] = 1;
            return 1;
        }

        if (memo[y][x] != -1) {
            return memo[y][x];
        }

        let total = 0;
        const currentHeight = mountain[y][x];

        if (y > 0 && (currentHeight + 1) == mountain[y - 1][x]) {
            total += this.solve(mountain, memo, visits, x, y - 1, allowDistincs);
        }

        if (y < (mountain.length - 1) && (currentHeight + 1) == mountain[y + 1][x]) {
            total += this.solve(mountain, memo, visits, x, y + 1, allowDistincs);
        }

        if (x > 0 && (currentHeight + 1) == mountain[y][x - 1]) {
            total += this.solve(mountain, memo, visits, x - 1, y, allowDistincs);
        }

        if (x < (mountain[0].length - 1) && (currentHeight + 1) == mountain[y][x + 1]) {
            total += this.solve(mountain, memo, visits, x + 1, y, allowDistincs);
        }

        memo[y][x] = total;
        return total;
    }
}