"use strict";

// [[https://adventofcode.com/2023/day/10]]
// Input file [[inputs/2023/day10.input.txt]]

import Puzzle from "src/Puzzle";
import {UArray, UMap} from "src/Utils";

type Char = '┌' | '┐' | '└' | '┘' | '─' | '│' | ' ' | 'S' | '#';
type Directions = 'top' | 'right' | 'bottom' | 'left';
type Input = Char[][];

export default class Day10 extends Puzzle<Input> {

    private paths: UMap<UMap<Directions>> = {
        '┌': {
            bottom: 'left', // never
            left: 'bottom',
            right: 'top', // never
            top: 'right',
        },
        '┐': {
            bottom: 'right', // never
            left: 'top', // never
            right: 'bottom',
            top: 'left',
        },
        '└': {
            bottom: 'right',
            left: 'top',
            right: 'bottom', // never
            top: 'left', // never
        },
        '┘': {
            bottom: 'left',
            left: 'bottom', // never
            right: 'top',
            top: 'right', // never
        },
        '─': {
            bottom: 'top', // never
            left: 'left',
            right: 'right',
            top: 'bottom', // never
        },
        '│': {
            bottom: 'bottom',
            left: 'right', // never
            right: 'left', // never
            top: 'top',
        },
        ' ': {
            bottom: 'top', // never
            left: 'right', // never
            right: 'left', // never
            top: 'bottom', // never
        },
        'S': {
            bottom: 'top', // never
            left: 'right', // never
            right: 'left', // never
            top: 'bottom', // never
        },
    }

    private directions = {
        top: [0, -1],
        right: [1, 0],
        bottom: [0, 1],
        left: [-1, 0],
    }

    parseInput(input: string): Input {
        const lines = input.split('\n').filter((line) => line !== '');
        const map: Input = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const row: Char[] = [];
            for (let j = 0; j < line.length; j++) {
                row.push(this.parseChar(line[j]));
            }
            map.push(row);
        }

        return map;
    }

    private parseChar(char: string): Char {
        switch (char) {
            case '.':
                return ' ';
            case 'F':
                return '┌';
            case '-':
                return '─';
            case '7':
                return '┐';
            case 'L':
                return '└';
            case 'J':
                return '┘';
            case '|':
                return '│';
        }

        return char as 'S';
    }

    private findStart(map: Input): { x: number, y: number, direction: Directions } {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] === 'S') {
                    const top = UArray.matrixValue(map, i - 1, j);
                    const right = UArray.matrixValue(map, i, j + 1);
                    const bottom = UArray.matrixValue(map, i + 1, j);
                    const left = UArray.matrixValue(map, i, j - 1);

                    const fromTop = top === '│' || top === '┌' || top === '┐';
                    const fromRight = right === '─' || right === '┐' || right === '┘';
                    const fromBottom = bottom === '│' || bottom === '└' || bottom === '┘';
                    const fromLeft = left === '─' || left === '┌' || left === '└';

                    if (fromTop && fromRight) {
                        return {x: j, y: i, direction: 'top'};
                    } else if (fromTop && fromLeft) {
                        return {x: j, y: i, direction: 'top'};
                    } else if (fromBottom && fromRight) {
                        return {x: j, y: i, direction: 'bottom'};
                    } else if (fromBottom && fromLeft) {
                        return {x: j, y: i, direction: 'bottom'};
                    } else if (fromTop && fromBottom) {
                        return {x: j, y: i, direction: 'top'};
                    } else if (fromLeft && fromRight) {
                        return {x: j, y: i, direction: 'right'};
                    }
                    break;
                }
            }
        }

        return {x: 0, y: 0, direction: 'top'};
    }

    async run1(map: Input): Promise<number> {
        const {x, y, direction} = this.findStart(map);
        let cx = x;
        let cy = y;
        let cdirection = direction;
        let steps = 0;

        do {
            steps++;
            cx += this.directions[cdirection][0];
            cy += this.directions[cdirection][1];
            cdirection = this.paths[map[cy][cx]][cdirection];
        } while (x !== cx || y !== cy);

        return steps / 2;
    }

    async run2(map: Input): Promise<number> {
        const {x, y, direction} = this.findStart(map);
        let cx = x;
        let cy = y;
        let cdirection = direction;
        let steps = 0;

        do {
            if (map[cy][cx] !== '┐' && map[cy][cx] !== '└') {
                map[cy][cx] = '#';
            } else {
                map[cy][cx] = 'S';
            }
            steps++;
            cx += this.directions[cdirection][0];
            cy += this.directions[cdirection][1];
            if (x !== cx || y !== cy) {
                cdirection = this.paths[map[cy][cx]][cdirection];
            }
        } while (x !== cx || y !== cy);

        let sum = 0;

        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] === '#' || map[i][j] === 'S') {
                    continue;
                }

                let inside = false;
                const limit = Math.min(map.length - i, map[i].length - j);
                for (let k = 0; k < limit; k++) {
                    if (map[i + k][j + k] === '#') {
                        inside = !inside;
                    }
                }

                if (inside) {
                    sum++;
                }
            }
        }

        return sum;
    }
}