#!/usr/bin/env ts-node

"use strict";

import * as fs from "node:fs";
import * as https from "node:https";
import { request } from "node:https";
import Puzzle from "src/Puzzle.ts";
import {Debug} from "src/Utils.ts";

(async function (): Promise<void> {
    const INFO = '\x1b[1m\x1b[92m';
    const INFO2 = '\x1b[1m\x1b[93m';
    const INFO3 = '\x1b[1m\x1b[94m';
    const GREEN = '\x1b[32m';
    const RESET = '\x1b[0m';

    const hideResult = false;

    function usage(): void {
        console.error("./advent2.mjs {YEAR} {DAY} [type=input]");
        process.exit(0);
    }

    async function execute(puzzle: Puzzle<unknown>, input: unknown, part: string, mode: string): Promise<void> {
        let result: undefined | string | number;
        await puzzle.onStart();
        const start = performance.now();

        if (part === 'a') {
            result = await puzzle.run1(input);
        } else {
            result = await puzzle.run2(input);
        }
        if (result !== undefined) {
            let time = (performance.now() - start);
            await puzzle.onEnd();
            if (hideResult) {
                result = '********';
            }
            let units = 'ms';

            if (time < 1) {
                time *= 1000;
                units = 'µs'
            } else if (time >= 1000) {
                time /= 1000;
                units = 's'
                if (time >= 60) {
                    time /= 60;
                    units = 'm';
                }
            }

            let thePart = part === 'a' ? '*' : '**';
            let line0 = ` ${INFO2}${thePart} ${INFO3}${year} Day ${day} ${INFO2}${thePart}${RESET}`;
            if (mode === 'sample') {
                line0 = ` Sample ${INFO2}${thePart} ${INFO3}${year} Day ${day} ${INFO2}${thePart}${RESET}`;
            }
            let line1 = ` Execution Time -> ${INFO}${time.toFixed(3)}${units}${RESET} `;
            let line3 = `         Result -> ${INFO}${result}${RESET} `;
            const extra = `${INFO}${RESET}`;

            const maxLength = Math.max(line1.length, line3.length);
            line0 = line0.padEnd(Math.max(maxLength + 18), ' ');
            line1 = line1.padEnd(Math.max(maxLength), ' ');
            line3 = line3.padEnd(Math.max(maxLength), ' ');

            console.log('');
            console.log(`   ${GREEN}╔═` + ''.padEnd(maxLength - extra.length, '═') + `═╗${RESET}`);
            console.log(`   ${GREEN}║${RESET} ` + line0 + ` ${GREEN}║${RESET}`);
            console.log(`   ${GREEN}║ ` + ''.padEnd(line1.length - extra.length, ' ') + ` ║${RESET}`);
            console.log(`   ${GREEN}║${RESET} ` + line1 + ` ${GREEN}║${RESET}`);
            console.log(`   ${GREEN}║${RESET} ` + line3 + ` ${GREEN}║${RESET}`);
            console.log(`   ${GREEN}╚═` + ''.padEnd(maxLength - extra.length, '═') + `═╝${RESET}`);
        } else {
            await puzzle.onEnd();
        }
    }

    const year = process.argv[2];
    const day = process.argv[3];
    const mode = process.argv[4] || 'input';

    if (
        year === undefined ||
        day === undefined
    ) {
        usage();
    }

    try {
        if (!fs.existsSync(`inputs`)) {
            fs.mkdirSync(`inputs`);
        }
        if (!fs.existsSync(`inputs/${year}`)) {
            fs.mkdirSync(`inputs/${year}`);
        }
        if (!fs.existsSync(`outputs`)) {
            fs.mkdirSync(`outputs`);
        }
        if (!fs.existsSync(`outputs/${year}`)) {
            fs.mkdirSync(`outputs/${year}`);
        }
        if (!fs.existsSync(`src/${year}`)) {
            fs.mkdirSync(`src/${year}`);
        }
        if (!fs.existsSync(`inputs/${year}/day${day}.input.txt`)) {
            fs.openSync(`inputs/${year}/day${day}.input.txt`, 'w');
        }

        if (!fs.existsSync(`inputs/${year}/day${day}.test.txt`)) {
            fs.openSync(`inputs/${year}/day${day}.test.txt`, 'w');
        }

        if (!fs.existsSync(`inputs/${year}/day${day}.${mode}.txt`)) {
            fs.openSync(`inputs/${year}/day${day}.${mode}.txt`, 'w');
        }

        if (!fs.existsSync(`src/${year}/Day${day}.ts`)) {
            let sample = fs.readFileSync(`src/DaySample.ts`).toString();
            sample = sample.replaceAll('Sample', day);
            sample = sample.replaceAll('year', year);
            fs.writeFileSync(`src/${year}/Day${day}.ts`, sample);
        }
        const fileContents = fs.readFileSync(`inputs/${year}/day${day}.${mode}.txt`, 'utf8');
        Debug.setFile(+year, +day, 'a');
        Debug.enable(mode !== 'input');

        const puzzle: Puzzle<unknown> = new (await import(`src/${year}/Day${day}.ts`)).default(mode);
        const input1 = puzzle.parseInput(fileContents);
        const input2 = puzzle.SINGLE_INPUT_PARSE ? input1 : puzzle.parseInput(fileContents);

        Debug.enable(mode !== 'input');
        Debug.executing(true);
        await execute(puzzle, input1, 'a', mode);
        Debug.executing(false);
        Debug.clear();
        Debug.enable(mode !== 'input');
        Debug.setFile(+year, +day, 'b');
        Debug.executing(true);
        await execute(puzzle, input2, 'b', mode);
        Debug.executing(false);
        Debug.clear();
        console.log();

    } catch (e) {
        console.error("Error reading file or running the code.");
        console.log(e);
        process.exit(1);
    }
})();
