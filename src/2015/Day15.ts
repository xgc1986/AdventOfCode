"use strict";

// [[https://adventofcode.com/2015/day/15]]
// Input file [[inputs/2015/day15.input.txt]]

import Puzzle from "src/Puzzle";
import {UObject} from "src/Utils";

type Solution = number | undefined;

interface Dish {
    capacity: number;
    durability: number;
    flavor: number;
    texture: number;
    calories: number;
}

type Input = Dish[];

export default class Day15 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').map(line => {
            const [_, capacity, durability, flavor, texture, calories] = line.match(/capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/) || [];
            return {
                capacity: parseInt(capacity),
                durability: parseInt(durability),
                flavor: parseInt(flavor),
                texture: parseInt(texture),
                calories: parseInt(calories)
            };
        });
    }

    calculate(ingredients: Dish[], spoons: number[], index: number, calories: number | undefined = undefined): number {
        const characteristics = ['capacity', 'durability', 'flavor', 'texture'] as (keyof Dish)[];

        if (index === ingredients.length - 1) {
            let score = 1;

            if (calories !== undefined) {
                let caloriesScore = 0;

                for (let j = 0; j < ingredients.length; j++) {
                    caloriesScore += ingredients[j].calories * spoons[j];
                }

                if (caloriesScore !== calories) {
                    return 0;
                }
            }

            for (let i = 0; i < characteristics.length; i++) {
                let subScore = 0;
                for (let j = 0; j < ingredients.length; j++) {
                    const ingredient = ingredients[j];
                    const characteristic = characteristics[i];
                    subScore += ingredient[characteristic] * spoons[j];
                }

                if (subScore < 0) {
                    subScore = 0;
                }

                score *= subScore;
            }

            return score;
        }

        let score = 0;

        for (let i = 0; i <= spoons[index]; i++) {
            const newSpoons = UObject.clone(spoons);
            newSpoons[index] -= i;
            newSpoons[index + 1] += i;

            score = Math.max(score, this.calculate(ingredients, newSpoons, index + 1, calories));
        }

        return score;
    }

    async run1(dishes: Input): Promise<Solution> {
        const spoons = new Array(dishes.length).fill(0);
        spoons[0] = 100;
        return this.calculate(dishes, spoons, 0);
    }

    async run2(dishes: Input): Promise<Solution> {
        const spoons = new Array(dishes.length).fill(0);
        spoons[0] = 100;
        return this.calculate(dishes, spoons, 0, 500);
    }
}