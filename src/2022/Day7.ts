"use strict";

// [[https://adventofcode.com/2022/day/7]]
// Input file [[inputs/2022/day7.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | undefined;

type Input = string[];

export default class Day7 extends Puzzle<Input> {

    private readonly THRESHOLD = 100_000;

    parseInput(input: string): Input {
        return input.split('\n');
    }

    private instruction: number = 0;
    private minSize: number = Infinity;

    checkDisk(commands: string[], disk: any, deep: number): {size: number, deleted: number} {
        if (this.instruction === commands.length) {
            return {size: 0, deleted: 0};
        }

        while (this.instruction < commands.length) {
            if (commands[this.instruction].startsWith('$ cd')) {
                if (commands[this.instruction] === '$ cd ..') {
                    this.instruction++;
                    if (disk._size <= this.THRESHOLD) {
                        return {size: disk._size, deleted: disk._deleted + disk._size};
                    } else {
                        return {size: disk._size, deleted: disk._deleted};
                    }
                } else {
                    const folder = commands[this.instruction].split(' ')[2];
                    this.instruction++;
                    const res = this.checkDisk(commands, disk[folder], deep + 2);

                    disk[folder]._size = res.size;
                    disk[folder]._deleted = res.deleted;

                    disk._size += res.size;
                    disk._deleted += res.deleted;
                }
            } else if (commands[this.instruction] === '$ ls') {
                this.instruction++;
            } else {
                const parts = commands[this.instruction].split(' ');
                if (parts[0] !== 'dir') {
                    disk[parts[1]] = {
                        _type: 'file',
                        _name: parts[1],
                        _size: parseInt(parts[0]),
                        _deleted: 0
                    };
                    disk._size += parseInt(parts[0]);
                } else if (disk[parts[1]] === undefined) {
                    disk[parts[1]] = {_type: 'folder', _name: parts[1], _size: 0, _deleted: 0};
                }

                this.instruction++;
            }
        }

        if (disk._size <= this.THRESHOLD) {
            return {size: disk._size, deleted: disk._deleted + disk._size};
        } else {
            return {size: disk._size, deleted: disk._deleted};
        }
    }

    smallestSize(disk: any, requirement: number): number {
        for (const x in disk) {
            if (x.startsWith('_')) {
                continue;
            }

            const item = disk[x];
            if (item._type === 'folder') {
                if (item._size >= requirement && item._size < this.minSize) {
                    this.minSize = item._size;
                }
                this.smallestSize(disk[x], requirement);
            }
        }

        return this.minSize;
    }


    async run1(commands: Input): Promise<Solution> {
        const disk = {
            '/': {_type: 'folder', _name: '/', _size: 0, _deleted: 0},
            _name: 'root',
            _size: 0,
            _deleted: 0,
        };

        let total = this.checkDisk(commands, disk, 0);

        if (total.size <= this.THRESHOLD) {
            return total.size + total.deleted;
        } else {
            return total.deleted;
        }
    }


    async run2(commands: Input): Promise<Solution> {
        this.instruction = 0;
        const disk = {
            '/': {_type: 'folder', _name: '/', _size: 0, _deleted: 0},
            _name: 'root',
            _size: 0,
            _deleted: 0,
        };

        const res = this.checkDisk(commands, disk, 0);
        const requirement = 30000000 - (70000000 - res.size);

        return this.smallestSize(disk, requirement);
    }
}