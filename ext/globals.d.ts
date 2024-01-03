interface Array<T> {
    end(): T | undefined;
    insertAt(index: number, value: T): T[];
    num(): number[];
    range(): T[];
    splitOn(separator: T): T[][];
    sum(): number;
}

interface Number {
    between(min: number, max: number): boolean;
    posMod(n: number): number;

}

interface String {
    json(): any;
    replaceAt(index: number, replacement: string): string;
}

interface Object {
    copy<T>(this: T): T;
    hideProperties<T>(this: T, properties: string[]): void;
}
