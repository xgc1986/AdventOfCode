"use strict";

// [[https://adventofcode.com/2023/day/11]]
// Input file [[inputs/2023/day11.input.txt]]

import Puzzle from "src/Puzzle";

type Input = string[][];

export default class Day11 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').filter((line) => line !== '').map((line) => line.split(''));

    }

    getInfo(galaxy: Input): number[][] {
        const info: number[][] = [[], []];

        for (let i = 0; i < galaxy.length; i++) {
            const line = galaxy[i];
            if (!line.includes('#')) {
                info[1].push(i);
            }
        }

        for (let j = 0; j < galaxy[0].length; j++) {
            let found = false;
            for (let i = 0; i < galaxy.length; i++) {
                if (galaxy[i][j] === '#') {
                    found = true;
                    break;
                }
            }

            if (!found) {
                info[0].push(j);
            }
        }

        return info;
    }

    getDistance(info: number[][], factor: number, from: number[], to: number[]): number {
        let distance = Math.abs(from[0] - to[0]) + Math.abs(from[1] - to[1]);

        let minX = Math.min(from[0], to[0]);
        let minY = Math.min(from[1], to[1]);
        let maxX = Math.max(from[0], to[0]);
        let maxY = Math.max(from[1], to[1]);

        let emptyX = 0;
        let emptyY = 0;
        for (const emptySpace of info[0]) {
            if (emptySpace > minX && emptySpace < maxX) {
                emptyX += (factor - 1);
            }

            if (emptySpace >= maxX) {
                break;
            }
        }
        for (const emptySpace of info[1]) {
            if (emptySpace > minY && emptySpace < maxY) {
                emptyY += (factor - 1);
            }

            if (emptySpace >= maxY) {
                break;
            }
        }

        return distance + emptyX + emptyY;
    }

    async run1(galaxy: Input): Promise<number> {
        const info = this.getInfo(galaxy);

        let coordinates = [];
        for (let i = 0; i < galaxy.length; i++) {
            for (let j = 0; j < galaxy[i].length; j++) {
                if (galaxy[i][j] === '#') {
                    coordinates.push([j, i]);
                }
            }
        }

        let sum = 0;

        for (let i = 0; i < coordinates.length - 1; i++) {
            for (let j = i + 1; j < coordinates.length; j++) {
                sum += this.getDistance(info, 2, coordinates[i], coordinates[j]);
            }
        }

        return sum;
    }

    async run2(galaxy: Input): Promise<number> {
        const info = this.getInfo(galaxy);

        let coordinates = [];
        for (let i = 0; i < galaxy.length; i++) {
            for (let j = 0; j < galaxy[i].length; j++) {
                if (galaxy[i][j] === '#') {
                    coordinates.push([j, i]);
                }
            }
        }

        let sum = 0;

        for (let i = 0; i < coordinates.length - 1; i++) {
            for (let j = i + 1; j < coordinates.length; j++) {
                sum += this.getDistance(info, 1000000, coordinates[i], coordinates[j]);
            }
        }

        return sum;
    }
}