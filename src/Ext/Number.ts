Number.prototype.between = function (min, max) {
    return this.valueOf() >= min && this.valueOf() <= max;
};
Object.defineProperty(Number.prototype, 'between', { enumerable: false });

Number.prototype.posMod = function (n) {
    const a = this.valueOf();
    return a < 0 ? (n - (-a % n)) % n : a % n;
};
Object.defineProperty(Number.prototype, 'posMod', { enumerable: false });