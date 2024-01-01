Number.prototype.between = function (min, max) {
    return this.valueOf() >= min && this.valueOf() <= max;
}