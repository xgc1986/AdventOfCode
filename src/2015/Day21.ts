"use strict";

// [[https://adventofcode.com/2015/day/21]]
// Input file [[inputs/2015/day21.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | undefined;

interface Stats {
    health: number;
    attack: number;
    defense: number;
}

interface Item {
    name: string;
    cost: number;
    damage: number;
    protect: number;
}

interface Result {
    win: boolean;
    prize: number;
}

type Input = Stats;

export default class Day21 extends Puzzle<Input> {

    private readonly WEAPONS: Item[] = [
        {name: "Dagger", cost: 8, damage: 4, protect: 0},
        {name: "Shortsword", cost: 10, damage: 5, protect: 0},
        {name: "Warhammer", cost: 25, damage: 6, protect: 0},
        {name: "Longsword", cost: 40, damage: 7, protect: 0},
        {name: "Greataxe", cost: 74, damage: 8, protect: 0}
    ];

    private readonly ARMORS: Item[] = [
        {name: "None", cost: 0, damage: 0, protect: 0},
        {name: "Leather", cost: 13, damage: 0, protect: 1},
        {name: "Chainmail", cost: 31, damage: 0, protect: 2},
        {name: "Splintmail", cost: 53, damage: 0, protect: 3},
        {name: "Bandedmail", cost: 75, damage: 0, protect: 4},
        {name: "Platemail", cost: 102, damage: 0, protect: 5},
    ];

    private readonly RINGS: Item[] = [
        {name: "none 1", cost: 0, damage: 0, protect: 0},
        {name: "none 2", cost: 0, damage: 0, protect: 0},
        {name: "Damage +1", cost: 25, damage: 1, protect: 0},
        {name: "Damage +2", cost: 50, damage: 2, protect: 0},
        {name: "Damage +3", cost: 100, damage: 3, protect: 0},
        {name: "Defense +1", cost: 20, damage: 0, protect: 1},
        {name: "Defense +2", cost: 40, damage: 0, protect: 2},
        {name: "Defense +3", cost: 80, damage: 0, protect: 3},
    ];

    parseInput(input: string): Input {
        const lines = input.split('\n');
        return {
            health: +lines[0].split(': ')[1],
            attack: +lines[1].split(': ')[1],
            defense: +lines[2].split(': ')[1]
        };
    }

    pay(boss: Stats, equipment: Item[]): Result {
        const prize = equipment.reduce((acc, item) => acc + item.cost, 0);
        const damage = equipment.reduce((acc, item) => acc + item.damage, 0);
        const protect = equipment.reduce((acc, item) => acc + item.protect, 0);

        const myTurns = Math.ceil(boss.health / Math.max(1, (damage - boss.defense)));
        const bossTurns = Math.ceil(100 / Math.max(1, (boss.attack - protect)));

        return {
            prize,
            win: myTurns <= bossTurns
        };
    }

    purchaseRing2(boss: Stats, equipment: Item[], cb: (result: Result) => boolean): Result {
        let result = {win: false, prize: -1};

        for (const item of this.RINGS) {
            if (item.name !== equipment[2].name) {
                equipment.push(item);
                let newResult = this.pay(boss, equipment);
                equipment.pop();
                if (newResult.prize > 0 && cb(newResult)) {
                    result = newResult;
                }
            }
        }

        return result;
    }

    purchaseRing1(boss: Stats, equipment: Item[], cb: (result: Result) => boolean): Result {
        let result = {win: false, prize: -1};

        for (const item of this.RINGS) {
            equipment.push(item);
            let newResult = this.purchaseRing2(boss, equipment, cb);
            equipment.pop();
            if (newResult.prize > 0 && cb(newResult)) {
                result = newResult;
            }
        }

        return result;
    }

    purchaseArmor(boss: Stats, equipment: Item[], cb: (result: Result) => boolean): Result {
        let result = {win: false, prize: -1};

        for (const item of this.ARMORS) {
            equipment.push(item);
            let newResult = this.purchaseRing1(boss, equipment, cb);
            equipment.pop();
            if (newResult.prize > 0 && cb(newResult)) {
                result = newResult;
            }
        }

        return result;
    }

    purchaseWeapon(boss: Stats, equipment: Item[], cb: (result: Result) => boolean): Result {
        let result = {win: false, prize: -1};

        for (const item of this.WEAPONS) {
            equipment.push(item);
            let newResult = this.purchaseArmor(boss, equipment, cb);
            equipment.pop();
            if (newResult.prize > 0 && cb(newResult)) {
                result = newResult;
            }
        }

        return result;
    }

    async run1(boss: Input): Promise<Solution> {
        let cost = Infinity;
        this.purchaseWeapon(boss, [], (result) => {
            if (result.win && result.prize < cost) {
                cost = result.prize;
                return true;
            }
            return false;
        }).prize;

        return cost;
    }

    async run2(boss: Input): Promise<Solution> {
        let cost = -Infinity;
        this.purchaseWeapon(boss, [], (result) => {
            if (!result.win && result.prize > cost) {
                cost = result.prize;
                return true;
            }
            return false;
        }).prize;

        return cost;
    }
}