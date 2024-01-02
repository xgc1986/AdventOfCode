"use strict";

// [[https://adventofcode.com/2022/day/20]]
// Input file [[inputs/2022/day20.input.txt]]

import Puzzle from "src/Puzzle";
import {UObject} from "src/Utils.ts";
import LinkedList from "src/Utils/LinkedList.ts";
import LoopList from "src/Utils/LoopList.ts";
import * as console from "console";

type Solution = number | undefined;

type Input = number[];

export default class Day20 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').map(Number);
    }

    async run1(numbers: Input): Promise<Solution> {
        const list = LoopList.fromArray(numbers);
        const elements = list.toLoopListItemArray();

        for (const item of elements) {
            if (item.value > 0) {
                item.advance(item.value);
            } else {
                item.retreat(-item.value);
            }
        }

        const result = list.toArray();
        const zeroIndex = result.indexOf(0);

        return result[(1000 + zeroIndex) % result.length] + result[(2000 + zeroIndex) % result.length] + result[(3000 + zeroIndex) % result.length];
    }

    async run2(numbers: Input): Promise<Solution> {
        const decryptionKey = 811_589_153;
        const list = LoopList.fromArray(numbers.map(n => n * decryptionKey));
        const elements = list.toLoopListItemArray();

        for (let i = 0; i < 10; i++) {
            for (const item of elements) {
                if (item.value > 0) {
                    item.advance(item.value);
                } else {
                    item.retreat(-item.value);
                }
            }
        }

        const result = list.toArray();
        const zeroIndex = result.indexOf(0);

        return result[(1000 + zeroIndex) % result.length] + result[(2000 + zeroIndex) % result.length] + result[(3000 + zeroIndex) % result.length];
    }
}

// > 590025314231