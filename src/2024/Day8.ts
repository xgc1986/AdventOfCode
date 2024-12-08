"use strict";

// [[https://adventofcode.com/2024/day/8]]
// Input file [[inputs/2024/day8.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Input = {
    antennaes: { x: number, y: number, signal: string }[],
    width: number,
    height: number,
};

export default class Day8 extends Puzzle<Input> {

    parseInput(input: string): Input {
        let data = input.split('\n').map(line => line.split(''));
        let antennaes = [];
        for (let y = 0; y < data.length; y++) {
            for (let x = 0; x < data[y].length; x++) {
                if (data[y][x] !== '.') {
                    antennaes.push({x, y, signal: data[y][x]});
                }
            }
        }

        return {
            antennaes,
            width: data[0].length,
            height: data.length,
        };
    }

    async run1(input: Input): Promise<Solution> {
        let locations: Set<number> = new Set();
        let total = 0;

        for (const src of input.antennaes) {
            for (const dst of input.antennaes) {
                if (src === dst) {
                    continue;
                }

                if (src.signal !== dst.signal) {
                    continue;
                }

                const dx = dst.x - src.x;
                const dy = dst.y - src.y;

                if (
                    (src.x - dx) >= 0 &&
                    (src.x - dx) < input.width &&
                    (src.y - dy) >= 0 &&
                    (src.y - dy) < input.height
                ) {
                    if (!locations.has((src.x - dx) * 1000 + (src.y - dy))) {
                        total++;
                        locations.add((src.x - dx) * 1000 + (src.y - dy));
                    }
                }
            }
        }

        return total;
    }

    async run2(input: Input): Promise<Solution> {
        let locations: Set<number> = new Set();
        let total = 0;

        for (const src of input.antennaes) {
            for (const dst of input.antennaes) {
                if (src === dst) {
                    continue;
                }

                if (src.signal !== dst.signal) {
                    continue;
                }

                const dx = dst.x - src.x;
                const dy = dst.y - src.y;
                let resonance = 1;

                while (
                    (src.x - resonance * dx) >= 0 &&
                    (src.x - resonance * dx) < input.width &&
                    (src.y - resonance * dy) >= 0 &&
                    (src.y - resonance * dy) < input.height
                    ) {
                    if (!locations.has((src.x - resonance * dx) * 1000 + (src.y - resonance * dy))) {
                        total++;
                        locations.add((src.x - resonance * dx) * 1000 + (src.y - resonance * dy));
                    }
                    resonance++;
                }
            }
        }

        return total;
    }
}