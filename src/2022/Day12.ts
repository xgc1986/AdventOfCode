"use strict";

// [[https://adventofcode.com/2022/day/12]]
// Input file [[inputs/2022/day12.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | undefined;

type Input = string[];

export default class Day12 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n');
    }

    async run1(lines: Input): Promise<Solution> {
        let queue: { x: number, y: number, steps: number, char: string }[] = [];
        const steps: Set<string> = new Set();

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].indexOf('S') >= 0) {
                queue.push({
                    y: i,
                    x: lines[i].indexOf('S'),
                    steps: 0,
                    char: ''
                });
            }
        }

        steps.add(`${queue[0].x},${queue[0].y}`);
        while (queue.length > 0) {
            const item = queue[0];
            queue = queue.slice(1);
            const char = lines[item.y][item.x];
            const nextChar = String.fromCharCode(char.charCodeAt(0) + 1);
            if (char === 'E') {
                return item.steps;
            }

            let expectations = [];
            for (let i = 0; i <= (nextChar.charCodeAt(0) - 'a'.charCodeAt(0)); i++) {
                expectations.push(String.fromCharCode('a'.charCodeAt(0) + i));
            }

            if (char === 'S') {
                expectations = ['a'];
            }
            if (char === 'z') {
                expectations = ['z', 'E'];
            }

            const x = item.x;
            const y = item.y;

            // LEFT
            if (x > 0 && expectations.includes(lines[y][x - 1]) && !steps.has(`${x - 1},${y}`)) {
                queue.push({
                    x: x - 1,
                    y: y,
                    steps: item.steps + 1,
                    char: lines[y][x - 1]
                });
                steps.add(`${x - 1},${y}`);
            }

            // UP
            if (y > 0 && expectations.includes(lines[y - 1][x]) && !steps.has(`${x},${y - 1}`)) {
                queue.push({
                    x: x,
                    y: y - 1,
                    steps: item.steps + 1,
                    char: lines[y - 1][x]
                });
                steps.add(`${x},${y - 1}`);
            }

            // DOWN
            if (y < (lines.length - 1) && expectations.includes(lines[y + 1][x]) && !steps.has(`${x},${y + 1}`)) {
                queue.push({
                    x: x,
                    y: y + 1,
                    steps: item.steps + 1,
                    char: lines[y + 1][x]
                });
                steps.add(`${x},${y + 1}`);
            }

            // RIGHT
            if (x < (lines[y].length - 1) && expectations.includes(lines[y][x + 1]) && !steps.has(`${x + 1},${y}`)) {
                queue.push({
                    x: x + 1,
                    y: y,
                    steps: item.steps + 1,
                    char: lines[y][x + 1]
                });
                steps.add(`${x + 1},${y}`);
            }
        }

        return Infinity;
    }

    async run2(lines: Input): Promise<Solution> {
        let queue: { x: number, y: number, steps: number, char: string }[] = [];
        const steps: Set<string> = new Set();

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].indexOf('E') >= 0) {
                queue.push({
                    y: i,
                    x: lines[i].indexOf('E'),
                    steps: 0,
                    char: ''
                });
            }
        }

        steps.add(`${queue[0].x},${queue[0].y}`);
        while (queue.length > 0) {
            const item = queue[0];
            queue = queue.slice(1);
            const char = lines[item.y][item.x];
            const prevChar = String.fromCharCode(char.charCodeAt(0) - 1);
            if (char === 'S' || char === 'a') {
                return item.steps;
            }

            let expectations = [];
            for (let i = prevChar.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
                expectations.push(String.fromCharCode(i));
            }

            if (char === 'E') {
                expectations = ['z'];
            }
            if (char === 'b') {
                expectations = ['a', 'S'];
            }

            const x = item.x;
            const y = item.y;

            // LEFT
            if (x > 0 && expectations.includes(lines[y][x - 1]) && !steps.has(`${x - 1},${y}`)) {
                queue.push({
                    x: x - 1,
                    y: y,
                    steps: item.steps + 1,
                    char: lines[y][x - 1]
                });
                steps.add(`${x - 1},${y}`);
            }

            // UP
            if (y > 0 && expectations.includes(lines[y - 1][x]) && !steps.has(`${x},${y - 1}`)) {
                queue.push({
                    x: x,
                    y: y - 1,
                    steps: item.steps + 1,
                    char: lines[y - 1][x]
                });
                steps.add(`${x},${y - 1}`);
            }

            // DOWN
            if (y < (lines.length - 1) && expectations.includes(lines[y + 1][x]) && !steps.has(`${x},${y + 1}`)) {
                queue.push({
                    x: x,
                    y: y + 1,
                    steps: item.steps + 1,
                    char: lines[y + 1][x]
                });
                steps.add(`${x},${y + 1}`);
            }

            // RIGHT
            if (x < (lines[y].length - 1) && expectations.includes(lines[y][x + 1]) && !steps.has(`${x + 1},${y}`)) {
                queue.push({
                    x: x + 1,
                    y: y,
                    steps: item.steps + 1,
                    char: lines[y][x + 1]
                });
                steps.add(`${x + 1},${y}`);
            }
        }

        return Infinity;
    }
}