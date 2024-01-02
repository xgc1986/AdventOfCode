"use strict";

// [[https://adventofcode.com/2023/day/19]]
// Input file [[inputs/2023/day19.input.txt]]

import Puzzle from "src/Puzzle";
import {StringMap, UObject} from "src/Utils";

type Solution = number | string | undefined;

interface Category {
    x: number;
    m: number;
    a: number;
    s: number;
}

interface Workflow {
    category: undefined | keyof Category;
    comparison: string | undefined;
    value: number | undefined;
    destination: string;
}


type Input = string[];

export default class Day19 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').filter((line) => line !== '');
    }

    solve1(workflow: StringMap<Workflow[]>, categories: Category): boolean {
        let wf = 'in';

        while (true) {
            if (wf === 'A') {
                return true;
            }

            if (wf === 'R') {
                return false;
            }

            for (const rule of workflow[wf]) {
                if (rule.category === undefined || rule.value === undefined || rule.comparison === undefined) {
                    wf = rule.destination;
                    break;
                }

                if (rule.comparison === '>') {
                    if (categories[rule.category] > rule.value) {
                        wf = rule.destination;
                        break;
                    }
                } else if (rule.comparison === '<') {
                    if (categories[rule.category] < rule.value) {
                        wf = rule.destination;
                        break;
                    }
                }
            }
        }
    }

    solve2(workflows: StringMap<Workflow[]>, categories: Category[], wf: string) {
        if (wf === 'A') {
            return Math.max(0, categories[1]['x'] - categories[0]['x'] + 1) * Math.max(0, categories[1]['m'] - categories[0]['m'] + 1) * Math.max(0, categories[1]['a'] - categories[0]['a'] + 1) * Math.max(0, categories[1]['s'] - categories[0]['s'] + 1);
        } else if (wf === 'R') {
            return 0;
        }

        let newCategories = UObject.clone(categories);
        let total = 0;

        for (const rule of workflows[wf]) {
            if (rule.category === undefined || rule.value === undefined || rule.comparison === undefined) {
                total += this.solve2(workflows, newCategories, rule.destination);
            } else if (rule.comparison === '>') {
                const oldValue = newCategories[0][rule.category];
                newCategories[0][rule.category] = Math.max(newCategories[0][rule.category], rule.value + 1);
                total += this.solve2(workflows, newCategories, rule.destination);
                newCategories[0][rule.category] = oldValue;
                newCategories[1][rule.category] = Math.min(newCategories[1][rule.category], rule.value);
            } else if (rule.comparison === '<') {
                // sc{a<1263:A,A}
                const oldValue = newCategories[1][rule.category];
                newCategories[1][rule.category] = Math.min(newCategories[1][rule.category], rule.value - 1);
                total += this.solve2(workflows, newCategories, rule.destination);
                newCategories[1][rule.category] = oldValue;
                newCategories[0][rule.category] = Math.max(newCategories[0][rule.category], rule.value);
            }
        }

        return total;
    }

    async run1(lines: Input): Promise<Solution> {
        const workflows: StringMap<Workflow[]> = {};
        const parts: Category[] = [];
        let total = 0;

        for (const line of lines) {
            if (line[0] === '{') {
                // {x=787,m=2655,a=1222,s=2876}
                const rawParts = line.split('{')[1].split('}')[0].split(',');
                const part = {
                    x: 0,
                    m: 0,
                    a: 0,
                    s: 0
                };
                for (const rawPart of rawParts) {
                    const p = rawPart.split('=');
                    part[p[0] as keyof Category] = +p[1] as number;
                }
                parts.push(part);
            } else {
                const wfParts = line.split('{');
                const wfName = wfParts[0];
                workflows[wfName] = [];
                const rulesParts = wfParts[1].split('}')[0];
                const rawRules = rulesParts.split(',');
                for (const rawRule of rawRules) {
                    if (rawRule.indexOf(':') !== -1) {
                        const p = rawRule.split(':');
                        const destination = p[1];
                        let category = undefined;
                        let comparison = undefined;
                        let value = undefined;

                        if (p[0].indexOf('>') !== -1) {
                            const pp = p[0].split('>');
                            category = pp[0];
                            comparison = '>';
                            value = +pp[1];
                        } else {
                            const pp = p[0].split('<');
                            category = pp[0];
                            comparison = '<';
                            value = +pp[1];
                        }
                        workflows[wfName].push({
                            category: category as keyof Category,
                            comparison,
                            value,
                            destination
                        });
                    } else {
                        workflows[wfName].push({
                            category: undefined,
                            comparison: undefined,
                            value: undefined,
                            destination: rawRule
                        });
                    }
                }
            }
        }

        for (const part of parts) {
            if (this.solve1(workflows, part)) {
                total += part.x + part.m + part.a + part.s;
            }
        }

        return total;
    }

    async run2(lines: Input): Promise<Solution> {
        const workflows: StringMap<Workflow[]> = {};

        for (const line of lines) {
            if (line[0] === '{') {
                break;
            } else {
                const wfParts = line.split('{');
                const wfName = wfParts[0];
                workflows[wfName] = [];
                const rulesParts = wfParts[1].split('}')[0];
                const rawRules = rulesParts.split(',');
                for (const rawRule of rawRules) {
                    if (rawRule.indexOf(':') !== -1) {
                        const p = rawRule.split(':');
                        const destination = p[1];
                        let category = undefined;
                        let comparison = undefined;
                        let value = undefined;

                        if (p[0].indexOf('>') !== -1) {
                            const pp = p[0].split('>');
                            category = pp[0];
                            comparison = '>';
                            value = +pp[1];
                        } else {
                            const pp = p[0].split('<');
                            category = pp[0];
                            comparison = '<';
                            value = +pp[1];
                        }
                        workflows[wfName].push({
                            category: category as keyof Category,
                            comparison,
                            value,
                            destination
                        });
                    } else {
                        workflows[wfName].push({
                            category: undefined,
                            comparison: undefined,
                            value: undefined,
                            destination: rawRule
                        });
                    }
                }
            }
        }

        return this.solve2(
            workflows,
            [
                {x: 1, m: 1, a: 1, s: 1},
                {x: 4000, m: 4000, a: 4000, s: 4000}
            ],
            'in'
        );
    }
}