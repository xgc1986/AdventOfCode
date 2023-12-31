import {UMath} from "src/Utils.ts";

export default class Permutation {

    static* generate<T>(list: T[], size: number = list.length): Generator<T[]> {
        if (size <= 1) {
            yield list.slice();
            return;
        }

        for (let i = 0; i < size - 1; i++) {
            yield* Permutation.generate(list, size - 1);

            const j = (size % 2 === 0) ? i : 0;
            [list[size - 1], list[j]] = [list[j], list[size - 1]]; // Swap
        }

        yield* Permutation.generate(list, size - 1);
    }

    static total(list: unknown[]): number {
        return  UMath.fact(list.length);
    }

    static get<T>(list: T[]): T[][] {
        const result: T[][] = [];

        for (const p of Permutation.generate(list)) {
            result.push(p);
        }

        return result;
    }
}