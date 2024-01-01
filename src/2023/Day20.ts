"use strict";

// [[https://adventofcode.com/2023/day/20]]
// Input file [[inputs/2023/day20.input.txt]]

import Puzzle from "src/Puzzle";
import {StringMap} from "src/Utils";

type Solution = number | string | undefined;

type ModuleType = 'conjuction' | 'flip-flop' | 'caster';

interface Module {
    kind: ModuleType,
    inputs: {name: string, pulse: number}[],
    outputs: string[],
    name: string,
    pulse: number,
}

type Input = {
    modules: StringMap<Module>,
    broadcaster: string[],
};

export default class Day20 extends Puzzle<Input> {

    solve(input: Input, presses: number | undefined) {
        const map = input.modules;

        const buttonCounts: StringMap<number> = {};

        for (const m in map) {
            if (map[m].outputs[0] === 'rx') {
                for (const rec of map[m].inputs) {
                    buttonCounts[rec.name] = 0;
                }
            }
        }

        let i = 0;
        const nPulses = [0, 0];
        while (!Object.values(buttonCounts).every(Boolean)) {
            const queue: { name: string, pulse: number, from: string }[] = [];
            for (const item of input.broadcaster) {
                queue.push({ name: item, pulse: 0, from: 'button' });
            }
            nPulses[0]++;
            while (queue.length) {
                const item = queue.shift();
                if (item === undefined) {
                    continue;
                }
                const { name, pulse, from } = item;
                nPulses[pulse]++;
                if (name in buttonCounts && !pulse) {
                    buttonCounts[name] ||= i;
                }
                const curr = map[name];
                if (!curr) continue;

                if (curr.kind === 'flip-flop') {
                    if (!pulse) {
                        curr.pulse = +!curr.pulse;
                        queue.push(
                            ...curr.outputs.map((out) => ({
                                name: out,
                                pulse: curr.pulse,
                                from: name,
                            }))
                        );
                    }
                } else {
                    curr.inputs = curr.inputs.map((inp) =>
                        inp.name === from ? { name: from, pulse } : inp
                    );
                    queue.push(
                        ...curr.outputs.map((out) => ({
                            name: out,
                            pulse: +!curr.inputs.every((inp) => inp.pulse),
                            from: name,
                        }))
                    );
                }
            }
            i++;
            if (i === presses) {
                return nPulses[0] * nPulses[1];
            }
        }

        return Object.values(buttonCounts).reduce((acc, n) => acc * (n + 1), 1);
    }

    parseInput(input: string): Input {
        const map: Input = {
            modules: {},
            broadcaster: [],
        };
        for (const line of input.split('\n')) {
            let [l, r] = line.split(' -> ');
            if (l === 'broadcaster') {
                map.broadcaster = r.split(', ');
            } else if (l[0] === '%') {
                map.modules[l.substring(1)] = {
                    kind: 'flip-flop',
                    outputs: r.split(', '),
                    pulse: 0,
                    name: l.substring(1),
                    inputs: [],
                };
            } else {
                map.modules[l.substring(1)] = {
                    kind: 'conjuction',
                    outputs: r.split(', '),
                    pulse: 0,
                    name: l.substring(1),
                    inputs: [],
                };
            }
        }

        for (const name in map.modules) {
            for (const dest of map.modules[name].outputs) {
                if (map.modules[dest] !== undefined && map.modules[dest].kind === 'conjuction') {
                    map.modules[dest].inputs.push({ name, pulse: 0 });
                }
            }
        }

        return map;
    }

    async run1(input: Input): Promise<Solution> {
        return this.solve(input, 1000);
    }

    async run2(input: Input): Promise<Solution> {
        return this.solve(input, undefined);
    }
}
