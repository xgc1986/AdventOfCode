"use strict";

// [[https://adventofcode.com/2022/day/11]]
// Input file [[inputs/2022/day11.input.txt]]

import Puzzle from "src/Puzzle";
import {UObject} from "src/Utils";

type Solution = number | undefined;

interface Monkey {
    name: string,
    items: number[],
    operation: string,
    operationValue: number,
    divisible: number,
    yes: number,
    no: number,
    inpections: number
}

type Input = Monkey[];

export default class Day11 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const lines = input.split('\n').filter((line) => line !== '');
        const monkeys = [];

        for (let i = 0; i < lines.length; i += 6) {
            monkeys[i / 6] = {
                name: `Monkey ${i / 6}`,
                items: lines[i + 1].match(/\d+/gi)?.map((v) => parseInt(v)) ?? [],
                operation: lines[i + 2].indexOf('old * old') === -1 ? lines[i + 2].trim().split(' ')[4] : '**',
                operationValue: +(lines[i + 2].indexOf('old * old') === -1 ? parseInt(lines[i + 2].trim().split(' ')[5]) : '2'),
                divisible: parseInt(lines[i + 3].trim().split(' ')[3]),
                yes: parseInt(lines[i + 4].trim().split(' ')[5]),
                no: parseInt(lines[i + 5].trim().split(' ')[5]),
                inpections: 0
            }
        }

        return monkeys;
    }

    async run1(monkeys: Input): Promise<Solution> {
        monkeys = UObject.clone(monkeys);
        for (let i = 0; i < 20; i++) {
            for (const monkey of monkeys) {
                monkey.inpections += monkey.items.length;
                for (const item of monkey.items) {
                    let value = item;

                    if (monkey.operation === '**') {
                        value = value ** monkey.operationValue;
                    } else if (monkey.operation === '*') {
                        value = value * monkey.operationValue;
                    } else {
                        value = value + monkey.operationValue;
                    }

                    value = Math.floor(value / 3);

                    if (value % monkey.divisible === 0) {
                        monkeys[monkey.yes].items.push(value);
                    } else {
                        monkeys[monkey.no].items.push(value);
                    }
                }
                monkey.items = [];
            }
        }
        const ranks = monkeys.sort((a, b) => b.inpections - a.inpections);

        return ranks[0].inpections * ranks[1].inpections;
    }

    async run2(monkeys: Input): Promise<Solution> {
        let bigMod = 1;

        for (const monkey of monkeys) {
            bigMod *= monkey.divisible;
        }

        for (let i = 0; i < 10000; i++) {
            for (const monkey of monkeys) {
                monkey.inpections += monkey.items.length;
                for (const item of monkey.items) {
                    let value = item;

                    if (monkey.operation === '**') {
                        value = value ** monkey.operationValue;
                    } else if (monkey.operation === '*') {
                        value = value * monkey.operationValue;
                    } else {
                        value = value + monkey.operationValue;
                    }

                    value = value % bigMod;

                    if (value % monkey.divisible === 0) {
                        monkeys[monkey.yes].items.push(value);
                    } else {
                        monkeys[monkey.no].items.push(value);
                    }
                }
                monkey.items = [];
            }
        }

        const ranks = monkeys.sort((a, b) => b.inpections - a.inpections);

        return ranks[0].inpections * ranks[1].inpections;
    }
}