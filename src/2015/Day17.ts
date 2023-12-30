"use strict";

// [[https://adventofcode.com/2015/day/17]]
// Input file [[inputs/2015/day17.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | undefined;

type Input = number[];

export default class Day17 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').map(Number);
    }

    async run1(containers: Input): Promise<Solution> {
        let requirement = 150;
        let total = 0;

        for (let i = 0; i < 2 ** containers.length; i++) {
            const binary = i.toString(2).padStart(containers.length, '0');
            let sum = 0;
            for (let j = 0; j < containers.length; j++) {
                if (binary[j] === '1') {
                    sum += containers[j];
                }
            }

            if (sum === requirement) {
                total++;
            }
        }

        return total;
    }

    async run2(containers: Input): Promise<Solution> {
        let requirement = 150;
        let total = 0;
        let minimumContainers = Infinity;

        for (let i = 0; i < 2 ** containers.length; i++) {
            const binary = i.toString(2).padStart(containers.length, '0');
            let sum = 0;
            for (let j = 0; j < containers.length; j++) {
                if (binary[j] === '1') {
                    sum += containers[j];
                }
            }

            if (sum === requirement) {
                const containers = binary.replaceAll('0', '').length;
                if (containers < minimumContainers) {
                    total = 0;
                    minimumContainers = containers;
                }
                if (minimumContainers === containers) {
                    total++;
                }
            }
        }

        return total;
    }
}