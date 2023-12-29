"use strict";

// https://adventofcode.com/2023/day/3
// Input file [[inputs/2023/day2.input.txt]]

import Puzzle from "src/Puzzle.ts";

interface Group {
    blue: number;
    green: number;
    red: number;
}

interface Game {
    id: number;
    sets: Group[];
}

type Input = Game[];

export default class Day2 extends Puzzle<Input> {

    isValid(current: Group, restrictions: Group): boolean {
        for (const color in current) {
            if (current[color as keyof Group] > restrictions[color as keyof Group]) {
                return false;
            }
        }

        return true;
    }

    parseInput(input: string): Input {
        const lines = input.split('\n').filter((line) => line !== '');
        let id = 0;

        return lines.map((line) => {
            line = line.split(': ')[1];
            id++;

            const sets = line.split('; ').map((set) => {
                const cube: Group = {
                    blue: 0,
                    green: 0,
                    red: 0,
                };

                set.split(', ').forEach((c) => {
                    const parts = c.split(' ');
                    cube[parts[1] as keyof Group] = +parts[0];
                });

                return cube;
            })

            return {
                id,
                sets
            };
        });
    }

    async run1(input: Input): Promise<number> {
        const restrictions: Group = {
            red: 12,
            green: 13,
            blue: 14,
        };

        let total = 0;

        for (const game of input) {
            let isValid = true;
            for (const set of game.sets) {
                if (!this.isValid(set, restrictions)) {
                    isValid = false;
                    break;
                }
            }

            if (isValid) {
                total += game.id;
            }
        }

        return total;
    }

    async run2(input: Input): Promise<number> {
        let total = 0;

        for (const game of input) {
            let minRed = 0;
            let minGreen = 0;
            let minBlue = 0;

            for (const set of game.sets) {
                minRed = Math.max(set.red, minRed);
                minGreen = Math.max(set.green, minGreen);
                minBlue = Math.max(set.blue, minBlue);
            }

            total += minRed * minGreen * minBlue;
        }

        return total;
    }
}