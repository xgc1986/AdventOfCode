"use strict";

// [[https://adventofcode.com/2023/day/13]]
// Input file [[inputs/2023/day13.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Input = string[][];

export default class Day13 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const mirrors: string[][] = [];
        let mirror: string[] = [];
        mirrors.push(mirror);

        const lines = input.split('\n');

        for (let i = 0; i < lines.length; i++) {
            if (lines[i] === '') {
                mirror = [];
                mirrors.push(mirror);
            } else {
                mirror.push(lines[i]);
            }
        }

        return mirrors;
    }

    isVerticalSymmetric(mirror: string[], x: number, nudges: number): boolean {
        if (x === 0) {
            return false;
        }

        let first = x - 1;
        let second = x;
        let errors = 0;

        while (first >= 0 && second < mirror[0].length) {
            for (let i = 0; i < mirror.length; i++) {
                if (mirror[i][first] !== mirror[i][second]) {
                    errors++;
                }
            }

            first--;
            second++;
        }

        return errors === nudges;
    }

    isHorizontalSymmetric(mirror: string[], y: number, nudges: number): boolean {
        if (y === 0) {
            return false;
        }

        let first = y - 1;
        let second = y;
        let errors = 0;

        while (first >= 0 && second < mirror.length) {
            for (let j = 0; j < mirror[0].length; j++) {
                if (mirror[first][j] !== mirror[second][j]) {
                    errors++;
                }
            }

            first--;
            second++;
        }

        return errors === nudges;
    }

    findSymmetry(mirror: string[], nudges: number): number[] {
        for (let i = 1; i < mirror.length; i++) {
            if (this.isHorizontalSymmetric(mirror, i, nudges)) {
                return [0, i];
            }
        }

        for (let j = 1; j < mirror[0].length; j++) {
            if (this.isVerticalSymmetric(mirror, j, nudges)) {
                return [j, 0];
            }
        }

        return [0, 0];
    }

    async run1(mirrors: Input): Promise<number> {
        let total = 0;

        for (const mirror of mirrors) {
            const [x, y] = this.findSymmetry(mirror, 0);

            total += 100 * y + x;
        }

        return total;
    }

    async run2(mirrors: Input): Promise<number> {
        let total = 0;

        for (const mirror of mirrors) {
            const [x, y] = this.findSymmetry(mirror, 1);

            total += 100 * y + x;
        }

        return total;
    }
}