interface Array<T> {
    num(): number[];
    splitOn(separator: T): T[];
    sum(): number;
    insertAt(index: number, value: T): T[];

    pairs(): Generator<T[]>;
}

interface Number {
    between(min: number, max: number): boolean;

    posMod(n: number): number;
}

interface String {
    json(): any;
}

interface Object {
    copy<T>(this: T): T;
}