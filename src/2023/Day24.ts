"use strict";

// https://adventofcode.com/2023/day/24
// Input file [[inputs/2023/day24.input.txt]]

import Puzzle from "src/Puzzle.ts";
import {UNumber} from "src/Utils.ts";
import {Line3D, Point3D, Vector3D} from "src/Algebra.ts";

type Input = Line3D[];

export default class Day24 extends Puzzle<Input> {

    async onStart(): Promise<void> {
        await super.onStart();
        await this.loadZ3();
    }

    parseInput(input: string): Input {
        const ret: Input = [];

        input.split('\n').filter((line) => line !== '').forEach((line) => {
            const matches = line.match(/-?\d+/g);

            if (matches === null) {
                return;
            }

            const [x, y, z, vx, vy, vz] = matches.map(Number);

            ret.push(Line3D.fromVector(new Point3D(x, y, z), new Vector3D(vx, vy, vz)));
        });

        return ret;
    }

    async run1(input: Input): Promise<number> {
        let total = 0;

        const constraints = this.mode === 'input'
            ? {min: 200000000000000, max: 400000000000000}
            : {min: 7, max: 27};

        for (let i = 0; i < input.length; i++) {
            const hA = input[i];
            const hA2D = hA.convertTo2D('z');
            for (let j = i + 1; j < input.length; j++) {
                const hB = input[j];
                const hB2D = hB.convertTo2D('z');
                const intersection = hA2D.intersection(hB2D);

                if (intersection !== null) {
                    if (
                        UNumber.between(intersection.point.x, constraints.min, constraints.max)
                        && UNumber.between(intersection.point.y, constraints.min, constraints.max)
                        && intersection.t1 >= 0
                        && intersection.t2 >= 0
                    ) {
                        total++;
                    }
                }
            }
        }

        return total;
    }

    async run2(input: Input): Promise<number> {
        const Z3 = await this.loadZ3();
        const solver = new Z3.Solver();

        const x = Z3.Int.const('x');
        const y = Z3.Int.const('y');
        const z = Z3.Int.const('z');
        const vx = Z3.Int.const('vx');
        const vy = Z3.Int.const('vy');
        const vz = Z3.Int.const('vz');
        const t1 = Z3.Int.const('t1');
        const t2 = Z3.Int.const('t2');
        const t3 = Z3.Int.const('t3');

        solver.add(t1.ge(0).and(t2.ge(0)).and(t3.ge(0)));
        solver.add(x.add(vx.mul(t1)).eq(t1.mul(input[0].vector.x).add(input[0].point.x)));
        solver.add(y.add(vy.mul(t1)).eq(t1.mul(input[0].vector.y).add(input[0].point.y)));
        solver.add(z.add(vz.mul(t1)).eq(t1.mul(input[0].vector.z).add(input[0].point.z)));
        solver.add(x.add(vx.mul(t2)).eq(t2.mul(input[1].vector.x).add(input[1].point.x)));
        solver.add(y.add(vy.mul(t2)).eq(t2.mul(input[1].vector.y).add(input[1].point.y)));
        solver.add(z.add(vz.mul(t2)).eq(t2.mul(input[1].vector.z).add(input[1].point.z)));
        solver.add(x.add(vx.mul(t3)).eq(t3.mul(input[2].vector.x).add(input[2].point.x)));
        solver.add(y.add(vy.mul(t3)).eq(t3.mul(input[2].vector.y).add(input[2].point.y)));
        solver.add(z.add(vz.mul(t3)).eq(t3.mul(input[2].vector.z).add(input[2].point.z)));

        await solver.check();
        const model = solver.model();

        const resX = UNumber.parseInt(model.get(x));
        const resY = UNumber.parseInt(model.get(y));
        const resZ = UNumber.parseInt(model.get(z));

        return resX + resY + resZ;
    }
}