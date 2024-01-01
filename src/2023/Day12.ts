"use strict";

// [[https://adventofcode.com/2023/day/12]]
// Input file [[inputs/2023/day12.input.txt]]

import Puzzle from "src/Puzzle";
import {UMap} from "src/Utils";

interface Map {
    springs: string[];
    conditions: number[];
}

type Input = Map[];
export default class Day12 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').filter((line) => line !== '').map((line) => {
            return {
                springs: line.split(' ')[0].split(''),
                conditions: line.split(' ')[1].match(/\d+/g)?.map(Number) ?? []
            };
        });
    }

    buildKey(map: Map, pos: number, condition: number) {
        return `${map.springs.slice(pos).join('')}-${condition}`;
    }

    match(map: Map, currentPos: number, currentCondition: number, cache: UMap<number> = {}): number {

        const key = this.buildKey(map, currentPos, currentCondition);
        if (cache[key] !== undefined) {
            return cache[key];
        }

        let matches = 0;

        if (currentCondition === map.conditions.length) {
            let found = false;

            for (let i = currentPos; i < map.springs.length; i++) {
                if (map.springs[i] === '#') {
                    found = true;
                    break;
                }
            }

            if (found) {
                return 0;
            }

            return 1;
        }

        if (currentPos >= map.springs.length) {
            return 0;
        }

        if ((currentPos + map.conditions[currentCondition]) > map.springs.length) {
            return 0;
        }

        if (map.springs[currentPos] === '#') {
            const originalSpring = [...map.springs];

            for (let i = 1; i < map.conditions[currentCondition]; i++) {
                if (map.springs[currentPos + i] === '.') {
                    map.springs = originalSpring;
                    return 0;
                }

                map.springs[currentPos + i] = '#';
            }

            if ((currentPos + map.conditions[currentCondition]) < (map.springs.length)) {
                if (map.springs[currentPos + map.conditions[currentCondition]] === '?') {
                    map.springs[currentPos + map.conditions[currentCondition]] = '.';
                    matches += this.match(map, currentPos + map.conditions[currentCondition] + 1, currentCondition + 1, cache);
                } else if (map.springs[currentPos + map.conditions[currentCondition]] === '.') {
                    matches += this.match(map, currentPos + map.conditions[currentCondition] + 1, currentCondition + 1, cache);
                } else {
                    map.springs = originalSpring;
                    return 0;
                }
            } else {
                matches += this.match(map, currentPos + map.conditions[currentCondition] + 1, currentCondition + 1, cache);
            }
            map.springs = originalSpring;
        } else if (map.springs[currentPos] === '.') {
            matches += this.match(map, currentPos + 1, currentCondition, cache);
        } else {
            const originalSpring = [...map.springs];
            map.springs[currentPos] = '#';
            matches += this.match(map, currentPos, currentCondition, cache);
            map.springs[currentPos] = '.';
            matches += this.match(map, currentPos + 1, currentCondition, cache);
            map.springs = originalSpring;
        }

        cache[key] = matches;
        return matches;
    }

    async run1(maps: Input): Promise<number> {
        let sum = 0;

        for (const map of maps) {
            sum += this.match(map, 0, 0, {});
        }

        return sum;
    }

    async run2(maps: Input): Promise<number> {
        let sum = 0;

        for (const map of maps) {
            const tmp = map.springs.join('');
            map.springs = [tmp, tmp, tmp, tmp, tmp].join('?').split('');
            map.conditions = [...map.conditions, ...map.conditions, ...map.conditions, ...map.conditions, ...map.conditions];
            sum += this.match(map, 0, 0, {});
        }

        return sum;
    }
}