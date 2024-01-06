export default class PriorityQueue<T> {

    private list: T[] = [];

    private readonly cb: (a: T, b: T) => number;

    constructor(cb: (a: T, b: T) => number) {
        this.cb = cb;
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
}