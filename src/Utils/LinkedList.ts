export default class LinkedList<T> {

    private _first: LinkedListItem<T> | undefined;

    private _last: LinkedListItem<T> | undefined;

    private _length: number;

    constructor() {
        this._first = undefined;
        this._last = undefined;
        this._length = 0;
    }

    static fromArray<T>(list: T[]): LinkedList<T> {
        const result = new LinkedList<T>();
        for (const item of list) {
            result.push(item);
        }
        return result;
    }

    get first(): LinkedListItem<T> | undefined {
        return this._first;
    }

    get last(): LinkedListItem<T> | undefined {
        return this._last;
    }

    get length(): number {
        return this._length;
    }

    private forceNext(item: LinkedListItem<T>, next: LinkedListItem<T> | undefined) {
        // @ts-ignore
        item._next = next;
    }

    private forcePrev(item: LinkedListItem<T>, prev: LinkedListItem<T> | undefined) {
        // @ts-ignore
        item._prev = prev;
    }

    get(pos: number): LinkedListItem<T> {
        if (pos < 0 || pos >= this.length) {
            throw new Error(`Index out of bounds: ${pos}`);
        }

        let current = this._first;
        for (let i = 0; i < pos; i++) {
            current = current!.next;
        }

        return current!;
    }

    push(value: T): LinkedListItem<T> {
        this._length++;
        const item = new LinkedListItem(value, this);

        if (this._last === undefined) {
            this._last = item;
            this._first = this._last;
            return item;
        }

        const tmp = this._last;
        this.forcePrev(item, tmp);
        this._last = item;
        this.forceNext(tmp, item);

        return item;
    }

    setFirst(value: T): LinkedListItem<T> {
        this._length++;
        const item = new LinkedListItem(value, this);

        if (this._first === undefined) {
            this._first = item;
            this._last = this._first;
            return item;
        }

        const tmp = this._first;
        this.forceNext(item, tmp);
        this._first = item;
        this.forcePrev(tmp, item);

        return item;
    }

    shift(): LinkedListItem<T> | undefined {
        if (this._first === undefined) {
            return undefined;
        }

        if (this._first === this._last) {
            this._last = undefined;
        }

        const res = this._first;
        this._first = this._first.next;

        if (this._first !== undefined) {
            this.forcePrev(this._first, undefined);
        }

        this.forceNext(res, undefined);

        this._length--;

        return res;
    }

    pop(): LinkedListItem<T> | undefined {
        if (this._last === undefined) {
            return undefined;
        }

        if (this._first === this._last) {
            this._first = undefined;
        }

        const res = this._last;
        this._last = this._last.prev;

        if (this._last !== undefined) {
            this.forceNext(this._last, undefined);
        }

        this.forcePrev(res, undefined);

        this._length--;

        return res;
    }

    insertAt(pos: number, value: T): LinkedListItem<T> {
        if (pos < 0 || pos > this.length) {
            throw new Error(`Index out of bounds: ${pos}`);
        }

        if (pos === 0) {
            return this.setFirst(value);
        }

        if (pos === this._length) {
            return this.push(value);
        }

        this._length++;
        const item = new LinkedListItem(value, this);

        const previous = this.get(pos - 1);
        const tmp = previous.next;

        this.forceNext(previous, item);
        this.forcePrev(item, previous);
        this.forceNext(item, tmp);
        this.forcePrev(tmp!, item);

        return item;
    }

    remove(pos: number|LinkedListItem<T>): LinkedListItem<T> {
        if (pos instanceof LinkedListItem) {
            return this.removeItem(pos);
        }

        if (pos < 0 || pos >= this.length) {
            throw new Error(`Index out of bounds: ${pos}`);
        }

        if (pos === 0) {
            return this.shift()!;
        }

        if (pos === this.length - 1) {
            return this.pop()!;
        }

        const item = this.get(pos);

        this.forceNext(item.prev!, item.next);
        this.forcePrev(item.next!, item.prev);
        this.forceNext(item, undefined);
        this.forcePrev(item, undefined);

        this._length--;

        return item;
    }

    private removeItem(item: LinkedListItem<T>): LinkedListItem<T> {
        if (this._first === item) {
            return this.shift()!;
        }

        if (this._last === item) {
            return this.pop()!;
        }

        this.forceNext(item.prev!, item.next);
        this.forcePrev(item.next!, item.prev);
        this._length--;

        return item;
    }

    toArray(): T[] {
        const result: T[] = [];
        let current = this._first;
        while (current !== undefined) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }

    toLinkedListItemArray(): LinkedListItem<T>[] {
        const result: LinkedListItem<T>[] = [];
        let current = this._first;
        while (current !== undefined) {
            result.push(current);
            current = current.next;
        }
        return result;
    }
}

class LinkedListItem<T> {
    value: T;
    private readonly _next: LinkedListItem<T> | undefined;
    private readonly _prev: LinkedListItem<T> | undefined;
    private readonly _list: LinkedList<T>;

    constructor(value: T, list: LinkedList<T>) {
        this._list = list;
        this._next = undefined;
        this._prev = undefined;
        this.value = value;
    }

    get next(): LinkedListItem<T> | undefined {
        return this._next;
    }

    get prev(): LinkedListItem<T> | undefined {
        return this._prev;
    }

    get list(): LinkedList<T> {
        return this._list;
    }
}