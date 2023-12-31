"use strict";

// [[https://adventofcode.com/2022/day/4]]
// Input file [[inputs/2022/day4.input.txt]]

import Puzzle from "src/Puzzle.ts";
import Range from "src/Utils/Range.ts";

type Solution = number | undefined;

type Input = Range[][];

export default class Day4 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').map(line => {
            const ranges = line.split(',');
            return ranges.map(range => {
                const [min, max] = range.split('-').map(Number);
                return new Range(min, max);
            });
        });
    }

    async run1(ranges: Input): Promise<Solution> {
        return ranges.filter(ranges => ranges[0].contains(ranges[1]) || ranges[1].contains(ranges[0])).length;
    }

    async run2(ranges: Input): Promise<Solution> {
        return ranges.filter(ranges => ranges[0].overlaps(ranges[1]) || ranges[1].overlaps(ranges[0])).length;
    }
}