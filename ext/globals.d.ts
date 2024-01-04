interface Array<T> {
    end(): T | undefined;
    groupsOf(size: number): T[][];
    insertAt(index: number, value: T): T[];
    num(): number[];
    range(): T[];
    removeElement(element: T): T[];
    splitOn(separator: T): T[][];
    sum(): number;
    unique(): T[];
}

interface Number {
    between(min: number, max: number): boolean;
    posMod(n: number): number;

}

interface String {
    json(): any;
    next(): string;
    replaceAt(index: number, replacement: string): string;
}

interface Object {
    copy<T>(this: T): T;
    entries<T>(): [keyof T, T[keyof T]][];
    hideProperties<T>(this: T, properties: string[]): void;
}
