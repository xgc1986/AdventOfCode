Array.prototype.sum = function (): number {
    return this.reduce((acc, val) => acc + val, 0);
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