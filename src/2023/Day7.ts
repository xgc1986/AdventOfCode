"use strict";

// [[https://adventofcode.com/2023/day/7]]
// Input file [[inputs/2023/day7.input.txt]]

import Puzzle from "src/Puzzle.ts";
import {UMap} from "src/Utils.ts";

interface Hand {
    cards: string[];
    score: number;
    rank: number;
}

type Input = Hand[];

export default class Day7 extends Puzzle<Input> {

    private withJokers: boolean = false;

    parseInput(input: string): Input {
        return input.split('\n').filter((line) => line !== '').map((line) => {
            return {
                cards: line.split(' ')[0].split(''),
                score: +line.split(' ')[1],
                rank: 1
            }
        });
    }

    sameCards(a: string, b: string) {
        if (this.withJokers && (a === 'J' || b === 'J')) {
            return true;
        }

        return a === b;
    }

    info(hand: Hand, cardValues: string[]): void {
        let thok = false;
        let pair = 0;
        let rank = 1;

        if (this.withJokers && hand.cards.join('') === 'JJJJJ') {
            hand.rank = 7;
            return;
        }

        const cardReplaced: UMap<boolean> = {};

        for (let j = 0; j < hand.cards.length; j++) {
            pair = 0;
            thok = false;

            if (this.withJokers && hand.cards[j] === 'J') {
                continue;
            }

            if (cardReplaced[hand.cards[j]]) {
                continue;
            }
            cardReplaced[hand.cards[j]] = true;

            const cards = this.withJokers
                ? hand.cards.join('').replaceAll('J', hand.cards[j]).split('')
                : [...hand.cards];

            cards.sort((a, b) => cardValues.indexOf(a) - cardValues.indexOf(b));

            for (let i = 0; i < cards.length;) {
                if (this.sameCards(cards[i], cards[i + 1]) && this.sameCards(cards[i], cards[i + 2]) && this.sameCards(cards[i], cards[i + 3]) && this.sameCards(cards[i], cards[i + 4])) {
                    rank = Math.max(7, rank);
                    break;
                }

                if (this.sameCards(cards[i], cards[i + 1]) && this.sameCards(cards[i], cards[i + 2]) && this.sameCards(cards[i], cards[i + 3])) {
                    rank = Math.max(6, rank);
                    break;
                }

                if (this.sameCards(cards[i], cards[i + 1]) && this.sameCards(cards[i], cards[i + 2])) {
                    if (pair === 1) {
                        rank = Math.max(5, rank);
                        break;
                    } else {
                        thok = true;
                        rank = Math.max(4, rank);
                        i += 3;
                    }
                    continue;
                }

                if (this.sameCards(cards[i], cards[i + 1])) {
                    if (thok) {
                        rank = Math.max(5, rank);
                        i += 2;
                        break;
                    } else {
                        pair++;
                        i += 2;
                        rank = Math.max(pair + 1, rank);
                        continue;
                    }
                }

                i++;
            }

            if (!this.withJokers) {
                break;
            }
        }

        hand.rank = rank;
    }

    async run1(hands: Input): Promise<number> {
        const cardsSorted = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

        for (const hand of hands) {
            this.info(hand, cardsSorted);
        }
        hands.sort((a, b) => {
            if (a.rank === b.rank) {
                for (let i = 0; i < a.cards.length; i++) {
                    if (a.cards[i] === b.cards[i]) {
                        continue;
                    }

                    return cardsSorted.indexOf(a.cards[i]) - cardsSorted.indexOf(b.cards[i]);
                }
            }

            return a.rank - b.rank;
        });

        let total = 0;
        for (let i = 0; i < hands.length; i++) {
            total += (i + 1) * hands[i].score;
        }

        return total;
    }

    async run2(hands: Input): Promise<number> {
        this.withJokers = true
        const cardsSorted = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];

        for (const hand of hands) {
            this.info(hand, cardsSorted);
        }
        hands.sort((a, b) => {
            if (a.rank === b.rank) {
                for (let i = 0; i < a.cards.length; i++) {
                    if (a.cards[i] === b.cards[i]) {
                        continue;
                    }

                    return cardsSorted.indexOf(a.cards[i]) - cardsSorted.indexOf(b.cards[i]);
                }
            }

            return a.rank - b.rank;
        });

        let total = 0;
        for (let i = 0; i < hands.length; i++) {
            total += (i + 1) * hands[i].score;
        }

        return total;
    }
}