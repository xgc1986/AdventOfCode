String.prototype.json = function (): any {
    return JSON.parse(this.valueOf());
};
