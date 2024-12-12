"use strict";

// [[https://adventofcode.com/2024/day/12]]
// Input file [[inputs/2024/day12.input.txt]]

import Puzzle from "src/Puzzle";
import Queue from "src/Utils/Queue.ts";

type Solution = number | undefined;

type Input = string[];

export default class Day12 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n');
    }

    async run1(input: Input): Promise<Solution> {
        let found = false;
        let total = 0;
        let map: string[][] = [];

        for (let y = 0; y < input.length + 2; y++) {
            const row: string[] = [];
            for (let x = 0; x < input[0].length + 2; x++) {
                if (y === 0 || y === input.length + 1 || x === 0 || x === input[0].length + 1) {
                    row.push('.');
                } else {
                    row.push(input[y - 1][x - 1]);
                }
            }
            map.push(row);
        }

        while (!found) {
            let x = 0;
            let y = 0;

            // Find first non-dot character
            outerLoop: for (y = 0; y < map.length; y++) {
                for (x = 0; x < map[y].length; x++) {
                    if (map[y][x] !== '.') {
                        found = true;
                        break outerLoop;
                    }
                }
            }

            if (!found) {
                break;
            }

            found = false;
            total += this.internalSolve1(map, x, y);
        }

        return total;
    }

    async run2(input: Input): Promise<Solution> {
        let found = false;
        let total = 0;
        let map: string[][] = [];

        for (let y = 0; y < input.length + 2; y++) {
            const row: string[] = [];
            for (let x = 0; x < input[0].length + 2; x++) {
                if (y === 0 || y === input.length + 1 || x === 0 || x === input[0].length + 1) {
                    row.push('.');
                } else {
                    row.push(input[y - 1][x - 1]);
                }
            }
            map.push(row);
        }

        while (!found) {
            let x = 0;
            let y = 0;

            outerLoop: for (y = 0; y < map.length; y++) {
                for (x = 0; x < map[y].length; x++) {
                    if (map[y][x] !== '.') {
                        found = true;
                        break outerLoop;
                    }
                }
            }

            if (!found) {
                break;
            }

            found = false;
            total += this.internalSolve2(map, x, y);
        }

        return total;
    }

    private internalSolve1(map: string[][], x: number, y: number): number {
        const anchor: string = map[y][x];
        let visitMaps = map.map(row => [...row]);
        let perimeter: number = 0;
        let size: number = 0;
        let points: Queue<{ x: number, y: number }> = new Queue();
        points.push({x, y});

        while (points.length > 0) {
            const point = points.peek();
            if (point === undefined) {
                break;
            }

            const posX = point.x;
            const posY = point.y;

            points.pop();

            if (map[posY][posX] != anchor) {
                continue;
            }

            size++;
            map[posY][posX] = '.';
            visitMaps[posY][posX] = '@';

            if (visitMaps[posY - 1][posX] != '@') {
                if (map[posY - 1][posX] == anchor) {
                    points.push({x: posX, y: posY - 1});
                } else {
                    perimeter++;
                }
            }

            if (visitMaps[posY + 1][posX] != '@') {
                if (map[posY + 1][posX] == anchor) {
                    points.push({x: posX, y: posY + 1});
                } else {
                    perimeter++;
                }
            }

            if (visitMaps[posY][posX - 1] != '@') {
                if (map[posY][posX - 1] == anchor) {
                    points.push({x: posX - 1, y: posY});
                } else {
                    perimeter++;
                }
            }

            if (visitMaps[posY][posX + 1] != '@') {
                if (map[posY][posX + 1] == anchor) {
                    points.push({x: posX + 1, y: posY});
                } else {
                    perimeter++;
                }
            }
        }

        return perimeter * size;
    }

    private internalSolve2(map: string[][], x: number, y: number): number {
        const anchor = map[y][x];

        // Initialize visit maps with all 1s
        const visitMaps: number[][] = Array(map.length).fill(0).map(() =>
            Array(map[0].length).fill(1)
        );

        let perimeter = 0;
        let size = 0;

        // TypeScript equivalent of queue<pair<int, int>>
        interface Point {
            x: number;
            y: number;
        }
        const points: Point[] = [];
        points.push({ x, y });

        while (points.length > 0) {
            const { x: posX, y: posY } = points.shift()!;

            if (map[posY][posX] !== anchor) {
                continue;
            }

            size++;
            map[posY][posX] = '.';
            visitMaps[posY][posX] = -11;

            if (visitMaps[posY][posX - 1] !== -11) {
                if (map[posY][posX - 1] === anchor) {
                    points.push({ x: posX - 1, y: posY });
                } else {
                    const index = 5;
                    visitMaps[posY][posX - 1] *= index;
                    if ((visitMaps[posY - 1][posX - 1] % index) !== 0 &&
                        (visitMaps[posY + 1][posX - 1] % index) !== 0) {
                        perimeter++;
                    }
                    if ((visitMaps[posY - 1][posX - 1] % index) === 0 &&
                        (visitMaps[posY + 1][posX - 1] % index) === 0) {
                        perimeter--;
                    }
                }
            }

            if (visitMaps[posY + 1][posX] !== -11) {
                if (map[posY + 1][posX] === anchor) {
                    points.push({ x: posX, y: posY + 1 });
                } else {
                    const index = 3;
                    visitMaps[posY + 1][posX] *= index;
                    if ((visitMaps[posY + 1][posX - 1] % index) !== 0 &&
                        (visitMaps[posY + 1][posX + 1] % index) !== 0) {
                        perimeter++;
                    }
                    if ((visitMaps[posY + 1][posX - 1] % index) === 0 &&
                        (visitMaps[posY + 1][posX + 1] % index) === 0) {
                        perimeter--;
                    }
                }
            }

            if (visitMaps[posY][posX + 1] !== -11) {
                if (map[posY][posX + 1] === anchor) {
                    points.push({ x: posX + 1, y: posY });
                } else {
                    const index = 7;
                    visitMaps[posY][posX + 1] *= index;
                    if ((visitMaps[posY - 1][posX + 1] % index) !== 0 &&
                        (visitMaps[posY + 1][posX + 1] % index) !== 0) {
                        perimeter++;
                    }
                    if ((visitMaps[posY - 1][posX + 1] % index) === 0 &&
                        (visitMaps[posY + 1][posX + 1] % index) === 0) {
                        perimeter--;
                    }
                }
            }

            if (visitMaps[posY - 1][posX] !== -11) {
                if (map[posY - 1][posX] === anchor) {
                    points.push({ x: posX, y: posY - 1 });
                } else {
                    const index = 2;
                    visitMaps[posY - 1][posX] *= index;
                    if ((visitMaps[posY - 1][posX - 1] % index) !== 0 &&
                        (visitMaps[posY - 1][posX + 1] % index) !== 0) {
                        perimeter++;
                    }
                    if ((visitMaps[posY - 1][posX - 1] % index) === 0 &&
                        (visitMaps[posY - 1][posX + 1] % index) === 0) {
                        perimeter--;
                    }
                }
            }
        }

        return perimeter * size;
    }
}