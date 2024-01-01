"use strict";

// [[https://adventofcode.com/2022/day/19]]
// Input file [[inputs/2022/day19.input.txt]]

import Puzzle from "src/Puzzle";
import {Debug, StringMap} from "src/Utils.ts";
import TextColors from "src/TextColors.ts";
import * as console from "console";

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

    async run1(blueprints: Input): Promise<Solution> {
        let totalQuality = 0;

        for (let i = 0; i < blueprints.length; i++) {
            const quality = (await this.run(blueprints[i], 24)) * (i + 1);
            console.log('Quality', quality);
            totalQuality += quality;
            break;
        }

        return totalQuality;
    }

    async run2(_: Input): Promise<Solution> {
        return undefined;
    }

    private async run(blueprint: Blueprint, duration: number): Promise<number> {
        let totalOre = 0;
        let totalClay = 0;
        let totalObsidian = 0;
        let totalGeode = 0;
        let oreProduction = 1;
        let clayProduction = 0;
        let obsidianProduction = 0;
        let geodeProduction = 0;

        console.log(blueprint);
        for (let minutes = 0; minutes < duration; minutes++) {
            console.log();
            console.log(`== Minute ${minutes + 1} ==`);

            let turnsToGeode = Infinity;
            let turnsToObsidian = Infinity;
            let turnsToClay = ((blueprint.clay.ore - totalOre) / oreProduction);
            let turnsToOre = ((blueprint.ore.ore - totalOre) / oreProduction);

            if (clayProduction > 0) {
                turnsToObsidian = Math.max(
                    ((blueprint.obsidian.clay - totalClay) / clayProduction),
                    ((blueprint.obsidian.ore - totalOre) / oreProduction)
                );
            }

            if (obsidianProduction > 0) {
                turnsToGeode = Math.max(
                    ((blueprint.geode.obsidian - totalObsidian) / obsidianProduction),
                    ((blueprint.geode.ore - totalOre) / oreProduction)
                );
            }

            let iCanBuy = true;

            // check geode
            if (turnsToGeode <= 0) {
                console.log(` > Purchase ${TextColors.GREEN}geode${TextColors.RESET} robot`);
                geodeProduction++;
                iCanBuy = false;
                totalOre -= blueprint.geode.ore;
                totalObsidian -= blueprint.geode.obsidian;
                totalGeode--;
            }

            // check obsidian
            if (iCanBuy && turnsToObsidian <= 0) {
                let doIt = true;
                if (obsidianProduction > 0) {
                    const newTurnsToGeode = Math.max(
                        ((blueprint.geode.obsidian - totalObsidian) / (obsidianProduction + 1)),
                        ((blueprint.geode.ore - (totalOre - blueprint.obsidian.ore)) / oreProduction)
                    );

                    doIt = newTurnsToGeode <= turnsToGeode;
                }

                if (doIt) {
                    console.log(` > Purchase ${TextColors.GREEN}obsidian${TextColors.RESET} robot`);
                    obsidianProduction++;
                    iCanBuy = false;
                    totalOre -= blueprint.obsidian.ore;
                    totalClay -= blueprint.obsidian.clay;
                    totalObsidian--;
                }
            }

            // check clay
            if (iCanBuy && turnsToClay <= 0) {
                let doIt = true;
                if (clayProduction > 0) {
                    const newTurnsToObsidian = Math.max(
                        ((blueprint.obsidian.clay - totalClay) / (clayProduction + 1)),
                        ((blueprint.obsidian.ore - (totalOre - blueprint.clay.ore)) / oreProduction)
                    );

                    doIt = newTurnsToObsidian <= turnsToObsidian;
                }

                if (doIt) {
                    console.log(` > Purchase ${TextColors.GREEN}clay${TextColors.RESET} robot`);
                    clayProduction++;
                    iCanBuy = false;
                    totalOre -= blueprint.clay.ore;
                    totalClay--;
                }
            }

            // check ore
            if (iCanBuy && turnsToOre <= 0) {
                let doIt = true;

                /* check geode ?*/
                if (obsidianProduction > 0) {
                    const newTurnsToGeode = Math.max(
                        ((blueprint.geode.obsidian - totalObsidian) / obsidianProduction),
                        ((blueprint.geode.ore - (totalOre - blueprint.ore.ore)) / (oreProduction + 1))
                    );

                    doIt = newTurnsToGeode <= turnsToGeode;
                }
                /**/

                /* check obsidian ?*/
                if (doIt && clayProduction > 0) {
                    const newTurnsToObsidian = Math.max(
                        ((blueprint.obsidian.clay - totalClay) / clayProduction),
                        ((blueprint.obsidian.ore - (totalOre - blueprint.ore.ore)) / (oreProduction + 1))
                    );

                    doIt = newTurnsToObsidian <= turnsToObsidian;
                }

                /* check clay ?*/
                const newTurnsToClay = ((blueprint.clay.ore - totalOre) / (oreProduction + 1));
                doIt = newTurnsToClay <= turnsToClay;
                /**/

                if (doIt) {
                    console.log(` > Purchase ${TextColors.GREEN}ore${TextColors.RESET} robot`);
                    oreProduction++;
                    totalOre -= blueprint.ore.ore;
                    iCanBuy = false;
                    totalOre--
                }
            }

            totalGeode += geodeProduction;
            totalObsidian += obsidianProduction;
            totalClay += clayProduction;
            totalOre += oreProduction;

            console.log(`Property:  ${TextColors.GREEN}${totalOre}${TextColors.RESET} ore, ${TextColors.GREEN}${totalClay}${TextColors.RESET} clay, ${TextColors.GREEN}${totalObsidian}${TextColors.RESET} obsidian, ${TextColors.GREEN}${totalGeode}${TextColors.RESET} geode`);
            console.log(`Producing: ${TextColors.GREEN}${oreProduction}${TextColors.RESET} ore, ${TextColors.GREEN}${clayProduction}${TextColors.RESET} clay, ${TextColors.GREEN}${obsidianProduction}${TextColors.RESET} obsidian, ${TextColors.GREEN}${geodeProduction}${TextColors.RESET} geode`);

            await Debug.pause();
        }

        //console.log(`Property:  ${TextColors.GREEN}${totalOre}${TextColors.RESET} ore, ${TextColors.GREEN}${totalClay}${TextColors.RESET} clay, ${TextColors.GREEN}${totalObsidian}${TextColors.RESET} obsidian, ${TextColors.GREEN}${totalGeode}${TextColors.RESET} geode`);
        //console.log(`Producing: ${TextColors.GREEN}${oreProduction}${TextColors.RESET} ore, ${TextColors.GREEN}${clayProduction}${TextColors.RESET} clay, ${TextColors.GREEN}${obsidianProduction}${TextColors.RESET} obsidian, ${TextColors.GREEN}${geodeProduction}${TextColors.RESET} geode`);

        return totalGeode;
    }
}

// > 953