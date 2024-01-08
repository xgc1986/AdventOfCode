Object.prototype.copy = function<T> (insecure: boolean = false): T {
    if (insecure) {
        return JSON.parse(JSON.stringify(this));
    }

    if (typeof this === 'number' || typeof this === 'string' || typeof this === 'boolean') {
        return this.valueOf() as T;
    }

    if (this instanceof Array) {
        const ret = [];
        for (let i = 0; i < this.length; i++) {
            if (this[i] instanceof Object) {
                ret[i] = this[i].copy();
            } else {
                ret[i] = this[i];
            }
        }
        return ret as T;
    }

    // @ts-ignore
    if (typeof this.clone === 'function') {
        // @ts-ignore
        return this.clone();
    }

    if (this.constructor.name !== 'Object') {
        throw new Error(`Cannot copy ${this.constructor.name}`);
    }

    if (this instanceof Object) {
        const ret = {};
        for (const [key, value] of Object.entries(this)) {
            if (value instanceof Object) {
                // @ts-ignore
                ret[key] = value.copy();
            } else {
                // @ts-ignore
                ret[key] = value;
            }
        }
        return ret as T;
    }

    // @ts-ignore
    throw new Error(`Cannot copy ${this.constructor.name}`);
}
Object.defineProperty(Object.prototype, 'copy', {enumerable: false});


Object.prototype.entries = function <T>(): [keyof T, T[keyof T]][] {
    return Object.entries(this) as [keyof T, T[keyof T]][];
}
Object.defineProperty(Object.prototype, 'entries', {enumerable: false});
