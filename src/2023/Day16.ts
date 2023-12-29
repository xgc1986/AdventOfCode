"use strict";

// [[https://adventofcode.com/2023/day/16]]
// Input file [[inputs/2023/day16.input.txt]]

import Puzzle from "src/Puzzle.ts";
import {UObject} from "src/Utils.ts";

type Solution = number | string | undefined;

interface Beam {
    x: number;
    y: number;
    dir: 'N' | 'W' | 'S' | 'E';
}

interface Cell {
    char: string;
    dirs: ('N' | 'W' | 'S' | 'E')[];
    visited: boolean;
}

type Input = Cell[][];

export default class Day16 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').filter((line) => line !== '').map((line) => {
            return line.split('').map((char) => {
                return {
                    char,
                    dirs: [],
                    visited: false
                }
            });
        });
    }

    energyze(map: Input, beams: Beam[]): number {
        while (beams.length > 0) {
            const beam = beams.pop();

            if (beam === undefined) {
                continue;
            }

            if (!map[beam.y][beam.x].dirs.includes(beam.dir)) {
                map[beam.y][beam.x].dirs.push(beam.dir);
            } else {
                continue;
            }

            if (beam.dir === 'N' && beam.y > 0) {
                const nextX = beam.x;
                const nextY = beam.y - 1;
                if (map[nextY][nextX].char === '.') {
                    beams.push({x: nextX, y: nextY, dir: 'N'});
                } else if (map[nextY][nextX].char === 'o' && !map[nextY][nextX].dirs.includes('N')) {
                    beams.push({x: nextX, y: nextY, dir: 'N'});
                } else if (map[nextY][nextX].char === '-') {
                    beams.push({x: nextX, y: nextY, dir: 'W'});
                    beams.push({x: nextX, y: nextY, dir: 'E'});
                } else if (map[nextY][nextX].char === '|') {
                    beams.push({x: nextX, y: nextY, dir: 'N'});
                } else if (map[nextY][nextX].char === '/') {
                    beams.push({x: nextX, y: nextY, dir: 'E'});
                } else if (map[nextY][nextX].char === '\\') {
                    beams.push({x: nextX, y: nextY, dir: 'W'});
                }
            } else if (beam.dir === 'S' && beam.y < map.length - 1) {
                const nextX = beam.x;
                const nextY = beam.y + 1;
                if (map[nextY][nextX].char === '.') {
                    beams.push({x: nextX, y: nextY, dir: 'S'});
                } else if (map[nextY][nextX].char === 'o' && !map[nextY][nextX].dirs.includes('S')) {
                    beams.push({x: nextX, y: nextY, dir: 'S'});
                } else if (map[nextY][nextX].char === '-') {
                    beams.push({x: nextX, y: nextY, dir: 'W'});
                    beams.push({x: nextX, y: nextY, dir: 'E'});
                } else if (map[nextY][nextX].char === '|') {
                    beams.push({x: nextX, y: nextY, dir: 'S'});
                } else if (map[nextY][nextX].char === '/') {
                    beams.push({x: nextX, y: nextY, dir: 'W'});
                } else if (map[nextY][nextX].char === '\\') {
                    beams.push({x: nextX, y: nextY, dir: 'E'});
                }
            } else if (beam.dir === 'W' && beam.x > 0) {
                const nextX = beam.x - 1;
                const nextY = beam.y;
                if (map[nextY][nextX].char === '.') {
                    beams.push({x: nextX, y: nextY, dir: 'W'});
                } else if (map[nextY][nextX].char === 'o' && !map[nextY][nextX].dirs.includes('W')) {
                    beams.push({x: nextX, y: nextY, dir: 'W'});
                } else if (map[nextY][nextX].char === '-') {
                    beams.push({x: nextX, y: nextY, dir: 'W'});
                } else if (map[nextY][nextX].char === '|') {
                    beams.push({x: nextX, y: nextY, dir: 'N'});
                    beams.push({x: nextX, y: nextY, dir: 'S'});
                } else if (map[nextY][nextX].char === '/') {
                    beams.push({x: nextX, y: nextY, dir: 'S'});
                } else if (map[nextY][nextX].char === '\\') {
                    beams.push({x: nextX, y: nextY, dir: 'N'});
                }
            } else if (beam.dir === 'E' && beam.x < map[0].length - 1) {
                const nextX = beam.x + 1;
                const nextY = beam.y;
                if (map[nextY][nextX].char === '.') {
                    beams.push({x: nextX, y: nextY, dir: 'E'});
                } else if (map[nextY][nextX].char === 'o' && !map[nextY][nextX].dirs.includes('E')) {
                    beams.push({x: nextX, y: nextY, dir: 'E'});
                } else if (map[nextY][nextX].char === '-') {
                    beams.push({x: nextX, y: nextY, dir: 'E'});
                } else if (map[nextY][nextX].char === '|') {
                    beams.push({x: nextX, y: nextY, dir: 'N'});
                    beams.push({x: nextX, y: nextY, dir: 'S'});
                } else if (map[nextY][nextX].char === '/') {
                    beams.push({x: nextX, y: nextY, dir: 'N'});
                } else if (map[nextY][nextX].char === '\\') {
                    beams.push({x: nextX, y: nextY, dir: 'S'});
                }
            }

            if (map[beam.y][beam.x].char === '.') {
                map[beam.y][beam.x].char = 'o';
            }
            map[beam.y][beam.x].visited = true;
        }

        let total = 0;
        for (const row of map) {
            for (const cell of row) {
                if (cell.visited) {
                    total++;
                }
            }
        }

        return total;
    }

    async run1(mirror: Input): Promise<Solution> {
        let coords = [{x: 0, y: 0, dir: 'E'}];
        if (mirror[0][0].char === '\\') {
            coords = [{x: 0, y: 0, dir: 'S'}];
        }
        return this.energyze(UObject.deepCopy(mirror), coords as Beam[]);
    }

    async run2(mirror: Input): Promise<Solution> {
        let max = 0;
        const coords = [];

        // Up
        for (let i = 0; i < mirror[0].length; i++) {
            const x = i;
            const y = 0;

            let coord = [{x, y, dir: 'S'}];
            if (mirror[0][i].char === '\\') {
                coord = [{x, y, dir: 'E'}];
            } else if (mirror[0][i].char === '-') {
                coord = [{x, y, dir: 'E'}, {x, y, dir: 'W'}];
            } else if (mirror[0][i].char === '/') {
                coord = [{x, y, dir: 'W'}];
            }
            coords.push(coord);
        }

        // Down
        for (let i = 0; i < mirror[0].length; i++) {
            const x = i;
            const y = mirror.length - 1;

            let coord = [{x, y, dir: 'N'}];
            if (mirror[0][i].char === '\\') {
                coord = [{x, y, dir: 'W'}];
            } else if (mirror[0][i].char === '-') {
                coord = [{x, y, dir: 'E'}, {x, y, dir: 'W'}];
            } else if (mirror[0][i].char === '/') {
                coord = [{x, y, dir: 'E'}];
            }
            coords.push(coord);
        }

        // Right
        for (let i = 0; i < mirror.length; i++) {
            const x = 0;
            const y = i;

            let coord = [{x, y, dir: 'E'}];
            if (mirror[0][i].char === '\\') {
                coord = [{x, y, dir: 'S'}];
            } else if (mirror[0][i].char === '|') {
                coord = [{x, y, dir: 'N'}, {x, y, dir: 'S'}];
            } else if (mirror[0][i].char === '/') {
                coord = [{x, y, dir: 'N'}];
            }

            coords.push(coord);
        }

        // Left
        for (let i = 0; i < mirror.length; i++) {
            const x = mirror[0].length - 1;
            const y = i;

            let coord = [{x, y, dir: 'W'}];
            if (mirror[0][i].char === '\\') {
                coord = [{x, y, dir: 'N'}];
            } else if (mirror[0][i].char === '|') {
                coord = [{x, y, dir: 'N'}, {x, y, dir: 'S'}];
            } else if (mirror[0][i].char === '/') {
                coord = [{x, y, dir: 'S'}];
            }

            coords.push(coord);
        }

        for (const coord of coords) {
            const map = UObject.deepCopy(mirror)
            let res = this.energyze(map, coord as Beam[]);
            max = Math.max(max, res);
        }

        return max;
    }
}