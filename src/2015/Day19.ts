"use strict";

// [[https://adventofcode.com/2015/day/19]]
// Input file [[inputs/2015/day19.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | undefined;

interface Replacement {
    from: string;
    to: string;
}

interface Molecule {
    replacements: Replacement[];
    input: string;
}

type Input = Molecule;

export default class Day19 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const molecule: Molecule = {
            replacements: [],
            input: ''
        };

        input.split('\n').forEach(line => {
            if (line.includes('=>')) {
                const [from, to] = line.split(' => ');
                molecule.replacements.push({from, to});
            } else if (line.length > 0) {
                molecule.input = line;
            }
        });

        return molecule;
    }

    calibrate(input: string, replacement: Replacement, at: number): string| undefined {
        if (replacement.from.length + at > input.length) {
            return undefined;
        }

        let sub = input.slice(0, at) + replacement.to + input.slice(at + replacement.from.length);

        for (let i = 0; i < replacement.from.length; i++) {
            if (input[at + i] !== replacement.from[i]) {
                return undefined;
            }
        }

        return sub;
    }

    hohoho(input: string, replacements: Replacement[], steps: number, tries: number): number {
        if (tries === 1000) {
            return Infinity;
        }

        if ('e' === input) {
            return steps;
        }

        const replacement = replacements[Math.floor(Math.random() * replacements.length)];

        const res = input.replace(replacement.to, replacement.from);

        if (res === input) {
            return this.hohoho(res, replacements, steps, tries + 1);
        } else {
            return this.hohoho(res, replacements, steps + 1, tries + 1);
        }
    }

    async run1(molecule: Input): Promise<Solution> {
        const set = new Set();

        for (const rep of molecule.replacements) {
            for (let i = 0; i < molecule.input.length; i++) {
                const sub = this.calibrate(molecule.input, rep, i);
                if (sub) {
                    set.add(sub);
                }
            }
        }

        return set.size;
    }

    async run2(molecule: Input): Promise<Solution> {
        let solution = Infinity;
        while (solution === Infinity) {
            solution = this.hohoho(molecule.input, molecule.replacements, 0, 0);
        }

        return solution;
    }
}