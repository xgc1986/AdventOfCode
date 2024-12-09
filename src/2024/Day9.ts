"use strict";

// [[https://adventofcode.com/2024/day/9]]
// Input file [[inputs/2024/day9.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Input = number[];

export default class Day9 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('').map(Number);
    }

    async run1(input: Input): Promise<Solution> {
        let incIdx: number = 0;
        let decIdx: number = input.length - 1;
        let maxValue: number = Math.floor(input.length / 2);
        let minValue: number = 0;
        let isFilling: boolean = false;
        let position: number = 0;
        let total: number = 0;
        let carry: number = 0;
        let size: number = input[decIdx];

        while (incIdx < decIdx) {
            if (isFilling) {
                const emptySpace = input[incIdx - 1];
                size = input[decIdx];

                for (let i = 0, j = carry; i < emptySpace; i++) {
                    total += position * maxValue;
                    position++;
                    j++;

                    if (j == size) {
                        decIdx -= 2;
                        maxValue--;
                        size = input[decIdx];
                        j = 0;
                    }

                    if (decIdx < incIdx) {
                        size = 0;
                        break;
                    }

                    carry = j;
                }

                isFilling = false;
            } else {
                const sizeInc = input[incIdx];
                if (sizeInc == 0) {
                    position++;
                } else {
                    for (let i = 0; i < sizeInc; i++) {
                        total += position * minValue;
                        position++;
                    }
                }

                incIdx += 2;
                minValue++;
                isFilling = true;
            }
        }

        for (let i = carry; i < size; i++) {
            total += position * maxValue;
            position++;
        }

        return total;
    }

    async run2(input: Input): Promise<Solution> {
        let position = 0;
        let total = 0;
        let visited = new Array(input.length).fill(false);
        const inputSize = input.length;
        let counter = 0;

        for (let i = 0; i < inputSize; i++) {
            let size = input[i];
            if (i % 2 == 0) {
                if (visited[i]) {
                    counter++;
                    position += size;
                    continue;
                }

                total += this.gaussDiff(position, position + size - 1) * counter;
                position += size;
                counter++;

                continue;
            }

            while (true) {
                let j = inputSize - 1;
                let blockSize = -1;

                for (; j > i; j -= 2) {
                    if (visited[j]) {
                        continue;
                    }
                    const currentBlockSize = input[j];

                    if (currentBlockSize <= size) {
                        blockSize = currentBlockSize;

                        size -= blockSize;

                        visited[j] = true;

                        total += this.gaussDiff(position, position + blockSize - 1) * Math.floor((j / 2));
                        position += blockSize;
                        break;
                    }
                }

                if (blockSize == -1) {
                    position += size;
                    break;
                }
            }
        }

        return total;
    }

    gaussDiff(from: number, to: number) {
        return (to * (to + 1) - from * (from - 1)) / 2;
    }
}