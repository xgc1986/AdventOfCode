"use strict";

// [[https://adventofcode.com/2022/day/18]]
// Input file [[inputs/2022/day18.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Material = 'air' | 'water' | 'stone' | 'void';

class Cube {
    constructor(
        public mat: Material,
        public readonly x: number,
        public readonly y: number,
        public readonly z: number
    ) {
    }

    static fromStringArray(data: string[], material: Material): Cube {
        return new Cube(material, +data[0], +data[1], +data[2]);
    }

    get m(): string {
        if (this.mat === 'air') {
            return '.';
        }

        if (this.mat === 'stone') {
            return '#';
        }

        if (this.mat === 'water') {
            return '~';
        }

        return ' ';
    }
}

interface World {
    stones: Cube[];
    world: Cube[][][];
}

type Input = World;

export default class Day18 extends Puzzle<Input> {

    private readonly directions = [
        [1, 0, 0],
        [-1, 0, 0],
        [0, 1, 0],
        [0, -1, 0],
        [0, 0, 1],
        [0, 0, -1]
    ]

    parseInput(input: string): Input {
        const stones = input.split('\n').map(line => Cube.fromStringArray(line.split(','), 'stone'));

        const maxX = Math.max(...stones.map(c => c.x));
        const maxY = Math.max(...stones.map(c => c.y));
        const maxZ = Math.max(...stones.map(c => c.z));

        const world: Cube[][][] = [];

        for (let height = 0; height <= maxZ; height++) {
            for (let row = 0; row <= maxY; row++) {
                for (let col = 0; col <= maxX; col++) {
                    world[height] = world[height] || [];
                    world[height][row] = world[height][row] || [];
                    world[height][row][col] = new Cube('air', col, row, height);
                }
            }
        }

        for (const cube of stones) {
            world[cube.z][cube.y][cube.x] = cube;
        }

        return {
            stones,
            world
        }
    }

    async run1(chunk: Input): Promise<Solution> {
        const cubes = chunk.stones;
        const world = chunk.world;

        let sum = 0;
        for (const cubeA of cubes) {
            if (cubeA.mat !== 'stone') {
                continue;
            }

            let freeFaces = 0;

            for (const direction of this.directions) {
                let mat = this.getMaterial(world, cubeA.x + direction[0], cubeA.y + direction[1], cubeA.z + direction[2]);
                if (mat === 'air' || mat === 'void') {
                    freeFaces++;
                }
            }

            sum += freeFaces;
        }

        return sum;
    }

    async run2(chunk: Input): Promise<Solution> {
        const cubes = chunk.stones;
        const world = chunk.world;

        const queue: Cube[] = [];

        for (let h = 0; h < world.length; h++) {
            for (let r = 0; r < world[h].length; r++) {
                for (let c = 0; c < world[h][r].length; c++) {
                    if (
                        world[h][r][c].mat === 'air' &&
                        (
                            h === 0 || h === world.length - 1 ||
                            r === 0 || r === world[h].length - 1 ||
                            c === 0 || c === world[h][r].length - 1
                        )
                    ) {
                        world[h][r][c].mat = 'water';
                        queue.push(world[h][r][c]);
                    }
                }
            }
        }

        while (queue.length) {
            const cube = queue.pop() as Cube;

            for (const direction of this.directions) {
                const x = cube.x + direction[0];
                const y = cube.y + direction[1];
                const z = cube.z + direction[2];

                if (this.canGoTo(world, x, y, z)) {
                    const cube = world[z][y][x];
                    cube.mat = 'water';
                    queue.push(cube);
                }
            }
        }

        let sum = 0;
        for (const cubeA of cubes) {
            if (cubeA.mat !== 'stone') {
                continue;
            }

            let freeFaces = 0;

            for (const direction of this.directions) {
                let mat = this.getMaterial(world, cubeA.x + direction[0], cubeA.y + direction[1], cubeA.z + direction[2]);
                if (mat === 'water' || mat === 'void') {
                    freeFaces++;
                }
            }

            sum += freeFaces;
        }

        return sum;
    }

    private canGoTo(world: Cube[][][], x: number, y: number, z: number): boolean {
        return this.getMaterial(world, x, y, z) === 'air';
    }

    private getMaterial(world: Cube[][][], x: number, y: number, z: number): Material {
        if (
            z.between(0, world.length - 1)
            && y.between(0, world[z].length - 1)
            && x.between(0, world[z][y].length - 1)
        ) {
            return world[z][y][x].mat;
        }

        return 'void';
    }
}

// 2514 -