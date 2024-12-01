export default class Stack<T> {
    private list: T[] = [];

    get length(): number {
        return this.list.length;
    }

    push(item: T) {
        this.list.push(item);
    }

    pop(): T | undefined {
        return this.list.pop();
    }

    peek(): T | undefined {
        return this.list[this.length - 1];
    }
}