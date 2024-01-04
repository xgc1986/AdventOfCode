interface Intersection2D {
    point: Point2D;
    t1: number;
    t2: number;
}

export class Point2D {
    constructor(
        public readonly x: number,
        public readonly y: number
    ) {
    }

    vectorTo(p: Point2D): Vector2D {
        return new Vector2D(p.x - this.x, p.y - this.y);
    }
}

export class Point3D {
    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly z: number,
    ) {
    }

    vectorTo(p: Point3D): Vector3D {
        return new Vector3D(p.x - this.x, p.y - this.y, p.z - this.z);
    }

    convertTo2D(axis: 'x'|'y'|'z'): Point2D {
        switch (axis) {
            case 'x':
                return new Point2D(this.y, this.z);
            case 'y':
                return new Point2D(this.x, this.z);
            case 'z':
                return new Point2D(this.x, this.y);
        }
    }
}

export class Vector2D {

    constructor(
        public readonly x: number,
        public readonly y: number
    ) {
    }

    isParallel(v: Vector2D): boolean {
        return this.x * v.y === this.y * v.x;
    }
}

export class Vector3D {

    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly z: number,
    ) {
    }

    isParallel(v: Vector3D): boolean {
        return (this.x / v.x === this.y * v.y) && (this.y / v.y === this.z / v.z)
    }

    convertTo2D(axis: 'x'|'y'|'z'): Vector2D {
        switch (axis) {
            case 'x':
                return new Vector2D(this.y, this.z);
            case 'y':
                return new Vector2D(this.x, this.z);
            case 'z':
                return new Vector2D(this.x, this.y);
        }
    }
}

export class Line2D {

    private constructor(
        public readonly point: Point2D,
        public readonly vector: Vector2D
    ) {
    }

    static fromVector(p: Point2D, v: Vector2D): Line2D {
        return new Line2D(p, v);
    }

    static fromPoints(from: Point2D, to: Point2D): Line2D {
        return new Line2D(from, from.vectorTo(to));
    }

    private t(p: Point2D): number | null {
        return  (p.x - this.point.x) / this.vector.x;
    }

    pointAt(t: number): Point2D {
        return new Point2D(this.point.x + this.vector.x * t, this.point.y + this.vector.y * t);
    }

    isParallel(line: Line2D): boolean {
        return this.vector.isParallel(line.vector);
    }

    intersection(line: Line2D): Intersection2D | null {

        if (this.isParallel(line)) {
            return null;
        }

        const eq1 = this.equation();
        const eq2 = line.equation();

        const result = new Matrix([
            [eq1.n], // x
            [eq2.n]  // y
        ]);

        const matrix = new Matrix([
            [-eq1.m, 1],
            [-eq2.m, 1]
        ]);

        const inverse = matrix.inverse();
        const solution = inverse.product(result);

        const x = solution.valueAt(0, 0);
        const y = solution.valueAt(0, 1);

        const point = new Point2D(x, y)
        return {
            point,
            t1: this.t(point) ?? 0,
            t2: line.t(point) ?? -1,
        };
    }

    toParametric(): string {
        return `x = ${this.vector.x} + ${this.point.x} * t\ny =  ${this.point.y} + ${this.vector.y} * t`;
    }

    toEquation(): string {
        const eq = this.equation();
        return `y = ${eq.n} + ${eq.m} * x`;
    }

    equation(): { m: number, n: number } {
        return {
            m: this.vector.y / this.vector.x,
            n: this.point.y - this.point.x * this.vector.y / this.vector.x
        };

    }
}

export class Line3D {

    private constructor(
        public readonly point: Point3D,
        public readonly vector: Vector3D
    ) {
    }

    static fromVector(p: Point3D, v: Vector3D): Line3D {
        return new Line3D(p, v);
    }

    static fromPoints(from: Point3D, to: Point3D): Line3D {
        return new Line3D(from, from.vectorTo(to));
    }

    convertTo2D(axis: 'x'|'y'|'z'): Line2D {
        switch (axis) {
            case 'x':
                return Line2D.fromVector(this.point.convertTo2D(axis), this.vector.convertTo2D(axis));
            case 'y':
                return Line2D.fromVector(this.point.convertTo2D(axis), this.vector.convertTo2D(axis));
            case 'z':
                return Line2D.fromVector(this.point.convertTo2D(axis), this.vector.convertTo2D(axis));
        }
    }
}

export class Matrix {

    private readonly value: number[][];

    /**
     * @param {number[][]} input
     */
    constructor(input: number[][]) {
        if (input.length === 0) {
            throw new Error('Empty matrix');
        }

        const length = input[0].length;
        for (const row of input) {
            if (row.length !== length) {
                throw new Error('Invalid matrix');
            }
        }

        this.value = input;
    }

    valueAt(x: number, y: number): number {
        return this.value[y][x];
    }

    /**
     * @returns {number}
     */
    calculate(): number {
        if (!this.isSquare()) {
            throw new Error('Not a square matrix');
        }

        if (this.value.length === 1) {
            return this.value[0][0];
        }

        if (this.value.length === 2) {
            return this.value[0][0] * this.value[1][1] - this.value[0][1] * this.value[1][0];
        }

        let sum = 0;

        for (let i = 0; i < this.value.length; i++) {
            let prod = 1;
            for (let j = 0; j < this.value.length; j++) {
                prod *= this.value[j][(j + i) % this.value.length];
            }
            sum += prod;
        }

        for (let i = 0; i < this.value.length; i++) {
            let prod = 1;
            for (let j = 0; j < this.value.length; j++) {
                let row = j;
                let col = (2 * this.value.length - i - j) % this.value.length;

                prod *= this.value[row][col];
            }
            sum -= prod;
        }

        return sum;
    }

    /**
     * @returns {boolean}
     */
    isSquare(): boolean {
        return this.value.length === this.value[0].length;
    }

    /**
     * @returns {Matrix}
     */
    cofactor(): Matrix {
        const result = [];
        for (let i = 0; i < this.value.length; i++) {
            result.push();
            const row = [];

            for (let j = 0; j < this.value.length; j++) {
                row.push(this.minor(i, j).calculate() * ((i + j) % 2 === 0 ? 1 : -1));
            }

            result.push(row);
        }

        return new Matrix(result);
    }

    /**
     * @param {number} row
     * @param {number} column
     * @returns {Matrix}
     */
    minor(row: number, column: number): Matrix {
        const ret = [];
        for (let i = 0; i < this.value.length; i++) {
            if (i === row) {
                continue;
            }

            const r = [];
            for (let j = 0; j < this.value.length; j++) {
                if (j === column) {
                    continue;
                }

                r.push(this.value[i][j]);
            }

            ret.push(r);
        }

        return new Matrix(ret);
    }

    transpose() {
        const ret = [];
        for (let i = 0; i < this.value.length; i++) {
            const row = [];
            for (let j = 0; j < this.value.length; j++) {
                row.push(this.value[j][i]);
            }

            ret.push(row);
        }

        return new Matrix(ret);
    }

    /**
     * @param {number} n
     * @returns {Matrix}
     */
    multiply(n: number): Matrix {
        const ret = [];
        for (let i = 0; i < this.value.length; i++) {
            const row = [];
            for (let j = 0; j < this.value.length; j++) {
                row.push(this.value[i][j] * n);
            }

            ret.push(row);
        }

        return new Matrix(ret);
    }


    inverse(): Matrix {
        let det = 0;
        for (let i = 0; i < this.value.length; i++) {
            det += this.value[0][i] * this.minor(0, i).calculate() * ((i % 2 === 0) ? 1 : -1);
        }

        return this.cofactor().transpose().multiply(1 / det);
    }

    /**
     * @param {Matrix} matrix
     */
    product(matrix: Matrix): Matrix {
        if (this.value[0].length !== matrix.value.length) {
            throw new Error('Cannot multiply matrices');
        }

        const ret = [];
        for (let i = 0; i < this.value.length; i++) {
            const row = [];
            for (let j = 0; j < matrix.value[0].length; j++) {
                let sum = 0;
                for (let k = 0; k < this.value[0].length; k++) {
                    sum += this.value[i][k] * matrix.value[k][j];
                }

                row.push(sum);
            }

            ret.push(row);
        }

        return new Matrix(ret);
    }

    toArray(): number[][] {
        return this.value.copy();
    }
}

