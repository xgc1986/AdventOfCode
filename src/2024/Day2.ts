"use strict";

// [[https://adventofcode.com/2024/day/2]]
// Input file [[inputs/2024/day2.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Input = number[][];

export default class Day2 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split("\n").map(line => line.split(" ").map(Number));
    }

    async run1(reports: Input): Promise<Solution> {
        let total = 0
        for (const report of reports) {
            if (this.isSafe(report, -1)) {
                total++;
            }
        }

        return total;
    }

    async run2(reports: Input): Promise<Solution> {
        let total = 0
        for (const report of reports) {
            if (this.isSafe(report, -1)) {
                total++;
                continue;
            }

            for (let i = 0; i < report.length; i++) {
                if (this.isSafe(report, i)) {
                    total++;
                    break;
                }
            }
        }

        return total;
    }

    private isSafe(report: number[], dampedLevel: number): boolean {
        const MAX_DIFF = 3;
        let previousLevel = report[dampedLevel === 0 ? 1 : 0];
        let isIncreasing = false;
        let isDecreasing = false;

        for (let l = 0; l < report.length; l++) {
            if (dampedLevel === 0 && l === 1) {
                continue;
            }

            if (l === 0 || l === dampedLevel) {
                continue;
            }

            const level = report[l];

            if (level === previousLevel || Math.abs(level - previousLevel) > MAX_DIFF) {
                return false;
            }

            if (!isDecreasing && !isIncreasing) {
                isIncreasing = level > previousLevel;
                isDecreasing = level < previousLevel;
            }

            if (isIncreasing) {
                if (level < previousLevel) {
                    return false;
                }
            }

            if (isDecreasing) {
                if (level > previousLevel) {
                    return false;
                }
            }

            previousLevel = level;
        }

        return true;
    }
}