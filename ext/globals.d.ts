interface Array<T> {
    num(): number[];
    splitOn(separator: T): T[];
    sum(): number;

    pairs(): Generator<T[]>;
}

interface Number {
    between(min: number, max: number): boolean;
}