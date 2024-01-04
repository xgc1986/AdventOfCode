Array.prototype.end = function <T>(): T | undefined {
    return this[this.length - 1];
}
Object.defineProperty(Array.prototype, "end", { enumerable: false });


Array.prototype.groupsOf = function <T>(size: number): T[][] {
    const result: T[][] = [];
    let current: T[] = [];
    result.push(current);
    for (const item of this) {
        if (current.length === size) {
            current = [];
            result.push(current);
        }
        current.push(item);
    }
    return result;
}
Object.defineProperty(Array.prototype, "groupsOf", { enumerable: false });

Array.prototype.insertAt = function <T>(index: number, value: T): T[] {
    return [...this.slice(0, index), value, ...this.slice(index)];
};
Object.defineProperty(Array.prototype, "insertAt", { enumerable: false });


Array.prototype.num = function (): number[] {
    return this.map(Number);
};
Object.defineProperty(Array.prototype, "num", { enumerable: false });


Array.prototype.range = function <T>(): T[] {
    if (this.length === 0) {
        return [];
    }
    if (this.length === 1) {
        return [this[0]];
    }
    if (this.length > 2) {
        throw new Error("Array.range() only works on arrays of length 2");
    }

    const from = this[0];
    const to = this[1];
    const ret = [];

    if (from < to) {
        for (let i = from; i <= to; i++) {
            ret.push(i);
        }
    } else {
        for (let i = from; i >= to; i--) {
            ret.push(i);
        }
    }

    return ret;
}
Object.defineProperty(Array.prototype, "range", { enumerable: false });


Array.prototype.removeElement = function <T>(element: T): T[] {
    return this.filter((e) => e !== element);
};
Object.defineProperty(Array.prototype, "removeElement", { enumerable: false });


Array.prototype.splitOn = function <T>(separator: T): T[][] {
    const result: T[][] = [];
    let current: T[] = [];
    result.push(current);
    for (const item of this) {
        if (item === separator) {
            current = [];
            result.push(current);
        } else {
            current.push(item);
        }
    }
    return result;
}
Object.defineProperty(Array.prototype, "splitOn", { enumerable: false });


Array.prototype.sum = function (): number {
    return this.reduce((acc, val) => acc + val, 0);
};
Object.defineProperty(Array.prototype, "sum", { enumerable: false });