export default class Queue<T> {
    private list: T[] = [];

    get length(): number {
        return this.list.length;
    }

    push(item: T) {
        this.list.push(item);
    }

    pop(): T | undefined {
        return this.list.shift();
    }

    peek(): T | undefined {
        return this.list[0];
    }
}