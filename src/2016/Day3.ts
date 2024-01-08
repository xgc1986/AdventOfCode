"use strict";

// [[https://adventofcode.com/2016/day/3]]
// Input file [[inputs/2016/day3.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Input = number[][];

export default class Day3 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').map(line => line.match(/\d+/gi)!.num());
    }

    private isATriangle(data: number[]): boolean {
        const [a, b, c] = data;
        return (a + b > c) && (a + c > b) && (b + c > a);
    }

    async run1(triangles: Input): Promise<Solution> {
        return triangles.filter(data => this.isATriangle(data)).length;
    }

    async run2(triangles: Input): Promise<Solution> {
        let count = 0;
        for (const group of triangles.groupsOf(3)) {
            count += this.isATriangle([group[0][0], group[1][0], group[2][0]]) ? 1 : 0;
            count += this.isATriangle([group[0][1], group[1][1], group[2][1]]) ? 1 : 0;
            count += this.isATriangle([group[0][2], group[1][2], group[2][2]]) ? 1 : 0;
        }

        return count;
    }
}