Object.prototype.copy = function () {
    return JSON.parse(JSON.stringify(this));
}
Object.defineProperty(Object.prototype, 'copy', { enumerable: false });


Object.prototype.entries = function <T>(): [keyof T, T[keyof T]][] {
    return Object.entries(this) as [keyof T, T[keyof T]][];
}
Object.defineProperty(Object.prototype, 'entries', { enumerable: false });