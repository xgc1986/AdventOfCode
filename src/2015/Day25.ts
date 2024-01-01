"use strict";

// [[https://adventofcode.com/2015/day/25]]
// Input file [[inputs/2015/day25.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Input = number[];

export default class Day25 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const data =  input.match(/To continue, please consult the code grid in the manual. {2}Enter the code at row (\d+), column (\d+)./)?.map(Number) || [];
        data.shift();
        return data;
    }

    async run1(data: Input): Promise<Solution> {
        const [row, column] = data;
        const code = 20151125;
        const multiplier = 252533;
        const divider = 33554393;

        let currentRow = 1;
        let currentColumn = 1;
        let currentCode = code;
        while (currentRow !== row || currentColumn !== column) {
            currentCode = (currentCode * multiplier) % divider;
            if (currentRow === 1) {
                currentRow = currentColumn + 1;
                currentColumn = 1;
            } else {
                currentRow--;
                currentColumn++;
            }
        }

        return currentCode;
    }

    async run2(_: Input): Promise<Solution> {
        return undefined;
    }
}