#!/usr/bin/env ts-node

"use strict";

import * as fs from "node:fs";
import * as https from "node:https";
import { request } from "node:https";
import Puzzle from "src/Puzzle.ts";
import {Debug, UMap} from "src/Utils.ts";
import * as process from "process";
import * as path from "path";

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

    let config: {
        cookie: string,
    } = {
        cookie: ""
    };

    try {
        config = JSON.parse(fs.readFileSync(`config.json`).toString());
    } catch (e) {
        console.error("Missing config.json file or is not a json.");
    }

    async function downloadInput(year: string, day: string): Promise<string> {
        if (config.cookie === "") {
            console.error("Missing cookie in config.json");
            return '';
        }

        const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "en-US,en;q=0.9,es;q=0.8,ca;q=0.7",
                "cache-control": "max-age=0",
                "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "cookie": config.cookie,
                "Referer": `https://adventofcode.com/${year}/day/${day}`,
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        });

        return response.text();
    }

    function createTable(content: UMap<number[][]>, part: number): string[] {
        let tableApp = '| **Day** |';
        let tableWeb = '| **Day** |';
        let tableIDE = '| **Day** |';
        let sep = '|---------|';

        for (const y in content) {
            tableApp += ` **${y}** |`;
            tableWeb += ` **${y}** |`;
            tableIDE += ` **${y}** |`;
            sep += `---------:|`;
        }

        tableApp += '\n' + sep + '\n';
        tableWeb += '\n' + sep + '\n';
        tableIDE += '\n' + sep + '\n';

        let complete: UMap<number> = {};
        for (let i = 0; i < 25; i++) {
            const day = i + 1;
            let lineWeb = `| **Day ${day}** |`;
            let lineApp = `| **Day ${day}** |`;
            let lineIDE = `| **Day ${day}** |`;
            for (const year in content) {
                complete[year] ??= 50;
                const time = content[year][i][part] ?? -1;
                const time2 = content[year][i][part === 0 ? 1 : 0] ?? -1;

                if (time === -1) {
                    complete[year]--;
                }

                if (time2 === -1) {
                    complete[year]--;
                }

                const ms = (time / 1000).toFixed(3);
                if (day === 25 && part === 1) {
                    if (complete[year] >= 49) {
                        lineApp += ` ⭐️ |`;
                        lineWeb += ` $\\color{#FFFF66}{\\texttt{* × 50}}$ |`;
                        lineIDE += ` <span style="color:#FFFF66">* × 50</span> |`;
                    } else if (complete[year] > 0) {
                        lineApp += ` * × ${complete[year]}        |`;
                        lineWeb += ` $\\color{#9999CC}{\\texttt{* × ${complete[year]}}}$ |`;
                        lineIDE += ` <span style="color:#9999CC">* × ${complete[year]}</span> |`;
                    } else {
                        lineApp += `         |`;
                        lineWeb += `         |`;
                        lineIDE += `         |`;
                    }
                } else if (time === -1) {
                    lineApp += `         |`;
                    lineWeb += `         |`;
                    lineIDE += `         |`;
                } else if (time === -10) {
                    lineApp += ` _❌ INF_ |`;
                    lineWeb += ` $\\color{darkred}{\\texttt{INF}}$ |`;
                    lineIDE += ` <span style="color:darkred">INF</span> |`;
                } else if (time > 0 && time <= 1_000) {
                    lineApp += ` ✅✅ _${ms}_ |`;
                    lineWeb += ` $\\color{lightgreen}{\\texttt{${ms}}}$ |`;
                    lineIDE += ` <span style="color:lightgreen">${ms}</span> |`;
                } else if (time > 0 && time <= 10_000) {
                    lineApp += ` ✅ _${ms}_ |`;
                    lineWeb += ` $\\color{orange}{\\texttt{${ms}}}$ |`;
                    lineIDE += ` <span style="color:orange">${ms}</span> |`;
                } else if (time > 0 && time <= 100_000) {
                    lineApp += ` ⚠️ _${ms}_ |`;
                    lineWeb += ` $\\color{darkorange}{\\texttt{${ms}}}$ |`;
                    lineIDE += ` <span style="color:darkorange">${ms}</span> |`;
                } else if (time > 0 && time <= 1_000_000) {
                    lineApp += ` ⚠️⚠️ _${ms}_ |`;
                    lineWeb += ` $\\color{red}{\\texttt{${ms}}}$ |`;
                    lineIDE += ` <span style="color:red">${ms}</span> |`;
                } else if (time > 0 && time <= 60_000_000) {
                    const t =  Math.floor(time/1000000);
                    lineApp += ` ❌ _~${t}s_ |`;
                    lineWeb += ` $\\color{darkred}{\\texttt{>${t}s}}$ |`;
                    lineIDE += ` <span style="color:darkred">>${t}s</span> |`;
                } else if (time > 0) {
                    const t =  Math.floor(time/60000000);
                    lineApp += ` ❌ _~${t}m_ |`;
                    lineWeb += ` $\\color{darkred}{\\texttt{>${t}m}}$ |`;
                    lineIDE += ` <span style="color:darkred">>${t}m</span> |`;
                }
            }
            tableApp += lineApp + '\n';
            tableWeb += lineWeb + '\n';
            tableIDE += lineIDE + '\n';
        }

        return [tableApp, tableWeb, tableIDE];
    }

    function registerTimes(year: number, day: number, time1: number, time2: number): void {
        const content: UMap<number[][]> = JSON.parse(fs.readFileSync(`doc/results.json`).toString());

        content[year][day - 1][0] ??= -1;
        content[year][day - 1][1] ??= -1;
        if (time1 !== -1) {
            content[year][day - 1][0] = Math.round(time1 * 1000);
        }
        if (time2 !== -1) {
            content[year][day - 1][1] = Math.round(time2 * 1000);
        }

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
        web = web.replaceAll('%%STARS1%%', '$\\color{#FFFF66}{\\texttt{*}}$');
        web = web.replaceAll('%%STARS2%%', '$\\color{#FFFF66}{\\texttt{**}}$');
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

        let ide = template.replaceAll('%%PERFOMANCE_TABLE_1%%', tables1[2]);
        ide = ide.replaceAll('%%PERFOMANCE_TABLE_2%%', tables2[2]);
        ide = ide.replaceAll('%%LINK%%', '');
        ide = ide.replaceAll('%%STARS1%%', '<span style="color:#FFFF66">*</span>');
        ide = ide.replaceAll('%%STARS2%%', '<span style="color:#FFFF66">**</span>');
        ide = ide.replaceAll(
            '%%LEGEND_TABLE%%',
            '<span style="color:lightgreen">Less than 1 milisecond</span>\n\n' +
            '<span style="color:orange">More than 1 milisecond</span>\n\n' +
            '<span style="color:darkorange">More than 10 milisecond</span>\n\n' +
            '<span style="color:red">More than 100 milisecond</span>\n\n' +
            '<span style="color:darkred">More than 1 second</span>\n\n'
        );
        fs.writeFileSync('README.ide.md', ide);
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

            console.info('');
            console.info(`   ${GREEN}╔═` + ''.padEnd(maxLength - extra.length, '═') + `═╗${RESET}`);
            console.info(`   ${GREEN}║${RESET} ` + line0 + ` ${GREEN}║${RESET}`);
            console.info(`   ${GREEN}║ ` + ''.padEnd(line1.length - extra.length, ' ') + ` ║${RESET}`);
            console.info(`   ${GREEN}║${RESET} ` + line1 + ` ${GREEN}║${RESET}`);
            console.info(`   ${GREEN}║${RESET} ` + line3 + ` ${GREEN}║${RESET}`);
            console.info(`   ${GREEN}╚═` + ''.padEnd(maxLength - extra.length, '═') + `═╝${RESET}`);
            await puzzle.onEnd();

            return executionTime;
        }

        await puzzle.onEnd();

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
            const input = await downloadInput(year, day);
            console.info(`Downloaded input for ${GREEN}${year}${RESET} day ${GREEN}${day}${RESET}`);
            fs.writeFileSync(`inputs/${year}/day${day}.input.txt`, input);
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
        console.info(`Runnable: file://${process.cwd()}/src/${year}/Day${day}.ts`);
        console.info(`Input: file://${process.cwd()}/inputs/${year}/day${day}.${mode}.txt`);
        const fileContents = fs.readFileSync(`inputs/${year}/day${day}.${mode}.txt`, 'utf8');
        Debug.setFile(+year, +day, 'a');
        Debug.enable(mode !== 'input');

        const puzzle: Puzzle<unknown> = new (await import(`src/${year}/Day${day}.ts`)).default(mode);
        const input1 = puzzle.parseInput(fileContents.trim());
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
        console.info();

        if (mode === 'input') {
            registerTimes(+year, +day, time1, time2);
        }
    } catch (e) {
        console.error("Error reading file or running the code.");
        console.error(e);
        process.exit(1);
    }
})();
