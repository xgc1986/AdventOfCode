Array.prototype.num = function (): number[] {
    return this.map(Number);
};

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

Array.prototype.sum = function (): number {
    return this.reduce((acc, val) => acc + val, 0);
};

Array.prototype.pairs = function* <T>(): Generator<T[]> {
    for (let i = 0; i < this.length; i++) {
        for (let j = i + 1; j < this.length; j++) {
            yield [this[i], this[j]];
        }
    }
};