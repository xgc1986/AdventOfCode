import {UArray, UNumber} from "src/Utils";

export default class Range {

    constructor(public readonly min: number, public readonly max: number) {
    }

    contains(range: Range): boolean {
        return range.min.between(this.min, this.max) && range.max.between(this.min, this.max);
    }

    overlaps(range: Range): boolean {
        return range.min.between(this.min, this.max) || range.max.between(this.min, this.max);
    }

    list(): number[] {
        return UArray.range(this.min, this.max);
    }
}