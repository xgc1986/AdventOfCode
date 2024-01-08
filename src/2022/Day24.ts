"use strict";

// [[https://adventofcode.com/2022/day/24]]
// Input file [[inputs/2022/day24.input.txt]]

import Puzzle from "src/Puzzle";
import {StringMap, UArray} from "src/Utils.ts";

type Solution = number | undefined;

interface Valley {
    winds: Wind[];
    map: string[][];
}

interface Wind {
    row: number;
    col: number;
    dir: string;
}

type Input = Valley;

export default class Day24 extends Puzzle<Input> {

    private dirs: StringMap<number[]> = {
        'N': [-1, 0],
        'S': [1, 0],
        'E': [0, 1],
        'W': [0, -1]
    };

    private maps: String[][][] = [];

    private windDirs: StringMap<number[]> = {
        '^': [-1, 0],
        'v': [1, 0],
        '>': [0, 1],
        '<': [0, -1]
    };

    private part1Steps: number = 0;

    parseInput(input: string): Input {
        const ret: Valley = {
            map: input.split('\n').map(line => line.split('')),
            winds: [],
        };

        for (const [row, line] of ret.map.entries()) {
            for (const [col, char] of line.entries()) {
                if (char === '^' || char === 'v' || char === '>' || char === '<') {
                    ret.winds.push({row, col, dir: char});
                }
            }
        }

        const loopSize = (ret.map.length - 2) * (ret.map[0].length - 2);

        let tmpMap = ret.map;
        for (let i = 0; i <= loopSize; i++) {
            this.maps.push(tmpMap);
            for (const wind of ret.winds) {
                wind.row += this.windDirs[wind.dir][0];
                wind.col += this.windDirs[wind.dir][1];

                if (wind.col === 0) {
                    wind.col = tmpMap[0].length - 2;
                } else if (wind.col === tmpMap[0].length - 1) {
                    wind.col = 1;
                } else if (wind.row === 0) {
                    wind.row = tmpMap.length - 2;
                } else if (wind.row === tmpMap.length - 1) {
                    wind.row = 1;
                }
            }
            tmpMap = this.updateMap(tmpMap, ret.winds);
        }
        this.maps.pop();
        return ret;
    }

    async goTo(from: number[], to: number[], carriedSteps: number): Promise<number> {
        const queue = [{pos: from, steps: carriedSteps, stack: [] as string[]}];
        const cache: StringMap<boolean> = {};

        while (queue.length > 0) {
            const current = queue.pop()!;
            const pos = current.pos;
            const steps = current.steps;

            if (pos[0] === to[0] && pos[1] === to[1]) {
                return steps;
            }

            for (const [to, dir] of this.dirs.entries() as [string, number[]][]) {
                const newPos = [current.pos[0] + dir[0], current.pos[1] + dir[1]];
                if (this.maps[(steps + 1) % this.maps.length][newPos[0]]?.[newPos[1]] !== '.') {
                    continue;
                }

                if (cache[`${newPos.join(',')},${steps + 1}`]) {
                    continue;
                }
                cache[`${newPos.join(',')},${steps + 1}`] = true;
                queue.push({pos: newPos, steps: steps + 1, stack: [...current.stack, to]});
            }

            if (this.maps[(steps + 1) % this.maps.length][pos[0]][pos[1]] === '.') {
                if (!cache[`${pos.join(',')},${steps + 1}`]) {
                    cache[`${pos.join(',')},${steps + 1}`] = true;
                    queue.push({pos, steps: steps + 1, stack: [...current.stack, '-']});
                }
            }

            queue.sort((a, b) => {
                return b.steps - a.steps;
            });
        }

        return Infinity;
    }

    private updateMap(map: string[][], winds: Wind[]): string[][] {
        const newMap = UArray.matrix(map.length, map[0].length, '.');
        for (let i = 0; i < map.length; i++) {
            newMap[i][0] = '#';
            newMap[i][map[0].length - 1] = '#';
        }

        for (let i = 0; i < map[0].length; i++) {
            newMap[0][i] = '#';
            newMap[map.length - 1][i] = '#';
        }

        newMap[0][1] = '.';
        newMap[map.length - 1][map[0].length - 2] = '.';

        for (const wind of winds) {
            newMap[wind.row][wind.col] = wind.dir;
        }

        return newMap;
    }

    async run1(winds: Input): Promise<Solution> {
        this.part1Steps = await this.goTo([0, 1], [winds.map.length - 1, winds.map[0].length - 2], 0);
        return this.part1Steps;
    }

    async run2(winds: Input): Promise<Solution> {
        const steps = await this.goTo([winds.map.length - 1, winds.map[0].length - 2], [0, 1], this.part1Steps);
        return await this.goTo([0, 1], [winds.map.length - 1, winds.map[0].length - 2], steps);
    }
}

// > 239