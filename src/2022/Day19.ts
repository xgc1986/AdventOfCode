"use strict";

// [[https://adventofcode.com/2022/day/19]]
// Input file [[inputs/2022/day19.input.txt]]

import Puzzle from "src/Puzzle";
import {StringMap} from "src/Utils.ts";

type Solution = number | undefined;

type Blueprint = StringMap<StringMap<number>>;

type Input = Blueprint[];

export default class Day19 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').map(line => {
            const matches = (line.match(/Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian./) as string[]).num();

            return {
                ore: {ore: matches[2]},
                clay: {ore: matches[3]},
                obsidian: {ore: matches[4], clay: matches[5]},
                geode: {ore: matches[6], obsidian: matches[7]}
            }
        });
    }

    private maxGeodes = 0;

    recursiveRun(blueprint: Blueprint, duration: number, ore: number, clay: number, obsidian: number, geode: number, oreProduction: number, clayProduction: number, obsidianProduction: number, geodeProduction: number, actions: string[]): number {
        if (duration === 0) {
            return geode;
        }

        let maxOreRequired = Math.max(blueprint.clay.ore, blueprint.obsidian.ore, blueprint.geode.ore);
        let canGeode = ore >= blueprint.geode.ore && obsidian >= blueprint.geode.obsidian;
        let canObsidian = ore >= blueprint.obsidian.ore && clay >= blueprint.obsidian.clay && !canGeode && (obsidianProduction < blueprint.geode.obsidian)
        let canClay = ore >= blueprint.clay.ore && !canGeode && (clayProduction < blueprint.obsidian.clay);
        let canOre = ore >= blueprint.ore.ore && oreProduction < maxOreRequired && !canGeode;
        let canNothing = !canGeode;

        if (canNothing) {
            if (oreProduction >= maxOreRequired && clayProduction >= blueprint.obsidian.clay) {
                canNothing = false;
            } else if (clayProduction >= blueprint.obsidian.clay) {
                if (canOre && canObsidian) {
                    canNothing = false;
                }
            } else if (oreProduction >= maxOreRequired) {
                if (canClay && canObsidian) {
                    canNothing = false;
                }
            } else {
                if (clayProduction === 0 && canOre && canClay) {
                    canNothing = false;
                } else if (obsidianProduction === 0 && canOre && canClay && canObsidian) {
                    canNothing = false;
                } else if (canOre && canClay && canObsidian) {
                    canNothing = false;
                }
            }
        }

        if (canGeode) {
            const newActions = [...actions, 'geo'];
            let nOre = ore - blueprint.geode.ore + oreProduction;
            let nClay = clay + clayProduction;
            let nObsidian = obsidian - blueprint.geode.obsidian + obsidianProduction;
            let nGeode = geode + geodeProduction;
            let nDuration = duration - 1;
            let nOreProduction = oreProduction;
            let nClayProduction = clayProduction;
            let nObsidianProduction = obsidianProduction;
            let nGeodeProduction = geodeProduction + 1;

            const g = this.recursiveRun(blueprint, nDuration, nOre, nClay, nObsidian, nGeode, nOreProduction, nClayProduction, nObsidianProduction, nGeodeProduction, newActions);
            if (g > this.maxGeodes) {
                this.maxGeodes = g;
            }
        }

        if (canObsidian) {
            const newActions = [...actions, 'obs'];
            let nOre = ore - blueprint.obsidian.ore + oreProduction;
            let nClay = clay - blueprint.obsidian.clay + clayProduction;
            let nObsidian = obsidian + obsidianProduction;
            let nGeode = geode + geodeProduction;
            let nDuration = duration - 1;
            let nOreProduction = oreProduction;
            let nClayProduction = clayProduction;
            let nObsidianProduction = obsidianProduction + 1;
            const g = this.recursiveRun(blueprint, nDuration, nOre, nClay, nObsidian, nGeode, nOreProduction, nClayProduction, nObsidianProduction, geodeProduction, newActions);
            if (g > this.maxGeodes) {
                this.maxGeodes = g;
            }
        }

        if (canClay) {
            const newActions = [...actions, 'cla'];
            let nOre = ore - blueprint.clay.ore + oreProduction;
            let nClay = clay + clayProduction;
            let nObsidian = obsidian + obsidianProduction;
            let nGeode = geode + geodeProduction;
            let nDuration = duration - 1;
            let nOreProduction = oreProduction;
            let nClayProduction = clayProduction + 1;
            const g = this.recursiveRun(blueprint, nDuration, nOre, nClay, nObsidian, nGeode, nOreProduction, nClayProduction, obsidianProduction, geodeProduction, newActions);
            if (g > this.maxGeodes) {
                this.maxGeodes = g;
            }
        }

        if (canOre) {
            const newActions = [...actions, 'ore'];
            let nOre = ore - blueprint.ore.ore + oreProduction;
            let nClay = clay + clayProduction;
            let nObsidian = obsidian + obsidianProduction;
            let nGeode = geode + geodeProduction;
            let nDuration = duration - 1;
            let nOreProduction = oreProduction + 1;
            const g = this.recursiveRun(blueprint, nDuration, nOre, nClay, nObsidian, nGeode, nOreProduction, clayProduction, obsidianProduction, geodeProduction, newActions);
            if (g > this.maxGeodes) {
                this.maxGeodes = g;
            }
        }

        if (canNothing) {
            const newActions = [...actions, '---'];
            let nOre = ore + oreProduction;
            let nClay = clay + clayProduction;
            let nObsidian = obsidian + obsidianProduction;
            let nGeode = geode + geodeProduction;
            let nDuration = duration - 1;
            const g = this.recursiveRun(blueprint, nDuration, nOre, nClay, nObsidian, nGeode, oreProduction, clayProduction, obsidianProduction, geodeProduction, newActions);
            if (g > this.maxGeodes) {
                this.maxGeodes = g;
            }
        }

        return this.maxGeodes;
    }

    async run1(blueprints: Input): Promise<Solution> {
        let qu = 0;
        let i = 0;
        for (const blueprint of blueprints) {
            i++;
            this.maxGeodes = 0;
            const q = this.recursiveRun(blueprint, 24, 0, 0, 0, 0, 1, 0, 0, 0, []);

            qu += q * i;
        }
        return qu;
    }

    async run2(blueprints: Input): Promise<Solution> {
        let total = 1;
        for (let i = 0; i < Math.min(3, blueprints.length); i++) {
            this.maxGeodes = 0;
            const q = this.recursiveRun(blueprints[i], 32, 0, 0, 0, 0, 1, 0, 0, 0, []);
            total *= q;
        }
        return total;
    }
}

// >2400