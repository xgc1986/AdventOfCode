"use strict";

// [[https://adventofcode.com/2023/day/22]]
// Input file [[inputs/2023/day22.input.txt]]

import Puzzle from "src/Puzzle";
import {UObject, UString} from "src/Utils";

type Solution = number | string| undefined;

interface Point3D {
    x: number,
    y: number,
    z: number
}

interface Piece {
    from: Point3D,
    to: Point3D,
    id: string
}

type Input = Piece[];

export default class Day22 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const lines = input.split('\n').filter((line) => line !== '');
        let pieces = [];

        let id = 'A';
        for (const line of lines) {
            const parts = line.split('~');
            const [fx, fy, fz] = parts[0].split(',').map(Number);
            const from = {x: fx, y: fy, z: fz};
            const [tx, ty, tz] = parts[1].split(',').map(Number);
            const to = {x: tx, y: ty, z: tz};

            if (from.z > to.z) {
                pieces.push({id, from: to, to: from});
            } else {
                pieces.push({id, from, to});
            }

            id = UString.nextChar(id);
        }

        return pieces;
    }

    getRange(from: number, to: number) {
        let start = from;
        let end = to;
        const ret = [];
        if (from > to) {
            start = to;
            end = from;
        }

        for (let i = start; i <= end; i++) {
            ret.push(i);
        }

        return ret;
    }

    descompose(piece: Piece) {
        const ret = [];
        if (piece.from.x !== piece.to.x) {
            const range = this.getRange(piece.from.x, piece.to.x);
            for (const item of range) {
                ret.push({x: item, y: piece.from.y, z: piece.from.z});
            }
        } else if (piece.from.y !== piece.to.y) {
            const range = this.getRange(piece.from.y, piece.to.y);
            for (const item of range) {
                ret.push({x: piece.from.x, y: item, z: piece.from.z});
            }
        } else {
            const range = this.getRange(piece.from.z, piece.to.z);
            for (const item of range) {
                ret.push({x: piece.from.x, y: piece.from.y, z: item});
            }
        }

        return ret;
    }

    diffZ(lower: Piece, upper: Piece) {
        const lowerPieces = this.descompose(lower);
        const upperPieces = this.descompose(upper);

        const lowerZ = Math.max(lower.from.z, lower.to.z);
        const upperZ = Math.min(upper.from.z, upper.to.z);

        for (const lowerPiece of lowerPieces) {
            for (const upperPiece of upperPieces) {
                if (lowerPiece.x === upperPiece.x && lowerPiece.y === upperPiece.y) {
                    return upperZ - lowerZ;
                }
            }
        }

        return Infinity;
    }

    fall(pieces: Input) {
        for (let i = 0; i < pieces.length; i++) {
            const top = pieces[i];
            let diff = top.from.z + 1;
            for (let j = 0; j < i; j++) {
                const bottom = pieces[j];
                const d = this.diffZ(bottom, top);
                diff = Math.min(diff, d);
            }

            if (diff < Infinity) {
                top.from.z -= (diff - 1);
                top.to.z -= (diff - 1);
            }
        }
    }

    overlaps(lower: Piece, upper: Piece) {
        return this.diffZ(lower, upper) === 1;
    }

    remove(pieces: Input, index: number) {
        let newPieces = [];
        for (let i = 0; i < pieces.length; i++) {
            if (i !== index) {
                newPieces.push(pieces[i]);
            }
        }
        newPieces = UObject.clone(newPieces);

        this.fall(newPieces);
        let total = 0;

        for (const piece of pieces) {
            for (const newPiece of newPieces) {
                if (piece.id === newPiece.id && piece.from.z !== newPiece.from.z) {
                    total++;
                }
            }
        }

        return total;
    }

    async run1(pieces: Input): Promise<Solution> {
        pieces = pieces.sort((a, b) => a.from.z - b.from.z);
        const supports = new Set();
        this.fall(pieces);
        pieces = pieces.sort((a, b) => a.from.z - b.from.z);
        for (let i = pieces.length - 1; i > 0; i--) {
            const upper = pieces[i];
            let found = [];
            for (let j = i - 1; j >= 0; j--) {
                const lower = pieces[j];
                if (this.overlaps(lower, upper)) {
                    found.push(j);
                    if (found.length > 1) {
                        break;
                    }
                }
            }

            if (found.length === 1) {
                supports.add(found[0]);
            }
        }

        return pieces.length - supports.size;
    }

    async run2(pieces: Input): Promise<Solution> {
        let total = 0;
        let index = 0;
        pieces = pieces.sort((a, b) => a.from.z - b.from.z);
        const supports = new Set();
        this.fall(pieces);
        pieces = pieces.sort((a, b) => a.from.z - b.from.z);
        for (let i = pieces.length - 1; i > 0; i--) {
            const upper = pieces[i];
            let found = [];
            for (let j = i - 1; j >= 0; j--) {
                const lower = pieces[j];
                if (this.overlaps(lower, upper)) {
                    found.push(j);
                    if (found.length > 1) {
                        break;
                    }
                }
            }

            if (found.length === 1) {
                if (!supports.has(found[0])) {
                    supports.add(found[0]);
                    index++;
                    const falls = this.remove(pieces, found[0]);
                    total += falls;
                }
            }
        }

        return total;
    }
}