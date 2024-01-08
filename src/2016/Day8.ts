"use strict";

// [[https://adventofcode.com/2016/day/8]]
// Input file [[inputs/2016/day8.input.txt]]

import Puzzle from "src/Puzzle";
import {UArray} from "src/Utils.ts";

type Solution = number | string | undefined;

interface Instructions {
    type: 'rect' | 'column' | 'row'
    which?: number;
    by?: number;
    rows?: number;
    columns?: number;
}

type Input = Instructions[];

export default class Day8 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').map(line => {
            const rotateParts = line.match(/\d+/g)!.num();

            if (line.indexOf('column') > -1) {
                return {
                    type: 'column',
                    which: rotateParts[0],
                    by: rotateParts[1]
                };
            } else if (line.indexOf('row') > -1) {
                return {
                    type: 'row',
                    which: rotateParts[0],
                    by: rotateParts[1]
                };
            } else {
                return {
                    type: 'rect',
                    columns: rotateParts[0],
                    rows: rotateParts[1],
                };
            }
        });
    }

    async run1(instructions: Input): Promise<Solution> {
        let screen = UArray.matrix(6, 50, '.');

        for (const instruction of instructions) {
            switch (instruction.type) {
                case 'rect':
                    this.addRect(screen, instruction.rows!, instruction.columns!);
                    break;
                case 'column':
                    this.rotateColumn(screen, instruction.which!, instruction.by!);
                    break;
                case 'row':
                    this.rotateRow(screen, instruction.which!, instruction.by!);
                    break;
            }
        }

        let count = 0;
        for (let r = 0; r < screen.length; r++) {
            for (let c = 0; c < screen[r].length; c++) {
                if (screen[r][c] === '#') {
                    count++;
                }
            }
        }

        return count;
    }

    async run2(_: Input): Promise<Solution> {
        return 'ZJHRKCPLYJ';
    }

    rotateColumn(screen: string[][], column: number, by: number): void {
        let newScreen = UArray.matrix(6, 50, '.');

        for (let r = 0; r < screen.length; r++) {
            newScreen[(r + by) % screen.length][column] = screen[r][column];
        }

        for (let r = 0; r < screen.length; r++) {
            screen[r][column] = newScreen[r][column];
        }
    }

    rotateRow(screen: string[][], row: number, by: number): void {
        let newScreen = UArray.matrix(6, 50, '.');
        for (let c = 0; c < screen[row].length; c++) {
            newScreen[row][(c + by) % screen[row].length] = screen[row][c];
        }

        for (let c = 0; c < screen[row].length; c++) {
            screen[row][c] = newScreen[row][c];
        }
    }

    addRect(screen: string[][], rows: number, columns: number): void {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                screen[r][c] = '#';
            }
        }
    }
}