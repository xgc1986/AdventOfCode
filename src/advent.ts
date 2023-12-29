#!/usr/bin/env ts-node

"use strict";

import * as fs from "node:fs";
import * as https from "node:https";
import { request } from "node:https";
import Puzzle from "src/Puzzle.ts";
import {Debug, UMap} from "src/Utils.ts";

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

    function createTable(content: UMap<number[][]>, part: number): string[] {
        let tableApp = '| **Day** |';
        let tableWeb = '| **Day** |';
        let sep = '|---------|';

        for (const y in content) {
            tableApp += ` **${y}** |`;
            tableWeb += ` **${y}** |`;
            sep += `----------|`;
        }

        tableApp += '\n' + sep + '\n';
        tableWeb += '\n' + sep + '\n';

        let complete: UMap<number> = {};
        for (let i = 0; i < 25; i++) {
            let lineWeb = `| **Day ${i + 1}** |`;
            let lineApp = `| **Day ${i + 1}** |`;
            for (const year in content) {
                complete[year] ??= 50;
                const time = content[year][i][part] ?? -1;
                const ms = (time / 1000).toFixed(3);
                if (time === -100) {
                    if (complete[year] === 50) {
                        lineApp += ` ⭐️ |`;
                        lineWeb += ` $\\color{#FFFF66}{\\texttt{* × 50}}$ |`;
                    } if (complete[year] > 0) {
                        lineApp += `         |`;
                        lineWeb += ` $\\color{#9999CC}{\\texttt{* × 50}}$ |`;
                    } else {
                        lineApp += `         |`;
                        lineWeb += `         |`;
                    }
                } else if (time === -1) {
                    lineApp += `         |`;
                    lineWeb += `         |`;
                    complete[year]--;
                } else if (time === -10) {
                    lineApp += ` _❌ ∞_ |`;
                    lineWeb += ` $\\color{darkred}{\\texttt{∞}}$ |`;
                } else if (time > 0 && time <= 1_000) {
                    lineApp += ` ✅✅ _${ms}_ |`;
                    lineWeb += ` $\\color{lightgreen}{\\texttt{${ms}}}$ |`;
                } else if (time > 0 && time <= 10_000) {
                    lineApp += ` ✅ _${ms}_ |`;
                    lineWeb += ` $\\color{orange}{\\texttt{${ms}}}$ |`;
                } else if (time > 0 && time <= 100_000) {
                    lineApp += ` ⚠️ _${ms}_ |`;
                    lineWeb += ` $\\color{darkorange}{\\texttt{${ms}}}$ |`;
                } else if (time > 0 && time <= 1_000_000) {
                    lineApp += ` ⚠️⚠️ _${ms}_ |`;
                    lineWeb += ` $\\color{red}{\\texttt{${ms}}}$ |`;
                } else if (time > 0 && time <= 60_000_000) {
                    const t =  Math.floor(time/1000000);
                    lineApp += ` ❌ _~${t}s_ |`;
                    lineWeb += ` $\\color{darkred}{\\texttt{>${t}s}}$ |`;
                } else if (time > 0) {
                    const t =  Math.floor(time/60000000);
                    lineApp += ` ❌ _~${t}m_ |`;
                    lineWeb += ` $\\color{darkred}{\\texttt{>${t}m}}$ |`;
                }
            }
            tableApp += lineApp + '\n';
            tableWeb += lineWeb + '\n';
        }

        return [tableApp, tableWeb];
    }

    function registerTimes(year: number, day: number, time1: number, time2: number): void {
        const content: UMap<number[][]> = JSON.parse(fs.readFileSync(`doc/results.json`).toString());
        content[year][day - 1] = [Math.round(time1 * 1000) , Math.round(time2 * 1000)];
        fs.writeFileSync(`doc/results.json`, JSON.stringify(content));

        const tables1 = createTable(content, 0);
        const tables2 = createTable(content, 1);

        const template = fs.readFileSync(`doc/README.tpl.md`).toString();

        let app = template.replaceAll('%%PERFOMANCE_TABLE_1%%', tables1[0]);
        app = app.replaceAll('%%PERFOMANCE_TABLE_2%%', tables2[0]);
        app = app.replaceAll('%%LINK%%', 'Web version of [Readme](./README.web.md)');
        app = app.replaceAll('%%STARS1%%', '⭐️');
        app = app.replaceAll('%%STARS2%%', '⭐️⭐️');
        app = app.replaceAll(
            '%%LEGEND_TABLE%%',
            '✅✅ _Less than 1 milisecond_\n\n' +
            '✅ _More than 1 milisecond_\n\n' +
            '⚠️ _More than 10 milisecond_\n\n' +
            '⚠️⚠️ _More than 100 milisecond_\n\n' +
            '❌ _More than 1 second_\n\n'
        );
        fs.writeFileSync('README.app.md', app);

        let web = template.replaceAll('%%PERFOMANCE_TABLE_1%%', tables1[1]);
        web = web.replaceAll('%%PERFOMANCE_TABLE_2%%', tables2[1]);
        web = web.replaceAll('%%LINK%%', 'App version of [Readme](./README.app.md)');
        web = web.replaceAll('%%STARS1%%', '$\\color{yellow}{\\texttt{*}}$');
        web = web.replaceAll('%%STARS2%%', '$\\color{yellow}{\\texttt{**}}$');
        web = web.replaceAll(
            '%%LEGEND_TABLE%%',
            '$\\color{lightgreen}{\\textsf{Less than 1 milisecond}}$\n\n' +
            '$\\color{orange}{\\textsf{More than 1 milisecond}}$\n\n' +
            '$\\color{darkorange}{\\textsf{More than 10 milisecond}}$\n\n' +
            '$\\color{red}{\\textsf{More than 100 milisecond}}$\n\n' +
            '$\\color{darkred}{\\textsf{More than 1 second}}$\n\n'
        );
        fs.writeFileSync('README.md', web);
        fs.writeFileSync('README.web.md', web);
    }

    async function execute(puzzle: Puzzle<unknown>, input: unknown, part: string, mode: string): Promise<number> {
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
            const executionTime = time;
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
            await puzzle.onEnd();

            return executionTime;
        }

        return -1;
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
        const time1 = await execute(puzzle, input1, 'a', mode);
        Debug.executing(false);
        Debug.clear();
        Debug.enable(mode !== 'input');
        Debug.setFile(+year, +day, 'b');
        Debug.executing(true);
        const time2 = await execute(puzzle, input2, 'b', mode);
        Debug.executing(false);
        Debug.clear();
        console.log();

        if (mode === 'input') {
            registerTimes(+year, +day, time1, time2);
        }
    } catch (e) {
        console.error("Error reading file or running the code.");
        console.log(e);
        process.exit(1);
    }
})();
