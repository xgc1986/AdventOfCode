"use strict";

// https://adventofcode.com/2023/day/4
// Input file [[inputs/2023/day4.input.txt]]

import Puzzle from "src/Puzzle";

interface Card {
    numbers: number[];
    winners: number[];
}

type Input = Card[];

export default class Day4 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const lines = input.split('\n').filter((line) => line !== '');
        const cards: Card[] = [];

        for (const line of lines) {
            const numbers = line.split(':')[1].split('|');
            const card: Card = {
                numbers: numbers[0].match(/\d+/gi)?.map(Number) ?? [],
                winners: numbers[1].match(/\d+/gi)?.map(Number) ?? [],
            };

            cards.push(card);
        }

        return cards;
    }

    async run1(input: Input): Promise<number> {
        let total = 0;
        for (let i = 0; i < input.length; i++) {
            const winners = [];
            let winnerCount = 0;
            for (const winner of input[i].winners) {
                winners[winner] = true;
            }

            for (const number of input[i].numbers) {
                if (winners[number]) {
                    winnerCount++;
                }
            }

            if (winnerCount > 0) {
                total += Math.pow(2, winnerCount - 1)
            }
        }

        return total;
    }

    async run2(input: Input): Promise<number> {
        const scratchCards = [];

        for (const _ of input) {
            scratchCards.push(1);
        }

        for (const l in input) {
            const card = input[l];
            let current = +l;

            const winners = [];
            for (const winner of card.winners) {
                winners[winner] = true;
            }

            for (const value of card.numbers) {
                if (winners[value]) {
                    current++;
                    scratchCards[current] = scratchCards[current] + scratchCards[l];
                }
            }
        }

        return scratchCards.reduce((acc, val) => acc + val, 0);
    }
}