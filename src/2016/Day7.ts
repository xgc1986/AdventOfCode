"use strict";

// [[https://adventofcode.com/2016/day/7]]
// Input file [[inputs/2016/day7.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Input = string[];

export default class Day7 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n');
    }

    private abba(parts: string[]): boolean {
        for (const ins of parts) {
            for (let i = 0; i < ins.length - 3; i++) {
                if (ins[i] === ins[i + 3] && ins[i + 1] === ins[i + 2] && ins[i] !== ins[i + 1]) {
                    return true;
                }
            }
        }

        return false;
    }

    private findABAs(parts: string[]): string[] {
        const abas: string[] = [];

        for (const ins of parts) {
            for (let i = 0; i < ins.length - 2; i++) {
                if (ins[i] === ins[i + 2] && ins[i] !== ins[i + 1]) {
                    abas.push(`${ins[i]}${ins[i + 1]}${ins[i + 2]}`);
                }
            }
        }

        return abas;
    }

    private containsBAB(parts: string[], abas: string[]): boolean {
        for (const ins of parts) {
            for (let i = 0; i < ins.length - 2; i++) {
                if (ins[i] === ins[i + 2] && ins[i] !== ins[i + 1]) {
                    if (abas.includes(`${ins[i + 1]}${ins[i]}${ins[i + 1]}`)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    async run1(ips: Input): Promise<Solution> {
        let count = 0;

        for (const ip of ips) {
            const insides = ip.match(/\[\w+]/g)!.map(x => x.slice(1, -1));
            const outsides = ip.split(/\[\w+]/g);

            if (!this.abba(insides) && this.abba(outsides)) {
                count++;
            }
        }

        return count;
    }

    async run2(ips: Input): Promise<Solution> {
        let count = 0;

        for (const ip of ips) {
            const insides = ip.match(/\[\w+]/g)!.map(x => x.slice(1, -1));
            const outsides = ip.split(/\[\w+]/g);

            if (this.containsBAB(insides, this.findABAs(outsides))) {
                count++;
            }
        }

        return count;
    }
}