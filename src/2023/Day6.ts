"use strict";

// [[https://adventofcode.com/2023/day/6]]
// Input file [[inputs/2023/day6.input.txt]]

import Puzzle from "src/Puzzle.ts";
import {UMath} from "src/Utils.ts";

interface Race {
    distance: number;
    time: number;
}

type Input = Race[];

export default class Day6 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const lines = input.split('\n').filter((line) => line !== '');

        const times = lines[0].match(/\d+/gi)?.map(Number) ?? [];
        const distances = lines[1].match(/\d+/gi)?.map(Number) ?? [];
        const ret = [];

        for (let i = 0; i < times.length; i++) {
            ret.push({
                distance: distances[i],
                time: times[i],
            });
        }

        return ret;
    }

    async run1(input: Input): Promise<number> {
        let total = 1;

        for (const race of input) {
            const xs = UMath.solveQuadratic(-1, race.time, -race.distance * 1.0000001);

            total *= (Math.abs(Math.floor(xs[1]) - Math.ceil(xs[0])) + 1);
        }

        return total;
    }

    async run2(input: Input): Promise<number> {
        let total = 1;

        let distance = ``;
        let time = ``;
        for (const race of input) {
            distance += race.distance;
            time += race.time;
        }

        const xs = UMath.solveQuadratic(-1, +time, -(+distance) * 1.0000001);

        total *= (Math.abs(Math.floor(xs[1]) - Math.ceil(xs[0])) + 1);

        return total;
    }
}