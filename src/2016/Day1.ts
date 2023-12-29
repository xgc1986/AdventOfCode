"use strict";

// [[https://adventofcode.com/2016/day/1]]
// Input file [[inputs/2016/day1.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | string| undefined;

interface Movement {
    direction: 'L' | 'R';
    distance: number;
}

type Input = Movement[];

export default class Day1 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split(', ').map((part) => {
            return {
                direction: part[0] as 'L' | 'R',
                distance: +part.slice(1)
            };
        });
    }

    async run1(movements: Input): Promise<Solution> {
        let dir = 'N'
        let x = 0;
        let y = 0;

        for (const movement of movements) {
            const turn = movement.direction;
            const amount = movement.distance;

            if (dir === 'N') {
                if (turn === 'L') {
                    dir = 'W';
                    x = x - amount;
                } else {
                    dir = 'E';
                    x = x + amount;
                }
            } else if (dir === 'S') {
                if (turn === 'L') {
                    dir = 'E';
                    x = x + amount;
                } else {
                    dir = 'W';
                    x = x - amount;
                }
            } else if (dir === 'E') {
                if (turn === 'L') {
                    dir = 'N';
                    y = y + amount;
                } else {
                    dir = 'S';
                    y = y - amount;
                }
            } else if (dir === 'W') {
                if (turn === 'L') {
                    dir = 'S';
                    y = y - amount;
                } else {
                    dir = 'N';
                    y = y + amount;
                }
            }
        }

        return Math.abs(x) + Math.abs(y);
    }

    async run2(movements: Input): Promise<Solution> {
        let dir = 'N'
        let x = 0;
        let y = 0;

        const set = new Set();
        set.add(`${x}-${y}`);

        for (const movement of movements) {
            let found = false;
            const turn = movement.direction;
            const amount = movement.distance;

            if (dir === 'N') {
                if (turn === 'L') {
                    dir = 'W';
                    for (let i = 1; i <= amount; i++) {
                        x--;
                        if (set.has(`${x}-${y}`)) {
                            found = true;
                            break;
                        }
                        set.add(`${x}-${y}`);
                    }
                } else {
                    dir = 'E';
                    for (let i = 1; i <= amount; i++) {
                        x++;
                        if (set.has(`${x}-${y}`)) {
                            found = true;
                            break;
                        }
                        set.add(`${x}-${y}`);
                    }
                }
            } else if (dir === 'S') {
                if (turn === 'L') {
                    dir = 'E';
                    for (let i = 1; i <= amount; i++) {
                        x++;
                        if (set.has(`${x}-${y}`)) {
                            found = true;
                            break;
                        }
                        set.add(`${x}-${y}`);
                    }
                } else {
                    dir = 'W';
                    for (let i = 1; i <= amount; i++) {
                        x--;
                        if (set.has(`${x}-${y}`)) {
                            found = true;
                            break;
                        }
                        set.add(`${x}-${y}`);
                    }
                }
            } else if (dir === 'E') {
                if (turn === 'L') {
                    dir = 'N';
                    for (let i = 1; i <= amount; i++) {
                        y++;
                        if (set.has(`${x}-${y}`)) {
                            found = true;
                            break;
                        }
                        set.add(`${x}-${y}`);
                    }
                } else {
                    dir = 'S';
                    for (let i = 1; i <= amount; i++) {
                        y--;
                        if (set.has(`${x}-${y}`)) {
                            found = true;
                            break;
                        }
                        set.add(`${x}-${y}`);
                    }
                }
            } else if (dir === 'W') {
                if (turn === 'L') {
                    dir = 'S';
                    for (let i = 1; i <= amount; i++) {
                        y--;
                        if (set.has(`${x}-${y}`)) {
                            found = true;
                            break;
                        }
                        set.add(`${x}-${y}`);
                    }
                } else {
                    dir = 'N';
                    for (let i = 1; i <= amount; i++) {
                        y++;
                        if (set.has(`${x}-${y}`)) {
                            found = true;
                            break;
                        }
                        set.add(`${x}-${y}`);
                    }
                }
            }

            if (found) {
                break;
            }
        }

        return Math.abs(x) + Math.abs(y);
    }
}