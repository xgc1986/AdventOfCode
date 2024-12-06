"use strict";

// [[https://adventofcode.com/2024/day/6]]
// Input file [[inputs/2024/day6.input.txt]]

import Puzzle from "src/Puzzle";
import * as console from "node:console";

type Solution = number | undefined;

type Input = string[][];

type Dirs = '^' | 'v' | '<' | '>';
type Direction = {x: number, y: number, dir: Dirs};

export default class Day6 extends Puzzle<Input> {

    public SINGLE_INPUT_PARSE = false;

    parseInput(input: string): Input {
        return input.split('\n').map(line => line.split(''));
    }

    async run1(input: Input): Promise<Solution> {
        let dirs = {
            'v': {x: 0, y: 1, dir: '<'},
            '^': {x: 0, y: -1, dir: '>'},
            '>': {x: 1, y: 0, dir: 'v'},
            '<': {x: -1, y: 0, dir: '^'},
        };
        let guardPos: Direction = {x: 0, y: 0, dir: '^'};

        for (let y = 0; y < input.length; y++) {
            if (guardPos.x != 0) {
                break;
            }

            for (let x = 0; x < input[y].length; x++) {
                if (input[y][x] == '^') {
                    guardPos = {x, y, dir: '^'};
                    break;
                }
            }
        }

        let total = 1;

        while (guardPos.x > 0 && guardPos.x < input[0].length - 1 && guardPos.y > 0 && guardPos.y < input.length - 1) {
            const nextPos = {x: guardPos.x + dirs[guardPos.dir].x, y: guardPos.y + dirs[guardPos.dir].y, dir: guardPos.dir};
            if (input[nextPos.y][nextPos.x] == '#') {
                guardPos.dir = dirs[guardPos.dir].dir as Dirs;
            } else {
                if (input[nextPos.y][nextPos.x] == '.') {
                    input[nextPos.y][nextPos.x] = guardPos.dir;
                    total++;
                }

                guardPos = nextPos;
            }
        }

        return total;
    }

    async run2(input: Input): Promise<Solution> {
        let guardPos: Direction = {x: 0, y: 0, dir: '^'};

        for (let y = 0; y < input.length; y++) {
            if (guardPos.x != 0) {
                break;
            }

            for (let x = 0; x < input[y].length; x++) {
                if (input[y][x] == '^') {
                    guardPos = {x, y, dir: '^'};
                    break;
                }
            }
        }

        return this.solve(input, guardPos, true);
    }

    solve(map: Input, guardPos: Direction, allowBlock: boolean): number {
        let total = 0;

        let dirs = {
            'v': {x: 0, y: 1, dir: '<'},
            '^': {x: 0, y: -1, dir: '>'},
            '>': {x: 1, y: 0, dir: 'v'},
            '<': {x: -1, y: 0, dir: '^'},
        };

        while (guardPos.x > 0 && guardPos.x < map[0].length - 1 && guardPos.y > 0 && guardPos.y < map.length - 1) {
            const nextPos = {x: guardPos.x + dirs[guardPos.dir].x, y: guardPos.y + dirs[guardPos.dir].y, dir: guardPos.dir};
            if (map[nextPos.y][nextPos.x] == guardPos.dir) {
                return -1;
            } else if (map[nextPos.y][nextPos.x] == '#') {
                guardPos.dir = dirs[guardPos.dir].dir as Dirs;
            } else {
                if (map[nextPos.y][nextPos.x] == '.') {
                    let clonedMap = map.map(row => [...row]);
                    let clonedGuardPos = {...guardPos};
                    clonedMap[nextPos.y][nextPos.x] = '#';
                    if (allowBlock && this.solve(clonedMap, clonedGuardPos, false) == -1) {
                        total++;
                    }
                    map[nextPos.y][nextPos.x] = guardPos.dir;
                }
                guardPos = nextPos;
            }
        }

        return total;
    }
}