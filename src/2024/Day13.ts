"use strict";

// [[https://adventofcode.com/2024/day/13]]
// Input file [[inputs/2024/day13.input.txt]]

import Puzzle from "src/Puzzle";
import * as process from "node:process";

type Solution = number | undefined;

type Input = { x: number, y: number, total: number}[][];

export default class Day13 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const lines = input.split('\n');

        let res: Input = [];

        for (let i = 0; i < lines.length; i+=3) {
            let data = [];

            let regex = /X\+(\d+).*Y\+(\d+)/g;
            let matches= regex.exec(lines[i]) ?? [];
            const A1 = parseInt(matches[1] ?? "0");
            const B1 = parseInt(matches[2] ?? "0");

            regex = /X\+(\d+).*Y\+(\d+)/g;
            matches= regex.exec(lines[i + 1]) ?? [];
            const A2 = parseInt(matches[1] ?? "0");
            const B2 = parseInt(matches[2] ?? "0");

            regex = /X=(\d+).*Y=(\d+)/g;
            matches= regex.exec(lines[i + 2]) ?? [];
            const A3 = parseInt(matches[1] ?? "0");
            const B3 = parseInt(matches[2] ?? "0");

            res.push([
                { x: A1, y: A2, total: A3 },
                { x: B1, y: B2, total: B3 },
            ]);

            i++;
        }

        return res;
    }

    async run1(input: Input): Promise<Solution> {
        let total = 0;

        for (const formula of input) {
            const aX     = formula[0].x;
            const aY     = formula[0].y;
            const aTotal = formula[0].total;

            const bX     = formula[1].x;
            const bY     = formula[1].y;
            const bTotal = formula[1].total;

            const y = Math.floor((aX * bTotal - bX * aTotal) / (aX * bY - bX * aY));
            const x = Math.floor((aTotal - ( aY * y)) / aX);

            if (
                aX * x + aY * y === aTotal &&
                bX * x + bY * y === bTotal
            ) {
                total += 3 * x + y;
            }
        }

        return total;
    }

    async run2(input: Input): Promise<Solution> {
        let total = 0;

        for (const formula of input) {
            const aX     = formula[0].x;
            const aY     = formula[0].y;
            const aTotal = formula[0].total + 10000000000000;

            const bX     = formula[1].x;
            const bY     = formula[1].y;
            const bTotal = formula[1].total + 10000000000000;

            const y = Math.floor((aX * bTotal - bX * aTotal) / (aX * bY - bX * aY));
            const x = Math.floor((aTotal - ( aY * y)) / aX);

            if (
                aX * x + aY * y === aTotal &&
                bX * x + bY * y === bTotal
            ) {
                total += 3 * x + y;
            }
        }

        return total;
    }
}