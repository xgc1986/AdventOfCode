import {UArray} from "src/Utils.ts";

export default class Sequence {

    static sequence(input: number[]): (number|undefined)[] {
        if (input.length === 0) {
            return [undefined, undefined];
        }

        if (input.length === 1) {
            return [input[0], input[0]];
        }

        const unique = UArray.unique(input);

        if (unique.length === 1) {
            return [input[0], input[1]];
        }

        const reduced = [];
        for (let i = 0; i < input.length - 1; i++) {
            reduced.push(input[i + 1] - input[i]);
        }

        let seq = Sequence.sequence(reduced);
        let lseq = seq[0];
        if (lseq !== undefined) {
            lseq = input[0] - lseq;
        }

        let rseq = seq[1];
        if (rseq !== undefined) {
            rseq = UArray.end(input) + rseq;
        }

        return [lseq, rseq];
    }
}