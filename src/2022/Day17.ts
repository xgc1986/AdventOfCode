"use strict";

// [[https://adventofcode.com/2022/day/17]]
// Input file [[inputs/2022/day17.input.txt]]

import Puzzle from "src/Puzzle.ts";
import {UMap, UMath} from "src/Utils.ts";

type Solution = number | undefined;

type Input = string;

export default class Day17 extends Puzzle<Input> {

    private readonly PIECES: string[][] = [
        [
            '@@@@'
        ],
        [
            '.@.',
            '@@@',
            '.@.'
        ],
        [
            '@@@',
            '..@',
            '..@'
        ],
        [
            '@',
            '@',
            '@',
            '@',
        ],
        [
            '@@',
            '@@',
        ]
    ];

    parseInput(input: string): Input {
        return input;
    }

    async run1(movements: Input): Promise<Solution> {
        const platform: string[][] = []

        return await this.play(platform, movements, 2_022);
    }

    async run2(movements: Input): Promise<Solution> {
        const platform: string[][] = []
        return await this.play(platform, movements, 1_000_000_000_000);
    }

    private createHash(platform: string[][], p: number, score: number, turn: number): string | undefined {
        let firstValue = undefined;
        let hash = `${p}[${turn}]`;

        for (let col = 0; col < platform[0].length; col++) {
            for (let row = score; score >= 0; row--) {
                if (platform[row][col] !== '#' && row === 0) {
                    return undefined;
                }

                if (platform[row][col] === '#') {
                    if (firstValue === undefined) {
                        firstValue = row;
                    } else {
                        hash += `-${row - firstValue}`;
                    }
                    break
                }
            }
        }

        return hash;
    }

    private addPiece(platform: string[][], p: number, score = 0) {
        const piece = this.PIECES[p];
        const extraRows = piece.length + (3 - (platform.length - score));
        for (let i = 0; i < extraRows; i++) {
            platform.push((new Array(7)).fill('.'));
        }

        let rowOffset = 0;
        if (extraRows < 0) {
            rowOffset = -extraRows;
        }
        for (let row = 0; row < piece.length; row++) {
            for (let col = 0; col < piece[row].length; col++) {
                platform[platform.length - piece.length + row - rowOffset][col + 2] = piece[row][col];
            }
        }

        return platform.length - 1 - rowOffset;
    }

    private placePiece(platform: string[][], p: number, row: number, col: number) {
        const piece = this.PIECES[p];
        for (let r = 0; r < piece.length; r++) {
            for (let c = 0; c < piece[r].length; c++) {
                if (piece[r][c] === '@') {
                    platform[row + r - piece.length + 1][col + c] = '#';
                }
            }
        }
    }

    private movePieceTo(platform: string[][], p: number, row: number, col: number): void {
        const piece = this.PIECES[p];
        for (let r = 0; r < piece.length; r++) {
            for (let c = 0; c < piece[r].length; c++) {
                if (piece[r][c] === '@') {
                    platform[row + r - piece.length + 1][col + c] = '@';
                }
            }
        }
    }

    private canMovePieceTo(platform: string[][], p: number, row: number, col: number): boolean {
        const piece = this.PIECES[p];
        if ((row - piece.length + 1) < 0) {
            return false;
        }

        if (col < 0 || col + piece[0].length > platform[0].length) {
            return false;
        }

        for (let r = 0; r < piece.length; r++) {
            for (let c = 0; c < piece[r].length; c++) {
                if (platform[row + r - piece.length + 1][col + c] === '#' && piece[r][c] === '@') {
                    return false;
                }
            }
        }

        return true;
    }

    private removePiece(platform: string[][], p: number, row: number, col: number): void {
        const piece = this.PIECES[p];
        for (let r = 0; r < piece.length; r++) {
            for (let c = 0; c < piece[r].length; c++) {
                if (piece[r][c] === '@') {
                    platform[row + r - piece.length + 1][col + c] = '.';
                }
            }
        }
    }

    private async play(platform: string[][], movements: string, maxPieces: number): Promise<number> {
        const cache: UMap<{score: number, pieces: number}> = {};
        let score = 0;
        let p = 0;
        let piece = this.PIECES[p];
        let turn = 0;
        this.addPiece(platform, p, 0);
        let row = platform.length - 1;
        let col = 2;
        let placedPieces = 0;
        let foundCycle = false;
        let extraScore = 0;

        while (true) {
            const move = movements[turn % movements.length];

            if (move === '<' && this.canMovePieceTo(platform, p, row, col - 1)) {
                this.removePiece(platform, p, row, col);
                col--;
                this.movePieceTo(platform, p, row, col);
            } else if (move === '>' && this.canMovePieceTo(platform, p, row, col + 1)) {
                this.removePiece(platform, p, row, col);
                col++;
                this.movePieceTo(platform, p, row, col);
            }

            if (this.canMovePieceTo(platform, p, row - 1, col)) {
                this.removePiece(platform, p, row, col);
                row--;
                this.movePieceTo(platform, p, row, col);
            } else {
                this.placePiece(platform, p, row, col);
                score = Math.max(score, row + 1)
                p = (p + 1) % this.PIECES.length;
                piece = this.PIECES[p];
                placedPieces++;
                if (placedPieces === maxPieces) {
                    break;
                }

                if (!foundCycle) {
                    const hash = this.createHash(platform, p, score, turn);
                    if (hash !== undefined) {

                        if (cache[hash] !== undefined) {
                            const info = UMath.advanceCycles(cache[hash].pieces, placedPieces, maxPieces);
                            placedPieces = info.iteration;
                            extraScore = (score - cache[hash].score) * info.cycles;
                            foundCycle = true;
                        } else {
                            cache[hash] = {score, pieces: placedPieces};
                        }
                    }
                }
                row = this.addPiece(platform, p, score);
                col = 2;
            }

            turn = (turn + 1) % movements.length;
        }

        return score + extraScore;
    }
}
