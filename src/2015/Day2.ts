"use strict";

// [[https://adventofcode.com/2015/day/2]]
// Input file [[inputs/2015/day2.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | string | undefined;

interface Size {
    length: number;
    width: number;
    height: number;
}

type Input = Size[];

export default class Day2 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').map(line => {
            const [length, width, height] = line.split('x');
            return {
                length: +length,
                width: +width,
                height: +height
            };
        });
    }

    async run1(sizes: Input): Promise<Solution> {
        let total = 0;
        for (const size of sizes) {
            const areas = [size.length * size.width, size.width * size.height, size.length * size.height];
            const smallestArea = Math.min(...areas);
            const totalArea = areas.reduce((total, area) => total + 2 * area, 0);
            total += totalArea + smallestArea;
        }

        return total;
    }

    async run2(sizes: Input): Promise<Solution> {
        let total = 0;
        for (const size of sizes) {
            const perimeter = 2 * Math.min(size.length + size.width, size.width + size.height, size.length + size.height);
            const volume = size.length * size.width * size.height;
            total += perimeter + volume;
        }

        return total;
    }
}