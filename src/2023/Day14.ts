"use strict";

// [[https://adventofcode.com/2023/day/14]]
// Input file [[inputs/2023/day14.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | string | undefined;

type Input = string[][];

export default class Day14 extends Puzzle<Input> {

    private found: number = 0;
    private size: number = 1;

    parseInput(input: string): Input {
        return input.split('\n').filter((line) => line !== '').map((line) => line.split(''));
    }

    moveNorth(platform: string[][]) {
        let found = true;
        while (found) {
            found = false;
            for (let i = 1; i < platform.length; i++) {
                for (let j = 0; j < platform[i].length; j++) {
                    if (platform[i][j] === 'O' && platform[i - 1][j] === '.') {
                        platform[i - 1][j] = platform[i][j];
                        platform[i][j] = '.';
                        found = true;
                    }
                }
            }
        }
    }

    moveWest(platform: string[][]) {
        let found = true;
        while (found) {
            found = false;
            for (let i = 0; i < platform.length; i++) {
                for (let j = 1; j < platform[i].length; j++) {
                    if (platform[i][j] === 'O' && platform[i][j - 1] === '.') {
                        platform[i][j - 1] = platform[i][j];
                        platform[i][j] = '.';
                        found = true;
                    }
                }
            }
        }
    }

    moveSouth(platform: string[][]) {
        let found = true;
        while (found) {
            found = false;
            for (let i = platform.length - 2; i >= 0; i--) {
                for (let j = 0; j < platform[i].length; j++) {
                    if (platform[i][j] === 'O' && platform[i + 1][j] === '.') {
                        platform[i + 1][j] = platform[i][j];
                        platform[i][j] = '.';
                        found = true;
                    }
                }
            }
        }
    }

    moveEast(platform: string[][]) {
        let found = true;
        while (found) {
            found = false;
            for (let i = 0; i < platform.length; i++) {
                for (let j = platform[i].length - 2; j >= 0; j--) {
                    if (platform[i][j] === 'O' && platform[i][j + 1] === '.') {
                        platform[i][j + 1] = platform[i][j];
                        platform[i][j] = '.';
                        found = true;
                    }
                }
            }
        }
    }

    cycle(platform: string[][], set: Set<string>): boolean | number {
        const key = platform.map((row) => row.join('')).join('')

        if (this.found === 0) {
            if (set.has(key)) {
                this.found = 1;
                set.clear();
            }
            set.add(key);
        } else if (this.found === 1) {
            if (set.has(key)) {
                this.found = 2;
                return this.size;
            }
            set.add(key);
            this.size++;
        }

        this.moveNorth(platform);
        this.moveWest(platform);
        this.moveSouth(platform);
        this.moveEast(platform);

        return false;
    }

    async run1(platform: Input): Promise<Solution> {
        this.found = 0;
        this.size = 1;

        let total = 0;

        this.moveNorth(platform);
        for (let i = 0; i < platform.length; i++) {
            const row = platform[i];
            for (const seat of row) {
                if (seat === 'O') {
                    total += platform.length - i;
                }
            }
        }

        return total;
    }

    async run2(platform: Input): Promise<Solution> {
        let total = 0;

        const set = new Set<string>();
        for (let i = 0; i < 1000000000; i++) {
            const res = this.cycle(platform, set)
            if (res !== false) {
                i = i + this.size * Math.floor((1000000000 - i) / this.size) - 1
            }
        }

        for (let i = 0; i < platform.length; i++) {
            const row = platform[i];
            for (const seat of row) {
                if (seat === 'O') {
                    total += platform.length - i;
                }
            }
        }

        return total;
    }
}