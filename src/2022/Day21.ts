"use strict";

// [[https://adventofcode.com/2022/day/21]]
// Input file [[inputs/2022/day21.input.txt]]

import Puzzle from "src/Puzzle";
import {StringMap, UObject} from "src/Utils.ts";

type Solution = number | undefined;

type Operation = '+' | '-' | '*' | '/' | '=';

interface Monkey {
    name: string;
    number: number | undefined;
    yells: string[];
    operation: Operation;
}

type Input = StringMap<Monkey>;

export default class Day21 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const monkeys: Input = {};
        input.split('\n').map(line => {
            const parts = line.split(' ');
            const monkey = parts[0].slice(0, -1);
            if (parts.length === 2) {
                monkeys[monkey] = {
                    name: monkey,
                    number: +parts[1],
                    yells: [],
                    operation: '+'
                };
            } else {
                monkeys[monkey] = {
                    name: monkey,
                    number: undefined,
                    yells: [parts[1], parts[3]],
                    operation: parts[2] as Operation
                };
            }
        });

        return monkeys;
    }

    async run1(monkeys: Input): Promise<Solution> {
        monkeys = UObject.clone(monkeys);
        const res = this.getYell(monkeys.root, monkeys, false) ?? 0;
        return res;
    }

    async run2(monkeys: Input): Promise<Solution> {
        monkeys.humn.number = undefined;
        monkeys.root.operation = '=';

        this.reverseYell(monkeys.root, monkeys);

        return monkeys.humn.number ?? 0;
    }

    private getYell(monkey: Monkey, monkeys: StringMap<Monkey>, p2: boolean): number {
        if (monkey.name === 'humn' && p2) {
            throw new Error('Human');
        }

        if (monkey.number === undefined) {
            const yell1 = this.getYell(monkeys[monkey.yells[0]], monkeys, p2);
            const yell2 = this.getYell(monkeys[monkey.yells[1]], monkeys, p2);
            switch (monkey.operation) {
                case '+':
                    monkey.number = yell1 + yell2;
                    break;
                case '-':
                    monkey.number = yell1 - yell2;
                    break;
                case '*':
                    monkey.number = yell1 * yell2;
                    break;
                case '/':
                    monkey.number = yell1 / yell2;
                    break;
                case '=':
                    monkey.number = 0;
            }
        }

        return monkey.number;
    }

    private reverseYell(monkey: Monkey, monkeys: StringMap<Monkey>): void {
        if (monkey.name === 'humn') {
            return;
        }

        let monkeyA = monkeys[monkey.yells[0]];
        let monkeyB = monkeys[monkey.yells[1]];

        if (monkeyA.number === undefined && monkeyB.number === undefined) {
            try {
                this.getYell(monkeyA, monkeys, true);
            } catch (e) {
                this.getYell(monkeyB, monkeys, true);
            }

            monkeyA = monkeys[monkeyA.name];
            monkeyB = monkeys[monkeyB.name];
        }

        if (monkeyA.number === undefined) {
            switch (monkey.operation) {
                case '+':
                    monkeyA.number = (monkey.number ?? 0) - (monkeyB.number ?? 0);
                    break;
                case '-':
                    monkeyA.number = (monkey.number ?? 0) + (monkeyB.number ?? 0);
                    break;
                case '*':
                    monkeyA.number = (monkey.number ?? 0) / (monkeyB.number ?? 0);
                    break;
                case '/':
                    monkeyA.number = (monkey.number ?? 0) * (monkeyB.number ?? 0);
                    break;
                case '=':
                    monkeyA.number = monkeyB.number;
            }

            this.reverseYell(monkeyA, monkeys);

            return;
        }

        switch (monkey.operation) {
            case '+':
                monkeyB.number = (monkey.number ?? 0) - (monkeyA.number ?? 0);
                break;
            case '-':
                monkeyB.number = (monkeyA.number ?? 0) - (monkey.number ?? 0);
                break;
            case '*':
                monkeyB.number = (monkey.number ?? 0) / (monkeyA.number ?? 0);
                break;
            case '/':
                monkeyB.number = (monkeyA.number ?? 0) * (monkey.number ?? 0);
                break;
            case '=':
                monkeyB.number = monkeyA.number;
        }

        this.reverseYell(monkeyB, monkeys);
    }
}
