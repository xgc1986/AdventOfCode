"use strict";

// [[https://adventofcode.com/2024/day/5]]
// Input file [[inputs/2024/day5.input.txt]]

import Puzzle from "src/Puzzle";
import * as console from "node:console";

type Solution = number | undefined;

type Input = {
    rules: Map<number, number[]>,
    books: number[][],
};

export default class Day5 extends Puzzle<Input> {

    parseInput(input: string): Input {
        let part1 = true;
        let result = {
            rules: new Map<number, number[]>(),
            books: [],
        }
        input.split('\n').map(line => {
            if (line === '') {
                part1 = false;
                return;
            }

            if (part1) {
                const parts = line.split('|').map(Number);
                let bookRule = result.rules.get(parts[0]) ?? [];
                bookRule.push(parts[1]);
                result.rules.set(parts[0], bookRule);

                return;
            }

            result.books.push(line.split(',').map(Number));
        });

        return result;
    }

    async run1(input: Input): Promise<Solution> {
        let total = 0;
        for (const book of input.books) {
            if (this.isValidBook(book, input.rules)) {
                total += book[(book.length - 1) / 2];
            }
        }

        return total;
    }

    async run2(input: Input): Promise<Solution> {
        let total = 0;
        let invalidBooks = [];
        for (const book of input.books) {
            if (!this.isValidBook(book, input.rules)) {
                invalidBooks.push(book);
            }
        }

        for (const book of invalidBooks) {
            while (!this.isValidBook(book, input.rules)) {
                for (let i = 0; i < book.length - 1; i++) {
                    const page = book[i];
                    const next = book[i + 1];

                    const rulesList = input.rules.get(next);

                    if (rulesList !== undefined && rulesList.includes(page)) {
                        book[i] = next;
                        book[i + 1] = page;
                        break;
                    }
                }
            }

            total += book[(book.length - 1) / 2];
        }

        return total;
    }

    private isValidBook(book: number[], rules: Map<number, number[]>): boolean {
        for (let i = 0; i < book.length - 1; i++) {
            const page = book[i];
            const next = book[i + 1];

            const rulesList = rules.get(next);

            if (rulesList !== undefined && rulesList.includes(page)) {
                return false;
            }
        }

        return true;
    }
}