"use strict";

// [[https://adventofcode.com/2016/day/10]]
// Input file [[inputs/2016/day10.input.txt]]

import Puzzle from "src/Puzzle";
import {StringMap} from "src/Utils.ts";
import * as console from "console";

type Solution = number | undefined;

interface Bot {
    id: number;
    isOutput: boolean;
    microchips: number[];
    destinations: Bot[];
}

interface Factory {
    bots: StringMap<Bot>;
    queue: Bot[];
}

type Input = Factory;

export default class Day10 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const lines = input.split('\n');
        const ret: Factory = {
            bots: {},
            queue: []
        }

        for (const line of lines ) {
            const match = line.match(/^bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)$/);
            if (match !== null) {
                const [_, bot, toLow, lowId, toHigh, highId] = match;
                let low = undefined;
                let high = undefined;
                if (toLow === 'output') {
                    ret.bots[`Output-${lowId}`] ??= {
                        id: +lowId,
                        isOutput: true,
                        microchips: [],
                        destinations: []
                    };
                    low = ret.bots[`Output-${lowId}`];
                } else {
                    ret.bots[`Bot-${lowId}`] ??= {
                        id: +lowId,
                        isOutput: false,
                        microchips: [],
                        destinations: []
                    };
                    low = ret.bots[`Bot-${lowId}`];
                }
                if (toHigh === 'output') {
                    ret.bots[`Output-${highId}`] ??= {
                        id: +highId,
                        isOutput: true,
                        microchips: [],
                        destinations: []
                    };
                    high = ret.bots[`Output-${highId}`];
                } else {
                    ret.bots[`Bot-${highId}`] ??= {
                        id: +highId,
                        isOutput: false,
                        microchips: [],
                        destinations: []
                    };
                    high = ret.bots[`Bot-${highId}`];
                }

                ret.bots[`Bot-${bot}`] ??= {
                    id: +bot,
                    isOutput: false,
                    microchips: [],
                    destinations: []
                };
                ret.bots[`Bot-${bot}`].destinations = [low, high];
            }
        }

        for (const line of lines ) {
            const matchGive = line.match(/^value (\d+) goes to bot (\d+)$/);
            if (matchGive !== null) {
                const bot = `Bot-${matchGive[2]}`;
                ret.bots[bot].microchips.push(+matchGive[1]);
                if (ret.bots[bot].microchips.length === 2) {
                    ret.queue.push(ret.bots[bot]);
                }
            }
        }

        return ret;
    }

    private processFactory(factory: Factory, microchips: number[]): number {
        let theBot = undefined;
        while (factory.queue.length > 0) {
            const bot = factory.queue.shift()!;
            bot.microchips.sort((a, b) => a - b);
            if (bot.microchips[0] === microchips[0] && bot.microchips[1] === microchips[1]) {
                theBot ??= bot.id;
            }

            bot.destinations[0].microchips.push(bot.microchips[0]);
            bot.destinations[1].microchips.push(bot.microchips[1]);

            if (!bot.destinations[0].isOutput && bot.destinations[0].microchips.length === 2) {
                factory.queue.push(bot.destinations[0]);
            }
            if (!bot.destinations[1].isOutput && bot.destinations[1].microchips.length === 2) {
                factory.queue.push(bot.destinations[1]);
            }

            bot.microchips = [];
        }

        return theBot!;
    }

    async run1(factory: Input): Promise<Solution> {
        return this.processFactory(factory, [17, 61]);
    }

    async run2(factory: Input): Promise<Solution> {
        return factory.bots['Output-0'].microchips[0] * factory.bots['Output-1'].microchips[0] * factory.bots['Output-2'].microchips[0];
    }
}