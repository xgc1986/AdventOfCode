"use strict";

// [[https://adventofcode.com/2022/day/13]]
// Input file [[inputs/2022/day13.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | undefined;

type Input = string[];

export default class Day13 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').filter((line) => line !== '');
    }

    async run1(lines: Input): Promise<Solution> {
        let total = 0;

        for (let i = 0; i < lines.length; i += 2) {
            const packet1 = JSON.parse(lines[i]) as number[];
            const packet2 = JSON.parse(lines[i + 1]) as number[];
            const result = this.inOrder(packet1, packet2);

            if (result) {
                total += (i / 2) + 1
            }
        }

        return total;
    }

    async run2(lines: Input): Promise<Solution> {
        const signal = [];

        for (const line of lines) {
            signal.push(JSON.parse(line));
        }

        signal.push([[2]]);
        signal.push([[6]]);

        signal.sort(this.compare);

        let decoderKey = 1;
        for (let i = 0; i < signal.length; i++) {
            if (this.compare(signal[i], [[2]]) === 0) {
                decoderKey *= (i + 1);
            }
            if (this.compare(signal[i], [[6]]) === 0) {
                decoderKey *= (i + 1);
            }
        }

        return decoderKey;
    }

    private readonly compare = (packet1: number[][]|number[], packet2: number[][]|number[]): number => {
        const res = this.inOrder(packet1 as number[], packet2 as number[]);

        if (res === undefined) {
            return 0;
        }

        if (res) {
            return -1;
        }

        return 1;
    }

    private inOrder(packet1: number[] | number, packet2: number[] | number) {
        if (packet1 === packet2) {
            return undefined;
        }

        if (packet2 === undefined) {
            return false;
        }

        if (typeof packet1 === 'number' && typeof packet2 === 'number') {
            return packet1 < packet2;
        }

        if (typeof packet1 === 'number' && typeof packet2 === 'object') {
            packet1 = [packet1];

            for (let i = 0; i < packet1.length; i++) {
                const res = this.inOrder(packet1[i], packet2[i]);
                if (res === true) {
                    return true;
                }
                if (res === false) {
                    return false;
                }
            }

            if (packet1.length < packet2.length) {
                return true;
            }

            if (packet1.length > packet2.length) {
                return false;
            }
        } else if (typeof packet1 === 'object' && typeof packet2 === 'number') {
            packet2 = [packet2];

            for (let i = 0; i < packet1.length; i++) {
                const res = this.inOrder(packet1[i], packet2[i]);
                if (res === true) {
                    return true;
                }
                if (res === false) {
                    return false;
                }
            }

            if (packet1.length < packet2.length) {
                return true;
            }

            if (packet1.length > packet2.length) {
                return false;
            }
        } else {
            for (let i = 0; i < Math.min((packet1 as number[]).length, (packet2 as number[]).length); i++) {
                const res = this.inOrder((packet1 as number[])[i], (packet2 as number[])[i]);
                if (res === true) {
                    return true;
                }
                if (res === false) {
                    return false;
                }
            }

            if ((packet1 as number[]).length < (packet2 as number[]).length) {
                return true;
            }

            if ((packet1 as number[]).length > (packet2 as number[]).length) {
                return false;
            }
        }

        return undefined;
    }
}