import Cloneable from "src/Utils/Cloneable.ts";

export default class LoopList<T> implements Cloneable<LoopList<T>> {

    private _first: LoopListItem<T> | undefined;

    private _length: number;

    constructor() {
        this._first = undefined;
        this._length = 0;
    }

    static fromArray<T>(list: T[]): LoopList<T> {
        const result = new LoopList<T>();
        for (const item of list) {
            result.push(item);
        }
        return result;
    }

    get first(): LoopListItem<T> | undefined {
        return this._first;
    }

    get last(): LoopListItem<T> | undefined {
        return this._first?.prev;
    }

    get length(): number {
        return this._length;
    }

    private forceNext(item: LoopListItem<T>, next: LoopListItem<T> | undefined) {
        // @ts-ignore
        item._next = next;
    }

    private forcePrev(item: LoopListItem<T>, prev: LoopListItem<T> | undefined) {
        // @ts-ignore
        item._prev = prev;
    }

    get(pos: number): LoopListItem<T> {
        pos = pos % this.length;

        let current = this._first;
        for (let i = 0; i < pos; i++) {
            current = current!.next;
        }

        return current!;
    }

    push(value: T): LoopListItem<T> {
        if (this._first === undefined) {
            return this.setFirst(value);
        }

        const item = new LoopListItem(value, this);
        this._length++;
        const tmp = this._first.prev!;

        this.forcePrev(this._first, item);
        this.forceNext(tmp, item);
        this.forcePrev(item, tmp);
        this.forceNext(item, this._first);

        return item;
    }

    setFirst(value: T): LoopListItem<T> {
        const item = new LoopListItem(value, this);
        this._length++;

        if (this._first === undefined) {
            this._first = item;
            this.forceNext(item, item);
            this.forcePrev(item, item);

            return item;
        }

        const tmp = this._first;

        this.forcePrev(item, tmp.prev);
        this.forceNext(item, tmp);
        this.forceNext(tmp.prev, item);
        this.forcePrev(tmp, item);

        this._first = item;

        return item;
    }

    shift(): LoopListItem<T> | undefined {
        if (this._first === undefined) {
            return undefined;
        }

        this._length--;

        if (this._first === this._first.next) {
            const res = this._first;
            this._first = undefined;
            this.forceNext(res, res);
            this.forcePrev(res, res);

            return res;
        }

        const res = this._first;

        this._first = this._first.next;
        this.forcePrev(this._first, res.prev);
        this.forceNext(res.prev, this._first);
        this.forceNext(res, res);
        this.forcePrev(res, res);

        return res;
    }

    pop(): LoopListItem<T> | undefined {
        if (this._first === undefined) {
            return undefined;
        }

        if (this._first === this._first.prev) {
            return this.shift();
        }

        const res = this._first.prev;
        this._length--;

        this.forcePrev(this._first, res.prev);
        this.forceNext(res.prev, this._first);
        this.forceNext(res, res);
        this.forcePrev(res, res);

        return res;
    }

    insertAt(pos: number, value: T): LoopListItem<T> {
        pos = pos % this.length;

        if (pos === 0) {
            return this.setFirst(value);
        }

        this._length++;
        const item = new LoopListItem(value, this);

        const previous = this.get(pos - 1);
        const tmp = previous.next;

        this.forceNext(previous, item);
        this.forcePrev(item, previous);
        this.forceNext(item, tmp);
        this.forcePrev(tmp, item);

        return item;
    }

    remove(pos: number | LoopListItem<T>): LoopListItem<T> {
        if (pos instanceof LoopListItem) {
            return this.removeItem(pos);
        }

        pos = pos % this.length;

        if (pos === 0) {
            return this.shift()!;
        }

        const res = this.get(pos);
        this._length--;
        this.forceNext(res.prev, res.next);
        this.forcePrev(res.next, res.prev);
        this.forceNext(res, res);
        this.forcePrev(res, res);

        return res;
    }

    private removeItem(item: LoopListItem<T>): LoopListItem<T> {
        if (item === this._first) {
            return this.shift()!;
        }

        this._length--;
        this.forceNext(item.prev, item.next);
        this.forcePrev(item.next, item.prev);
        this.forceNext(item, item);
        this.forcePrev(item, item);

        return item;
    }

    advance(item: LoopListItem<T>, pos: number): void {
        pos = (pos) % (this.length - 1);
        for (let i = 0; i < pos; i++) {
            if (i === 0 && item === this._first) {
                this._first = item.next;
            }

            const tmp = item.next;
            this.forceNext(item, item.next.next);
            this.forcePrev(item.next, item);
            this.forceNext(item.prev, tmp);
            this.forcePrev(tmp, item.prev);
            this.forcePrev(item, tmp);
            this.forceNext(tmp, item);
        }
    }

    retreat(item: LoopListItem<T>, pos: number): void {
        pos = (pos) % (this.length - 1);

        for (let i = 0; i < pos; i++) {
            if (i === 0 && item === this._first) {
                this._first = item.next;
            }

            const tmp = item.prev;
            this.forcePrev(item, item.prev.prev);
            this.forceNext(item.prev, item);
            this.forcePrev(item.next, tmp);
            this.forceNext(tmp, item.next);
            this.forceNext(item, tmp);
            this.forcePrev(tmp, item);
        }
    }

    toArray(): T[] {
        if (this._first === undefined) {
            return [];
        }

        const ret = [this._first.value];

        let current = this._first.next;
        while (current !== this._first) {
            ret.push(current.value);
            current = current.next;
        }

        return ret;
    }

    toLoopListItemArray(): LoopListItem<T>[] {
        if (this._first === undefined) {
            return [];
        }

        const ret = [this._first];

        let current = this._first.next;
        while (current !== this._first) {
            ret.push(current);
            current = current.next;
        }

        return ret;
    }

    clone(): LoopList<T> {
        const ret = new LoopList<T>();
        const first = this._first;

        if (first === undefined) {
            return ret;
        }

        let current = first.next;
        while (current !== first) {
            ret.push(current.value);
            current = current.next;
        }

        return ret;
    }
}

class LoopListItem<T> {
    value: T;
    private readonly _next: LoopListItem<T>;
    private readonly _prev: LoopListItem<T>;

    private readonly _list: LoopList<T>;

    constructor(value: T, list: LoopList<T>) {
        this._list = list;
        this._next = this;
        this._prev = this;
        this.value = value;
    }

    get next(): LoopListItem<T> {
        return this._next;
    }

    get prev(): LoopListItem<T> {
        return this._prev;
    }

    get list(): LoopList<T> {
        return this._list;
    }

    advance(pos: number): void {
        this._list.advance(this, pos);
    }

    retreat(pos: number): void {
        this._list.retreat(this, pos);
    }
}