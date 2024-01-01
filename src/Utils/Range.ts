import {UArray, UNumber} from "src/Utils";

export default class Range {

    constructor(public readonly min: number, public readonly max: number) {
    }

    containsNumber(value: number): boolean {
        return UNumber.between(value, this.min, this.max);
    }

    contains(range: Range): boolean {
        return this.containsNumber(range.min) && this.containsNumber(range.max);
    }

    overlaps(range: Range): boolean {
        return this.containsNumber(range.min) || this.containsNumber(range.max);
    }

    list(): number[] {
        return UArray.range(this.min, this.max);
    }
}