"use strict";

// https://adventofcode.com/2023/day/1
// Input file [[inputs/2023/day1.input.txt]]

import Puzzle from "src/Puzzle";

export default class Day1 extends Puzzle<string[]> {

    parseInput(input: string): string[] {
        return input
            .replaceAll('twone', 'twoone')
            .replaceAll('oneight', 'oneeight')
            .replaceAll('threeight', 'threeeight')
            .replaceAll('fiveight', 'fiveeeight')
            .replaceAll('eighthree', 'eightthree')
            .replaceAll('eightwo', 'eighttwo')
            .replaceAll('nineight', 'nineeight')
            .split('\n');
    }

    replaceNames(input: string): string {
        return input
            .replace(/one/gi, '1')
            .replace(/two/gi, '2')
            .replace(/three/gi, '3')
            .replace(/four/gi, '4')
            .replace(/five/gi, '5')
            .replace(/six/gi, '6')
            .replace(/seven/gi, '7')
            .replace(/eight/gi, '8')
            .replace(/nine/gi, '9')
            .replace(/[a-z]/gi, '');
    }

    async run1(input: string[]): Promise<number> {
        return input.reduce((acc, line) => {
            line = line.replaceAll(/[a-z]/gi, '');
            return acc + parseInt(line[0] + line.slice(-1));
        }, 0);
    }

    async run2(input: string[]): Promise<number> {
        return input.reduce((acc, line) => {
            line = this.replaceNames(line);
            return acc + parseInt(line[0] + line.slice(-1));
        }, 0);
    }
}