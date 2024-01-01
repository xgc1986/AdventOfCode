"use strict";

// [[https://adventofcode.com/2022/day/14]]
// Input file [[inputs/2022/day14.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Input = string[];

export default class Day14 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n');
    }

    async run1(lines: Input): Promise<Solution> {
        let maxX = 0;
        let maxY = 0;

        let minX = Infinity;
        let minY = Infinity;

        for (const line of lines) {
            const movements = line.split(' -> ');
            for (const movement of movements) {
                const coords = movement.split(',');
                maxX = Math.max(parseInt(coords[0]) + 1, maxX);
                maxY = Math.max(parseInt(coords[1]) + 1, maxY);

                minX = Math.min(parseInt(coords[0]) - 1, minX);
                minY = Math.min(parseInt(coords[1]) - 10, minY);
            }
        }

        const sizeX = maxX - minX + 1;
        const sizeY = maxY - minY + 1;

        const cave = [];

        for (let i = 0; i < sizeY; i++) {
            const row = [];
            for (let j = 0; j < sizeX; j++) {
                row.push('.');
            }
            cave.push(row);
        }

        for (const line of lines) {
            const movements = line.split(' -> ');
            for (let i = 0; i < movements.length - 1; i++) {
                const coords0 = movements[i].split(',');
                const x0 = parseInt(coords0[0]) - minX;
                const y0 = parseInt(coords0[1]) - minY;

                const coords1 = movements[i + 1].split(',');
                const x1 = parseInt(coords1[0]) - minX;
                const y1 = parseInt(coords1[1]) - minY;

                this.drawLine(x0, y0, x1, y1, cave);
            }
        }

        const sandX = 500 - minX;
        cave[0][sandX] = '+';

        let amount = 0;
        let flowing = false;
        while (!flowing) {
            flowing = this.dropSand(sandX, cave, false);
            if (flowing) {
                break;
            }
            amount++;
        }
        this.markSand(sandX, cave);

        return amount;
    }

    async run2(lines: Input): Promise<Solution> {
        let sizeX = 0;
        let sizeY = 0;

        for (const line of lines) {
            const movements = line.split(' -> ');
            for (const movement of movements) {
                const coords = movement.split(',');
                sizeX = Math.max(parseInt(coords[0]), sizeX);
                sizeY = Math.max(parseInt(coords[1]) + 2, sizeY);
            }
        }

        sizeX = Math.max(sizeX, 500 + sizeY);

        const cave = [];

        for (let i = 0; i < sizeY; i++) {
            const row = [];
            for (let j = 0; j < sizeX; j++) {
                row.push('.');
            }
            cave.push(row);
        }

        for (const line of lines) {
            const movements = line.split(' -> ');
            for (let i = 0; i < movements.length - 1; i++) {
                const coords0 = movements[i].split(',');
                const x0 = parseInt(coords0[0]);
                const y0 = parseInt(coords0[1]);

                const coords1 = movements[i + 1].split(',');
                const x1 = parseInt(coords1[0]);
                const y1 = parseInt(coords1[1]);

                this.drawLine(x0, y0, x1, y1, cave);
            }
        }

        const sandX = 500;
        cave[0][sandX] = '+';

        let amount = 0;
        let flowing = false;
        while (!flowing) {
            flowing = this.dropSand(sandX, cave, true);
            amount++;
        }

        return amount;
    }

    drawLine(x0: number, y0: number, x1: number, y1: number, cave: string[][]) {
        for (let i = Math.min(y0, y1); i <= Math.max(y0, y1); i++) {
            for (let j = Math.min(x0, x1); j <= Math.max(x0, x1); j++) {
                cave[i][j] = '#';
            }
        }
    }

    dropSand(x: number, cave: string[][], tillTheEnd: boolean) {
        let sy = 0
        let sx = x;

        while (true) {
            if (sy === cave.length - 1) {
                if (tillTheEnd) {
                    break;
                }
                return true;
            }

            if (cave[sy + 1][sx] === '.') {
                // nothing
            } else if (cave[sy + 1][sx - 1] === '.') {
                sx--;
            } else if (cave[sy + 1][sx + 1] === '.') {
                sx++;
            } else {
                break;
            }

            sy++;
        }

        cave[sy][sx] = 'o';

        return sy === 0 && sx === x;
    }

    markSand(x: number, cave: string[][]): void {
        let sy = 0
        let sx = x;

        while (true) {
            cave[sy][sx] = '~';

            if (sy === cave.length - 1) {
                return;
            }

            if (cave[sy + 1][sx] === '.') {
                // nothing
            } else if (cave[sy + 1][sx - 1] === '.') {
                sx--;
            } else if (cave[sy + 1][sx + 1] === '.') {
                sx++;
            } else {
                break;
            }

            sy++;
        }
    }
}