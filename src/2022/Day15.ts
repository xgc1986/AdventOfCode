"use strict";

// [[https://adventofcode.com/2022/day/15]]
// Input file [[inputs/2022/day15.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | undefined;

type Input = string[];

export default class Day15 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n');
    }

    async run1(lines: Input): Promise<Solution> {
        const Y = this.mode === 'input' ? 2000000 : 10;
        const set = new Set();

        for (const line of lines) {
            const matches = line.match(/\d+/gi) ?? ['0', '0', '0', '0'];
            const sx = parseInt(matches[0]);
            const sy = parseInt(matches[1]);
            const bx = parseInt(matches[2]);
            const by = parseInt(matches[3]);

            const distance = Math.abs(sx - bx) + Math.abs(sy - by);
            const range = distance - Math.abs(Y - sy);

            if (range < 0) {
                continue;
            }

            for (let x = sx - range; x < sx + range; x++) {
                set.add(`${x},${Y}`);
            }
        }

        return set.size;
    }

    async run2(lines: Input): Promise<Solution> {
        const MAX = (this.mode !== 'sample' ? 20 : 4000000);

        for (let y = 0; y < MAX; y++) {
            let ranges: number[][] = [];

            for (const line of lines) {
                const matches = line.match(/-*\d+/gi) ?? ['', '', '', ''];
                const sx = parseInt(matches[0]);
                const sy = parseInt(matches[1]);
                const bx = parseInt(matches[2]);
                const by = parseInt(matches[3]);

                const distance = Math.abs(sx - bx) + Math.abs(sy - by);
                const range = distance - Math.abs(y - sy);

                if (range < 0) {
                    continue;
                }

                ranges = this.mergeRanges(ranges, [Math.max(sx - range, 0), Math.min(sx + range, MAX)]);
            }

            if (ranges.length === 2) {
                return y + 4000000 * (ranges[1][0] - 1);
            }
        }

        return 0;
    }

    merge(rangeA: number[], rangeB: number[]): number[][] {
        if (rangeA[1] < (rangeB[0] - 1)) {
            return [rangeA, rangeB];
        }

        if (rangeB[1] < (rangeA[0] - 1)) {
            return [rangeB, rangeA];
        }

        return [[Math.min(rangeA[0], rangeB[0]), Math.max(rangeA[1], rangeB[1])]];
    }

    mergeRanges(ranges: number[][], newRange: number[]): number[][] {
        if (ranges.length === 0) {
            return [newRange];
        }

        ranges.push(newRange);
        ranges.sort((a, b) => a[0] - b[0]);

        const newRanges = [ranges[0]];

        for (let i = 1; i < ranges.length; i++) {
            const merged = this.merge(newRanges[newRanges.length - 1], ranges[i]);
            if (merged.length === 1) {
                newRanges[newRanges.length - 1] = merged[0];
            } else {
                newRanges.push(merged[1]);
            }
        }

        return newRanges;
    }
}