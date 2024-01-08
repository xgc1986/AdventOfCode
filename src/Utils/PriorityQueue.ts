import Cloneable from "src/Utils/Cloneable.ts";

export default class PriorityQueue<T> implements Cloneable<PriorityQueue<T>> {

    private list: T[] = [];

    private readonly cb: (a: T, b: T) => number;

    constructor(cb: (a: T, b: T) => number) {
        this.cb = cb;
    }

    get length(): number {
        return this.list.length;
    }

    push(item: T) {
        this.list.push(item);
        this.list.sort(this.cb);
    }

    pop(): T | undefined {
        return this.list.shift();
    }

    peek(): T | undefined {
        return this.list[0];
    }

    clone(): PriorityQueue<T> {
        const ret = new PriorityQueue<T>(this.cb);
        ret.list = this.list.copy();
        return ret;
    }
}