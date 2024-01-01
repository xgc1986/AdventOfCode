"use strict";

// [[https://adventofcode.com/2022/day/9]]
// Input file [[inputs/2022/day9.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

interface Direction {
    to: string;
    amount: number;
}

type Input = Direction[];

export default class Day9 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').map(line => {
            const [to, amount] = line.split(' ');

            return {to, amount: +amount};
        });
    }

    async run1(directions: Input): Promise<Solution> {
        return this.solve(directions, 2);
    }

    async run2(directions: Input): Promise<Solution> {
        return this.solve(directions, 10);
    }

    private solve(directions: Direction[], size: number): number {
        let minX = 0;
        let maxX = 0;
        let minY = 0;
        let maxY = 0;
        let currentX = 0;
        let currentY = 0;

        for (const d of directions) {
            const direction = d.to;
            const amount = d.amount;

            if (direction === 'D') {
                currentY += amount;
                maxY = Math.max(maxY, currentY);
            } else if (direction === 'U') {
                currentY -= amount;
                minY = Math.min(minY, currentY);
            } else if (direction === 'L') {
                currentX -= amount;
                minX = Math.min(minX, currentX);
            } else {
                currentX += amount;
                maxX = Math.max(maxX, currentX);
            }
        }

        const rows = maxY - minY + 1 + 2;
        const columns = maxX - minX + 1 + 2;

        let startX = 1 - minX;
        let startY = 1 - minY;

        const knots = [];

        for (let s = 0; s < size; s++) {
            knots.push({x: startX, y: startY});
        }

        let map: number[][] = [];

        for (let i = 0; i < rows; i++) {
            const mapRow: number[] = [];

            for (let j = 0; j < columns; j++) {
                mapRow.push(0);
            }

            map.push(mapRow);
        }

        map[knots[0].y][knots[0].x] = 1;

        return this.snake(map, directions, knots);
    }

    private snake(map: number[][], instructions: Direction[], knots: { x: number, y: number }[] = []): number {
        for (const instruction of instructions) {
            const direction = instruction.to;
            const amount = instruction.amount;

            for (let a = 0; a < amount; a++) {
                if (direction === 'U') {
                    knots[0].y--;
                } else if (direction === 'D') {
                    knots[0].y++;
                } else if (direction === 'L') {
                    knots[0].x--;
                } else {
                    knots[0].x++;
                }

                for (let k = 1; k < knots.length; k++) {
                    if ((knots[k].x + 2 === knots[k - 1].x) && (knots[k].y + 2 === knots[k - 1].y)) {
                        knots[k].x++;
                        knots[k].y++;
                    } else if ((knots[k].x + 2 === knots[k - 1].x) && (knots[k].y - 2 === knots[k - 1].y)) {
                        knots[k].x++;
                        knots[k].y--;
                    } else if ((knots[k].x - 2 === knots[k - 1].x) && (knots[k].y + 2 === knots[k - 1].y)) {
                        knots[k].x--;
                        knots[k].y++;
                    } else if ((knots[k].x - 2 === knots[k - 1].x) && (knots[k].y - 2 === knots[k - 1].y)) {
                        knots[k].x--;
                        knots[k].y--;
                    } else if (knots[k].x + 2 === knots[k - 1].x) {
                        knots[k].x++;
                        knots[k].y = knots[k - 1].y;
                    } else if (knots[k].x - 2 === knots[k - 1].x) {
                        knots[k].x--;
                        knots[k].y = knots[k - 1].y;
                    } else if (knots[k].y + 2 === knots[k - 1].y) {
                        knots[k].y++;
                        knots[k].x = knots[k - 1].x;
                    } else if (knots[k].y - 2 === knots[k - 1].y) {
                        knots[k].y--;
                        knots[k].x = knots[k - 1].x;
                    }
                }

                map[knots[knots.length - 1].y][knots[knots.length - 1].x] = 1;
            }
        }

        let total = 0;
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[0].length; j++) {
                total += map[i][j];
            }
        }

        return total;
    }
}