"use strict";

// [[https://adventofcode.com/2016/day/13]]
// Input file [[inputs/2016/day13.input.txt]]

import Puzzle from "src/Puzzle";
import Queue from "src/Utils/Queue.ts";
import * as console from "console";

type Solution = number | undefined;

type Input = number;

export default class Day13 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return +input;
    }

    isOpen(row: number, col: number, fav: number): boolean {
        return ((col * col + 3 * col + 2 * col * row + row + row * row) + fav).toString(2).replaceAll('0', '').length % 2 === 0;
    }

    async run1(fav: Input): Promise<Solution> {
        const target = {row: 39, col: 31};
        const queue = new Queue<{row: number, col: number, steps: number}>();
        const map = new Map<string, boolean>();
        map.set(`1,1`, false)
        queue.push({row: 1, col: 1, steps: 0});

        while (queue.length > 0) {
            const cell = queue.pop()!;

            if (cell.row === target.row && cell.col === target.col) {
                return cell.steps;
            }

            if (cell.row > 0) {
                const hash = `${cell.row - 1},${cell.col}`;
                if (!map.has(hash)) {
                    map.set(hash, this.isOpen(cell.row - 1, cell.col, fav));
                }
                if (map.get(hash)) {
                    queue.push({row: cell.row - 1, col: cell.col, steps: cell.steps + 1});
                    map.set(hash, false);
                }
            }

            if (cell.col > 0) {
                const hash = `${cell.row},${cell.col - 1}`;
                if (!map.has(hash)) {
                    map.set(hash, this.isOpen(cell.row, cell.col - 1, fav));
                }
                if (map.get(hash)) {
                    queue.push({row: cell.row, col: cell.col - 1, steps: cell.steps + 1});
                    map.set(hash, false);
                }
            }

            const hashDown = `${cell.row + 1},${cell.col}`;
            if (!map.has(hashDown)) {
                map.set(hashDown, this.isOpen(cell.row + 1, cell.col, fav));
            }
            if (map.get(hashDown)) {
                queue.push({row: cell.row + 1, col: cell.col, steps: cell.steps + 1});
                map.set(hashDown, false);
            }

            const hashRight = `${cell.row},${cell.col + 1}`;
            if (!map.has(hashRight)) {
                map.set(hashRight, this.isOpen(cell.row, cell.col + 1, fav));
            }
            if (map.get(hashRight)) {
                queue.push({row: cell.row, col: cell.col + 1, steps: cell.steps + 1});
                map.set(hashRight, false);
            }
        }

        return -1;
    }

    async run2(fav: Input): Promise<Solution> {
        let count = 0;
        const queue = new Queue<{row: number, col: number, steps: number}>();
        const map = new Map<string, boolean>();
        map.set(`1,1`, false)
        queue.push({row: 1, col: 1, steps: 0});

        while (queue.length > 0) {
            const cell = queue.pop()!;

            if (cell.steps > 50) {
                continue;
            }

            count++;

            if (cell.row > 0) {
                const hash = `${cell.row - 1},${cell.col}`;
                if (!map.has(hash)) {
                    map.set(hash, this.isOpen(cell.row - 1, cell.col, fav));
                }
                if (map.get(hash)) {
                    queue.push({row: cell.row - 1, col: cell.col, steps: cell.steps + 1});
                    map.set(hash, false);
                }
            }

            if (cell.col > 0) {
                const hash = `${cell.row},${cell.col - 1}`;
                if (!map.has(hash)) {
                    map.set(hash, this.isOpen(cell.row, cell.col - 1, fav));
                }
                if (map.get(hash)) {
                    queue.push({row: cell.row, col: cell.col - 1, steps: cell.steps + 1});
                    map.set(hash, false);
                }
            }

            const hashDown = `${cell.row + 1},${cell.col}`;
            if (!map.has(hashDown)) {
                map.set(hashDown, this.isOpen(cell.row + 1, cell.col, fav));
            }
            if (map.get(hashDown)) {
                queue.push({row: cell.row + 1, col: cell.col, steps: cell.steps + 1});
                map.set(hashDown, false);
            }

            const hashRight = `${cell.row},${cell.col + 1}`;
            if (!map.has(hashRight)) {
                map.set(hashRight, this.isOpen(cell.row, cell.col + 1, fav));
            }
            if (map.get(hashRight)) {
                queue.push({row: cell.row, col: cell.col + 1, steps: cell.steps + 1});
                map.set(hashRight, false);
            }
        }

        return count;
    }
}