"use strict";

// [[https://adventofcode.com/2015/day/3]]
// Input file [[inputs/2015/day3.input.txt]]

import Puzzle from "src/Puzzle";
import {StringMap} from "src/Utils";

interface Pos {
    col: number;
    row: number;
}

type Solution = number | undefined;

type Input = string;

export default class Day3 extends Puzzle<Input> {

    private readonly directions: StringMap<Pos> = {
        '^': {col: 0, row: 1},
        '>': {col: 1, row: 0},
        'v': {col: 0, row: -1},
        '<': {col: -1, row: 0}
    };

    parseInput(input: string): Input {
        return input;
    }

    async run1(directions: Input): Promise<Solution> {
        let pos = {col: 0, row: 0};
        const visited = new Set<String>();
        visited.add(`${pos.row},${pos.col}`);
        for (const direction of directions) {
            for (const char of direction) {
                pos.row += this.directions[char].row;
                pos.col += this.directions[char].col;
                visited.add(`${pos.row},${pos.col}`);
            }
        }

        return visited.size;
    }

    async run2(directions: Input): Promise<Solution> {
        let santaPos: Pos = {col: 0, row: 0};
        let robotPos: Pos = {col: 0, row: 0};

        const visited = new Set<string>();
        visited.add(`${santaPos.col},${santaPos.row}`);

        for (let d = 0; 0 < directions.length; d++) {
            const direction = directions[d];

            if (d % 2 === 0) {
                santaPos.row += this.directions[direction].row;
                santaPos.col += this.directions[direction].col;
                visited.add(`${santaPos.col},${santaPos.row}`);
            } else {
                robotPos.row += this.directions[direction].row;
                robotPos.col += this.directions[direction].col;
                visited.add(`${robotPos.col},${robotPos.row}`);
            }
        }

        return visited.size;
    }
}