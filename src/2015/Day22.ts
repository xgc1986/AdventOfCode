"use strict";

// [[https://adventofcode.com/2015/day/22]]
// Input file [[inputs/2015/day22.input.txt]]

import Puzzle from "src/Puzzle.ts";
import {UObject} from "src/Utils.ts";

type Solution = number | undefined;

interface Stats {
    health: number;
    damage: number;
    poison: number;
    mana: number;
    armor: number;
    mp: number;
}

interface Result {
    mana: number;
    win: boolean;
}

interface Spells {
    name: string;
    cost: number;
    damage: number;
    hp: number;
    mp: number;
    armor: number;
    poison: number;
}

type Input = Stats;

export default class Day22 extends Puzzle<Input> {

    private readonly SPELLS: Spells[] = [
        {name: "Magic Missile", cost: 53, damage: 4, hp: 0, mp: 0, armor: 0, poison: 0},
        {name: "Drain", cost: 73, damage: 2, hp: 2, mp: 0, armor: 0, poison: 0},
        {name: "Shield", cost: 113, damage: 0, hp: 0, mp: 0, armor: 6, poison: 0},
        {name: "Poison", cost: 173, damage: 0, hp: 0, mp: 0, armor: 0, poison: 6},
        {name: "Recharge", cost: 229, damage: 0, hp: 0, mp: 5, armor: 0, poison: 0},
    ];

    parseInput(input: string): Input {
        const lines = input.split('\n');
        return {
            health: +lines[0].split(': ')[1],
            damage: +lines[1].split(': ')[1],
            armor: 0,
            mana: 0,
            mp: 0,
            poison: 0
        };
    }

    playerTurn(player: Stats, boss: Stats, mana: number, turn: number, spells: string[], hardMode: boolean): Result {
        let bestResult: Result = {mana: Infinity, win: false};

        if (hardMode) {
            if (player.health <= 1) {
                return {
                    win: false,
                    mana: mana
                };
            }
        } else {
            if (player.health <= 0) {
                return {
                    win: false,
                    mana: mana
                };
            }
        }

        for (const spell of this.SPELLS) {
            const theBoss = UObject.deepCopy(boss);
            const thePlayer = UObject.deepCopy(player);

            if (hardMode) {
                thePlayer.health -= 1;
            }

            if (theBoss.poison > 0) {
                theBoss.health -= 3;
                theBoss.poison -= 1;
            }

            if (theBoss.health <= 0) {
                return {
                    win: true,
                    mana: mana
                };
            }

            if (thePlayer.mp > 0) {
                thePlayer.mana += 101;
                thePlayer.mp -= 1;
            }

            if (thePlayer.armor > 0) {
                thePlayer.armor -= 1;
            }

            if (thePlayer.armor > 0 && spell.armor > 0) {
                continue;
            }

            if (thePlayer.mp > 0 && spell.mp > 0) {
                continue;
            }

            if (theBoss.poison > 0 && spell.poison > 0) {
                continue;
            }

            if (thePlayer.mana < spell.cost) {
                continue;
            }

            thePlayer.health += spell.hp;
            thePlayer.mana -= spell.cost;
            thePlayer.mp = Math.max(thePlayer.mp, spell.mp);
            thePlayer.armor = Math.max(thePlayer.armor, spell.armor);
            theBoss.health -= spell.damage;
            theBoss.poison = Math.max(theBoss.poison, spell.poison);

            spells.push(spell.name);
            const result = this.bossTurn(thePlayer, theBoss, mana + spell.cost, turn + 1, spells, hardMode);
            spells.pop();

            if (result.win && result.mana < bestResult.mana) {
                bestResult = result;
            }
        }

        return bestResult;
    }

    bossTurn(player: Stats, boss: Stats, mana: number, turn: number, spells: string[], hardMode: boolean = false): Result {
        const theBoss = UObject.deepCopy(boss);
        const thePlayer = UObject.deepCopy(player);

        if (theBoss.poison > 0) {
            theBoss.health -= 3;
            theBoss.poison -= 1;
        }

        if (theBoss.health <= 0) {
            return {
                win: true,
                mana: mana
            };
        }

        if (thePlayer.armor > 0) {
            thePlayer.health -= theBoss.damage - 7;
            thePlayer.armor -= 1;
        } else {
            thePlayer.health -= theBoss.damage;
        }

        if (thePlayer.mp > 0) {
            thePlayer.mana += 101;
            thePlayer.mp -= 1;
        }

        return this.playerTurn(thePlayer, theBoss, mana, turn + 1, spells, hardMode);
    }

    async run1(boss: Input): Promise<Solution> {
        return this.playerTurn(
            {
                health: 50,
                mana: 500,
                armor: 0,
                mp: 0,
                poison: 0,
                damage: 0,
            },
            boss,
            0,
            1,
            [],
            false
        ).mana;
    }

    async run2(boss: Input): Promise<Solution> {
        return this.playerTurn(
            {
                health: 50,
                mana: 500,
                armor: 0,
                mp: 0,
                poison: 0,
                damage: 0,
            },
            boss,
            0,
            1,
            [],
            true
        ).mana;
    }
}