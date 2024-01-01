"use strict";

// [[https://adventofcode.com/2023/day/5]]
// Input file [[inputs/2023/day5.input.txt]]

import Puzzle from "src/Puzzle";
import {UNumber} from "src/Utils";

interface Category {
    source: number,
    destination: number,
    range: number,
}

interface Map {
    name: string;
    categories: Category[];
}

interface Almanac {
    maps: Map[];
    seeds: number[];
}

type Input = Almanac;

export default class Day5 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const lines = input.split('\n').filter((line) => line !== '');

        const ret: Input = {
            maps: [],
            seeds: lines[0].match(/\d+/gi)?.map(Number) ?? [],
        };

        let currentMap: Map = {
            name: '',
            categories: [],
        };

        for (let i = 1; i < lines.length; i++) {
            if (lines[i].indexOf(':') >= 0) {
                currentMap = {
                    name: lines[i].split(' ')[0],
                    categories: [],
                };
                ret.maps.push(currentMap);
                continue;
            }

            const [destination, source, range] = lines[i].match(/\d+/gi)?.map(Number) ?? [0, 0, 0];

            currentMap.categories.push({
                source: +source,
                destination: +destination,
                range: +range,
            });
        }

        return ret;
    }

    calculate(input: Input, seed: number): number {
        let current = seed;
        for (const map of input.maps) {
            let found = false;
            for (const category of map.categories) {
                if (!found && UNumber.between(current, category.source, category.source + category.range)) {
                    current = current - category.source + category.destination;
                    found = true;
                }
            }
        }

        return current;
    }

    async run1(input: Input): Promise<number> {
        let minimum = Number.MAX_SAFE_INTEGER;

        for (const seed of input.seeds) {
            let current = this.calculate(input, seed);
            minimum = Math.min(minimum, current);
        }

        return minimum;
    }

    async run2(input: Input): Promise<number> {
        let minimum = Number.MAX_SAFE_INTEGER;

        for (let i = 0; i < input.seeds.length; i += 2) {
            let from = input.seeds[i];
            let add = input.seeds[i + 1];

            for (let seed = from; seed < from + add; seed++) {
                let current = this.calculate(input, seed);
                minimum = Math.min(minimum, current);
            }
        }

        return minimum;
    }
}

