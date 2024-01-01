"use strict";

// [[https://adventofcode.com/2015/day/16]]
// Input file [[inputs/2015/day16.input.txt]]

import Puzzle from "src/Puzzle";
import {StringMap} from "src/Utils";

type Solution = number | undefined;

interface Aunt {
    number: number;
    presents: StringMap<number>;
}

type Input = Aunt[];

export default class Day16 extends Puzzle<Input> {

    private ticket: StringMap<number> = {
        children: 3,
        cats: 7,
        samoyeds: 2,
        pomeranians: 3,
        akitas: 0,
        vizslas: 0,
        goldfish: 5,
        trees: 3,
        cars: 2,
        perfumes: 1,
    }

    parseInput(input: string): Input {
        return input.split('\n').map((line) => {
            const matches = line.match(/Sue (\d+): (.*)/);

            if (matches === null) {
                throw new Error(`Invalid input: ${line}`);
            }

            const aunt: Aunt = {
                number: Number(matches[1]),
                presents: {}
            };

            matches[2].split(', ').forEach((present) => {
                const [name, count] = present.split(': ');
                aunt.presents[name] = Number(count);
            });

            return aunt;
        });
    }

    async run1(aunts: Input): Promise<Solution> {
        for (const aunt of aunts) {
            let invalid = false;
            for (const p in aunt.presents) {
                if (aunt.presents[p] !== this.ticket[p]) {
                    invalid = true;
                    break;
                }
            }

            if (!invalid) {
                return aunt.number;
            }
        }

        return 0;
    }

    async run2(aunts: Input): Promise<Solution> {
        for (const aunt of aunts) {
            let invalid = false;
            for (const p in aunt.presents) {
                if (p === 'cats' || p === 'trees') {
                    if (this.ticket[p] >= aunt.presents[p]) {
                        invalid = true;
                        break;
                    }
                } else if (p === 'pomeranians' || p === 'goldfish') {
                    if (this.ticket[p] <= aunt.presents[p]) {
                        invalid = true;
                        break;
                    }
                } else {
                    if (aunt.presents[p] !== this.ticket[p]) {
                        invalid = true;
                        break;
                    }
                }
            }

            if (!invalid) {
                return aunt.number;
            }
        }

        return 0;
    }
}