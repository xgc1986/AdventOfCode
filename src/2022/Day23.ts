"use strict";

// [[https://adventofcode.com/2022/day/23]]
// Input file [[inputs/2022/day23.input.txt]]

import Puzzle from "src/Puzzle";
import {Debug, StringMap, UArray} from "src/Utils.ts";
import * as console from "console";
import * as process from "process";

type Solution = number | undefined;

interface Elf {
    row: number;
    col: number;
    directions: string[];
}

interface Crater {
    map: string[][];
    elves: Elf[];
    north: number;
    south: number;
    west: number;
    east: number;
    movements: number;
}

type Input = Crater;

export default class Day23 extends Puzzle<Input> {

    private dirs: StringMap<number[]> = {
        'N': [-1, 0],
        'S': [1, 0],
        'W': [0, -1],
        'E': [0, 1]
    };

    private inFront: StringMap<number[][]> = {
        'N': [[-1, -1], [-1, 0], [-1, 1]],
        'S': [[1, -1], [1, 0], [1, 1]],
        'W': [[-1, -1], [0, -1], [1, -1]],
        'E': [[-1, 1], [0, 1], [1, 1]]
    }

    private rounds: number = 0;

    parseInput(input: string): Input {
        const extraSpace = 55;

        const crater: Crater = {
            map: [],
            elves: [],
            north: Infinity,
            south: 0,
            west: Infinity,
            east: 0,
            movements: 0
        };

        const lines = input.split('\n');

        const newLines = [];
        for (let i = 0; i < extraSpace; i++) {
            newLines.push('.'.repeat(lines[0].length + 2 * extraSpace));
        }

        for (const line of lines) {
            newLines.push('.'.repeat(extraSpace) + line + '.'.repeat(extraSpace));
        }

        for (let i = 0; i < extraSpace; i++) {
            newLines.push('.'.repeat(lines[0].length + 2 * extraSpace));
        }

        crater.map = newLines.map(line => line.split(''));

        for (const [row, line] of crater.map.entries()) {
            for (const [col, cell] of line.entries()) {
                if (cell === '.') {
                    continue;
                }

                crater.elves.push({
                    row,
                    col,
                    directions: ['N', 'S', 'W', 'E']
                });
            }
        }

        return crater;
    }

    private refillMap(crater: Crater) {
        crater.north = crater.map.length;
        crater.south = 0;
        crater.west = crater.map[0].length;
        crater.east = 0;

        crater.map = UArray.matrix(crater.map.length, crater.map[0].length, '.');
        for (const elf of crater.elves) {
            crater.map[elf.row][elf.col] = '#';

            crater.north = Math.min(crater.north, elf.row);
            crater.south = Math.max(crater.south, elf.row);
            crater.west = Math.min(crater.west, elf.col);
            crater.east = Math.max(crater.east, elf.col);
        }
    }

    async run1(crater: Input): Promise<Solution> {
        this.rounds = 0;
        for (let i = 0; i < 10; i++) {
            await this.move(crater);

            if (crater.movements > 0) {
                this.rounds++;
            } else {
                break;
            }
        }

        return (crater.south - crater.north + 1) * (crater.east - crater.west + 1) - crater.elves.length;
    }

    async run2(crater: Input): Promise<Solution> {
        while (crater.movements) {
            await this.move(crater);

            if (crater.movements === 0) {
                break;
            } else {
                this.rounds++
            }

            const width = crater.map[0].length;
            const height = crater.map.length;
            for (const elf of crater.elves) {
                if (elf.row === 0 || elf.row === height - 1 || elf.col === 0 || elf.col === width - 1) {
                    console.log('edge: (increase variable `extraSpace` on line 500)');
                    process.exit(1);
                }
            }
        }

        return this.rounds + 1;
    }


    async move(crater: Crater) {
        let considerations: Map<string, Elf> = new Map();

        // round 1
        for (const elf of crater.elves) {
            const surroundings = UArray.surround8(crater.map, elf.row, elf.col);
            if (surroundings.filter(s => s === '#').length === 0) {
                elf.directions.push(elf.directions.shift()!);
                continue;
            }

            let chosenDirection = undefined;

            for (const direction of elf.directions) {
                let valids = 0;
                for (const option of this.inFront[direction]) {
                    const cell = UArray.matrixValue(crater.map, elf.row + option[0], elf.col + option[1]);
                    if (cell === '.') {
                        valids++;
                    }
                }

                if (valids === 3) {
                    chosenDirection = direction;

                    break;
                }
            }

            elf.directions.push(elf.directions.shift()!);

            if (chosenDirection === undefined) {
                continue;
            }

            const nr = elf.row + this.dirs[chosenDirection][0];
            const nc = elf.col + this.dirs[chosenDirection][1];

            if (considerations.has(`${nr},${nc}`)) {
                considerations.delete(`${nr},${nc}`);
            } else {
                considerations.set(`${nr},${nc}`, elf);
            }
        }

        crater.movements = considerations.size;

        // round2
        for (const [hash, elf] of considerations.entries()) {
            const [row, col] = hash.split(',').map(Number);

            elf.row = row;
            elf.col = col;
        }

        this.refillMap(crater);
    }
}

// 1029