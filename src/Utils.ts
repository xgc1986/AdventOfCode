import * as fs from "fs";
import {execSync} from "child_process";
import Graph from "src/Graph.ts";
import * as console from "console";
import uuid4 from "uuid4";
import * as process from "process";

export type BASIC_TYPES = number | string | undefined | null | boolean;
export type JSON_OBJECT =
    UMap<BASIC_TYPES | JSON_OBJECT | (BASIC_TYPES | JSON_OBJECT)[]>
    | (BASIC_TYPES | JSON_OBJECT)[];

export interface UMap<T> {
    [key: string]: T
}

export class Debug {
    private static enabled = false;

    private static file = 'outputs/output.txt';
    private static year: number = 0;
    private static day: number = 0;
    private static part: string = '';
    private static isExecuting: boolean = false;

    static enable(b: boolean) {
        Debug.enabled = b;
    }

    static executing(b: boolean) {
        Debug.isExecuting = b;
    }

    static setFile(year: number, day: number, part: string) {
        fs.mkdirSync(`outputs/${year}`, {recursive: true});
        Debug.file = `outputs/${year}/day${day}${part}.txt`;
        Debug.year = year;
        Debug.part = part;
        Debug.day = day;
        fs.rmSync(Debug.file, {force: true});
        fs.openSync(Debug.file, 'w');
    }

    static write(...args: unknown[]) {
        if (Debug.enabled) {
            fs.appendFileSync(Debug.file, args.join(' '));
        }
    }

    static writeLn(...args: unknown[]) {
        Debug.write(...args, '\n');
    }

    static clear() {
        if (fs.statSync(Debug.file).size === 0) {
            fs.rmSync(Debug.file);
        }
    }

    static generateGraph(graph: Graph, withWeight: boolean = false, bin: 'neato' | 'dot' = 'dot', filename: string | undefined = undefined) {
        let route = filename === undefined
            ? `outputs/${Debug.year}/day${Debug.day}`
            : `outputs/${Debug.year}/${filename}`;

        if (Debug.isExecuting) {
            route += Debug.part;
        }

        const GREEN = '\x1b[32m';
        const RESET = '\x1b[0m';

        fs.writeFileSync(`${route}.gv`, graph.dotString(withWeight));
        execSync(`${bin} -Tsvg ${route}.gv > ${route}.svg`);
        fs.rmSync(`${route}.gv`);
        console.info(`Generated grapth file '${GREEN}file://${process.cwd()}/${route}.svg${RESET}'`);
    }
}

export class UObject {
    static deepCopy<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj));
    }
}

export class UNumber {
    static between(val: number, min: number, max: number): boolean {
        return val >= min && val <= max;
    }

    static parseFloat(val: unknown): number {
        const match = `${val}`.match(/[-.\d]+/gi);
        if (match === null) {
            return 0;
        }
        return parseFloat(match.join(''));
    }

    static parseInt(val: unknown): number {
        const match = `${val}`.match(/[-\d]+/gi);
        if (match === null) {
            return 0;
        }
        return parseInt(match.join(''));
    }

    static round(val: number, decimals: number): number {
        const factor = Math.pow(10, decimals);
        return Math.round(val * factor) / factor;
    }
}

export class UArray {

    static matrix<T>(rows: number, columns: number, value: T): T[][] {
        const ret: T[][] = [];
        for (let y = 0; y < rows; y++) {
            const row: T[] = [];
            for (let x = 0; x < columns; x++) {
                row.push(value);
            }
            ret.push(row);
        }

        return ret;
    }

    static divide<T>(list: T[], index: number): T[][] {
        const left = list.slice(0, index);
        const right = list.slice(index);

        return [left, right];
    }

    static matrixValue<T>(matrix: T[][], row: number, col: number) {
        if (row < 0 || row >= matrix.length || col < 0 || col >= matrix[row].length) {
            return undefined;
        }

        return matrix[row][col];
    }

    static surround4<T>(matrix: T[][], row: number, col: number): T[] {
        return [
            UArray.matrixValue(matrix, row - 1, col),
            UArray.matrixValue(matrix, row, col - 1),
            UArray.matrixValue(matrix, row, col + 1),
            UArray.matrixValue(matrix, row + 1, col),
        ].filter((v) => v !== undefined) as T[];
    }

    static surround8<T>(matrix: T[][], row: number, col: number): T[] {
        return [
            UArray.matrixValue(matrix, row - 1, col - 1),
            UArray.matrixValue(matrix, row - 1, col),
            UArray.matrixValue(matrix, row - 1, col + 1),
            UArray.matrixValue(matrix, row, col - 1),
            UArray.matrixValue(matrix, row, col + 1),
            UArray.matrixValue(matrix, row + 1, col - 1),
            UArray.matrixValue(matrix, row + 1, col),
            UArray.matrixValue(matrix, row + 1, col + 1),
        ].filter((v) => v !== undefined) as T[];
    }

    static unique<T>(list: T[]): T[] {
        const ret: T[] = [];
        for (const item of list) {
            if (!ret.includes(item)) {
                ret.push(item);
            }
        }

        return ret;
    }

    static end<T>(input: T[]): T {
        return input[input.length - 1];
    }

    static range(from: number, to: number): number[] {
        const ret: number[] = [];
        for (let i = from; i <= to; i++) {
            ret.push(i);
        }

        return ret;
    }
}

export class UMath {

    static solveQuadratic(a: number, b: number, c: number): number[] {
        const sqrt = Math.sqrt(b * b - 4 * a * c);
        const x1 = (-b + sqrt) / (2 * a);
        const x2 = (-b - sqrt) / (2 * a);

        return [x1, x2];
    }

    static gcd(a: number, b: number): number {
        if (b === 0) {
            return a;
        }

        return UMath.gcd(b, a % b);
    }

    static lcm(a: number, b: number): number {
        return (a * b) / UMath.gcd(a, b);
    }

    static mod(a: number, b: number): number {
        return a < 0
            ? (b - (-a % b)) % b
            : a % b;
    }

    static fact(n: number): number {
        let ret = 1;
        for (let i = 1; i <= n; i++) {
            ret *= i;
        }

        return ret;
    }
}

export class UString {
    static nextChar(c: string): string {
        return String.fromCharCode(c.charCodeAt(0) + 1);
    }

    static uuid(): string {
        return uuid4();
    }

    static divideInSubstringsBySize(input: string, size: number): string[] {
        const ret: string[] = [];
        for (let i = 0; i < input.length; i += size) {
            ret.push(input.slice(i, i + size));
        }

        return ret;
    }
}