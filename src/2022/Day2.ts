"use strict";

// [[https://adventofcode.com/2022/day/2]]
// Input file [[inputs/2022/day2.input.txt]]

import Puzzle from "src/Puzzle.ts";
import {UMap} from "src/Utils.ts";

type Solution = number | undefined;

interface Match {
    oponent: string;
    you: string;
}

type Input = Match[];

export default class Day2 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').map(line => {
            const [oponent, you] = line.split(' ');
            return {oponent, you};
        });
    }

    async run1(matches: Input): Promise<Solution> {
        const results: UMap<number> = {
            'A X': 1 + 3,
            'A Y': 2 + 6,
            'A Z': 3,

            'B X': 1,
            'B Y': 2 + 3,
            'B Z': 3 + 6,

            'C X': 1 + 6,
            'C Y': 2,
            'C Z': 3 + 3,
        }

        return matches.reduce((acc, line) => acc + results[`${line.oponent} ${line.you}`], 0)
    }

    async run2(matches: Input): Promise<Solution> {
        const results: UMap<number> = {
            'A X': 3,
            'A Y': 1 + 3,
            'A Z': 2 + 6,

            'B X': 1,
            'B Y': 2 + 3,
            'B Z': 3 + 6,

            'C X': 2,
            'C Y': 3 + 3,
            'C Z': 1 + 6,
        }

        return matches.reduce((acc, line) => acc + results[`${line.oponent} ${line.you}`], 0)
    }
}