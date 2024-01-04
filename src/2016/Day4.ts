"use strict";

// [[https://adventofcode.com/2016/day/4]]
// Input file [[inputs/2016/day4.input.txt]]

import Puzzle from "src/Puzzle";
import {StringMap} from "src/Utils.ts";

type Solution = number | undefined;

interface Checksum {
    hashes: string[];
    value: number;
    hash: string;
}

type Input = Checksum[];

export default class Day4 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const checksums: Checksum[] = [];
        for (const line of input.split('\n')) {
            const checksum: Checksum = {
                hashes: [],
                value: 0,
                hash: ''
            };

            const parts = line.split('-');
            for (let p = 0; p < parts.length - 1; p++) {
                checksum.hashes.push(parts[p]);
            }

            const [_, value, hash] = parts.end()!.match(/(\d+)\[(\w+)]/)!;
            checksums.push(checksum);
            checksum.value = +value;
            checksum.hash = hash;
        }
        return checksums;
    }

    private getSectorId(checksum: Checksum): number {
        let lastAmount = 10000;
        let lastLetter = '';
        const commonLetters: StringMap<{ char: string, amount: number }> = {};
        for (const letter of checksum.hashes.join('').split('')) {
            commonLetters[letter] ??= {char: letter, amount: 0};
            commonLetters[letter].amount++;
        }

        const letters = Object.values(commonLetters).map(c => c.amount).sort((a, b) => b - a).unique();
        const minAmount = letters[4] ?? 1;
        const topLetters = Object.values(commonLetters).filter(c => c.amount >= minAmount).map(c => c.char);
        let isValid = true;

        const groups: StringMap<string[]> = {};
        for (const letter of checksum.hash) {
            if (commonLetters[letter] === undefined || !topLetters.includes(letter) || commonLetters[letter].amount > lastAmount) {
                isValid = false;
                continue;
            }

            groups[commonLetters[letter].amount] ??= [];
            groups[commonLetters[letter].amount].push(letter);
        }


        if (isValid) {
            for (const letter of checksum.hash) {
                if (commonLetters[letter] === undefined || !topLetters.includes(letter) || commonLetters[letter].amount > lastAmount) {
                    isValid = false;
                    break;
                }

                if (commonLetters[letter].amount === lastAmount) {
                    if (letter.charCodeAt(0) < lastLetter.charCodeAt(0)) {
                        isValid = false;
                        break;
                    }
                }
                lastAmount = commonLetters[letter].amount;
                lastLetter = letter;
            }
        }

        if (isValid) {
            return checksum.value;
        }

        return 0;
    }

    async run1(checksums: Input): Promise<Solution> {
        let sum = 0;
        for (const checksum of checksums) {
            sum += this.getSectorId(checksum);
        }

        return sum;
    }

    async run2(checksums: Input): Promise<Solution> {
        for (const checksum of checksums) {
            const sid = this.getSectorId(checksum);
            if (sid === 0) {
                continue;
            }
            for (const hash of checksum.hashes) {
                let decrypted = '';
                for (const letter of hash) {
                    if (letter === '-') {
                        decrypted += ' ';
                    } else {
                        decrypted += String.fromCharCode((letter.charCodeAt(0) - 97 + sid) % 26 + 97);
                    }
                }

                if (decrypted.includes('north')) {
                    return sid;
                }
            }
        }

        return undefined;
    }
}
