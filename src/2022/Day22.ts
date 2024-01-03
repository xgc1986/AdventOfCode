"use strict";

// [[https://adventofcode.com/2022/day/22]]
// Input file [[inputs/2022/day22.input.txt]]

import Puzzle from "src/Puzzle";
import {StringMap} from "src/Utils.ts";

type Solution = number | undefined;

interface Note {
    map: string[];
    directions: { amount: number, direction: string }[],
    sr: number;
    sc: number;
    tp: StringMap<TeleportTo>
    tp2: StringMap<TeleportTo>
}

interface TeleportTo {
    rot: string;
    block: boolean;
    r: number;
    c: number;
}

/*
"3W": {rot: 'RR', block: false, r: 0, c: 0},
*/

type Input = Note;

export default class Day22 extends Puzzle<Input> {

    private directions: StringMap<number[]> = {
        'E': [0, 1],
        'S': [1, 0],
        'W': [0, -1],
        'N': [-1, 0],
    };

    private turns: StringMap<string> = {
        'ER': 'S',
        'EL': 'N',
        'SR': 'W',
        'SL': 'E',
        'WR': 'N',
        'WL': 'S',
        'NR': 'E',
        'NL': 'W',
    }

    private dir: StringMap<string> = {
        'E': '>',
        'S': 'v',
        'W': '<',
        'N': '^',
    }

    private directionScore: StringMap<number> = {
        'E': 0,
        'S': 1,
        'W': 2,
        'N': 3,
    }

    private buildTp(note: Note, from: number[], to: number[], dir: string, rot: string, atRow: number | undefined, atColumn: number | undefined) {
        // this.buildTp(note, [3 * size, 4 * size - 1], [size, 2 * size - 1], 'W', 'S');
        // this.buildTp(note, [150, 199], [50, 99], 'W', 'RR');

        // "150W": {rot: 'L', block: false, r: 50, c: 99},
        const fromRange = from.range();
        const toRange = to.range();

        for (let i in fromRange) {
            const index = +i;
            const fromElement = fromRange[index];
            const toElement = toRange[index];

            const hash = `${fromElement}${dir}`;
            if (atRow !== undefined) {
                note.tp2[hash] = {
                    rot: rot,
                    block: note.map[atRow][toElement] === '#',
                    r: atRow,
                    c: toElement
                };
            } else {
                atColumn ??= 0;
                note.tp2[hash] = {
                    rot: rot,
                    block: note.map[toElement][atColumn] === '#',
                    r: toElement,
                    c: atColumn
                };
            }
        }
    }

    parseInput(input: string): Input {
        const note: Note = {
            map: [],
            directions: [
                {
                    amount: 0,
                    direction: ''
                }
            ],
            sr: -1,
            sc: 0,
            tp: {},
            tp2: {}
        };

        const parts = input.split("\n").splitOn("");

        note.map = parts[0];

        for (let r = 0; r < note.map.length; r++) {
            if (note.sr >= 0) {
                break;
            }

            for (let c = 0; c < note.map[r].length; c++) {
                if (note.map[r][c] === '.' || note.map[r][c] === '#') {
                    note.sr = r;
                    note.sc = c - 1;

                    break;
                }
            }
        }

        const directions = parts[1][0];
        for (let i = 0; i < directions.length; i++) {
            if (directions[i] === 'R' || directions[i] === 'L') {
                note.directions.end()!.direction = directions[i];
                note.directions.push({
                    amount: 0,
                    direction: ''
                });
            } else {
                note.directions.end()!.amount = note.directions.end()!.amount * 10 + (+directions[i]);
            }
        }

        for (let r = 0; r < note.map.length; r++) {
            for (let c = 0; c < note.map[r].length; c++) {
                if (note.map[r][c] !== ' ') {
                    const info = {
                        rot: '',
                        block: note.map[r][c] === '#',
                        r: r,
                        c: c,
                    };
                    if (note.tp[`${c}S`] === undefined) {
                        note.tp[`${c}S`] = info;
                    } else {
                        note.tp[`${c}N`] = info;
                    }

                    if (note.tp[`${r}E`] === undefined) {
                        note.tp[`${r}E`] = info;
                    } else {
                        note.tp[`${r}W`] = info;
                    }
                }
            }
        }

        // this depends on the type of map
        const size = note.map.length / 4;
        // A
        this.buildTp(note, [3 * size, 4 * size - 1], [size, 2 * size - 1], 'W', 'S', 0, undefined);
        this.buildTp(note, [size, 2 * size - 1], [3 * size, 4 * size - 1], 'N', 'E', undefined, 0);
        // B
        this.buildTp(note, [3 * size - 1, 2 * size], [0, size - 1], 'W', 'E', undefined, size);
        this.buildTp(note, [0, size - 1], [3 * size - 1, 2 * size], 'W', 'E', undefined, 0);
        // C
        this.buildTp(note, [0, size - 1], [size, 2 * size - 1], 'N', 'E', undefined, size);
        this.buildTp(note, [size, 2 * size - 1], [0, size - 1], 'W', 'S', 2 * size, 0);
        // D
        this.buildTp(note, [size, 2 * size - 1], [2 * size, 3 * size - 1], 'E', 'N', size - 1, undefined);
        this.buildTp(note, [2 * size, 3 * size - 1], [size, 2 * size - 1], 'S', 'W', undefined, 2 * size - 1);
        // E
        this.buildTp(note, [size, 2 * size - 1], [3 * size, 4 * size - 1], 'S', 'W', undefined, size - 1);
        this.buildTp(note, [3 * size, 4 * size - 1], [size, 2 * size - 1], 'E', 'N', 3 * size - 1, undefined);
        // F
        this.buildTp(note, [2 * size, 3 * size - 1], [size - 1, 0], 'E', 'W', undefined, 3 * size - 1);
        this.buildTp(note, [size - 1, 0], [2 * size, 3 * size - 1], 'E', 'W', undefined, 2 * size - 1);
        // G
        this.buildTp(note, [2 * size, 3 * size - 1], [0, size - 1], 'N', 'N', 4 * size - 1, undefined);
        this.buildTp(note, [0, size - 1], [2 * size, 3 * size - 1], 'S', 'S', 0, undefined);


        return note;
    }

    async walk(note: Note, r: number, c: number, direction: string, tp: 'tp' | 'tp2'): Promise<number> {
        let cr = note.sr;
        let cc = note.sc;

        for (let ii = 0; ii < note.directions.length; ii++) {
            const instruction = note.directions[ii];
            note.map[cr] = note.map[cr].replaceAt(cc, this.dir[direction]);
            for (let i = 0; i < instruction.amount; i++) {
                cr += this.directions[direction][0];
                cc += this.directions[direction][1];

                let cell = note.map[cr]?.[cc];

                if (cell === undefined || cell === ' ') {
                    const hash = (direction === 'W' || direction === 'E') ? `${cr}${direction}` : `${cc}${direction}`;
                    if (!note[tp][hash].block) {
                        cr = note[tp][hash].r;
                        cc = note[tp][hash].c;

                        if (note[tp][hash].rot !== '') {
                            direction = note[tp][hash].rot;
                        }
                    } else {
                        cr -= this.directions[direction][0];
                        cc -= this.directions[direction][1];
                        break;
                    }
                } else if (cell === '#') {
                    cr -= this.directions[direction][0];
                    cc -= this.directions[direction][1];
                    break;
                }

                note.map[cr] = note.map[cr].replaceAt(cc, this.dir[direction]);
            }

            if (instruction.direction !== '') {
                direction = this.turns[`${direction}${instruction.direction}`];
            }
        }

        return 1000 * (cr + 1) + 4 * (cc + 1) + this.directionScore[direction];
    }

    async run1(note: Input): Promise<Solution> {
        return this.walk(note, note.sr, note.sc, 'E', 'tp');
    }

    async run2(note: Input): Promise<Solution> {
        return this.walk(note, note.sr, note.sc, 'E', 'tp2');
    }
}
