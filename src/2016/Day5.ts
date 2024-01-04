"use strict";

// [[https://adventofcode.com/2016/day/5]]
// Input file [[inputs/2016/day5.input.txt]]

import Puzzle from "src/Puzzle";
import {createHash} from "node:crypto";

type Solution = string | undefined;

type Input = string;

export default class Day5 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input;
    }

    async run1(code: Input): Promise<Solution> {
        let index = 0;
        let pass = ''
        while (pass.length < 8) {
            const hash = createHash('md5').update(`${code}${index}`).digest('hex');
            if (hash.startsWith('00000')) {
                pass += hash[5];
            }
            index++;
        }
        return pass;
    }

    async run2(code: Input): Promise<Solution> {
        let index = 0;
        let pass = '00000000'
        let found = [false, false, false, false, false, false, false, false];
        let decoded = 0;
        while (decoded < 8) {
            const hash = createHash('md5').update(`${code}${index}`).digest('hex');
            if (hash.startsWith('00000') && hash[5] >= '0' && hash[5] <= '7') {
                const pos = +hash[5];
                if (!found[pos]) {
                    found[pos] = true;
                    pass = pass.replaceAt(pos, hash[6]);
                    decoded++;
                }
            }
            index++;
        }
        return pass;
    }
}