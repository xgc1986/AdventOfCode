import {UMap} from "src/Utils";

export default interface Graph {
    get vertices(): Vertex[];
    get size(): number;
    clone(): Graph;
    optVertex(id: string): Vertex | undefined;
    getVertex(id: string): Vertex;
    addVertex(id: string): Vertex;
    addEdge(from: string | Vertex, to: string | Vertex, weight: number): void;
    removeVertex(vertex: string | Vertex): void;
    removeEdge(from: string | Vertex, to: string | Vertex): void;
    separate(): Graph[];
    dotString(withWeight: boolean): string;
}

export class DirectedGraph implements Graph {

    private readonly data: UMap<Vertex>;

    constructor(graph: Graph | undefined = undefined) {
        this.data = {};

        if (graph !== undefined) {
            for (const node of graph.vertices) {
                for (const edge of node.edges) {
                    this.addEdge(node.id, edge.vertex.id, edge.weight);
                }
            }
        }
    }

    get vertices(): Vertex[] {
        return Object.values(this.data);
    }

    get size(): number {
        return this.vertices.length;
    }

    clone(): DirectedGraph {
        return new DirectedGraph(this);
    }

    optVertex(id: string): Vertex | undefined {
        return this.data[id];
    }

    getVertex(id: string): Vertex {
        return this.data[id];
    }

    addVertex(id: string): Vertex {
        if (this.data[id] === undefined) {
            this.data[id] = new Vertex(id);
        }
        return this.data[id];
    }

    addEdge(from: string | Vertex, to: string | Vertex, weight: number): void {
        if (typeof from === 'string') {
            from = this.addVertex(from);
        }

        if (typeof to === 'string') {
            to = this.addVertex(to);
        }

        from.addEdge(to, weight);
    }

    removeVertex(vertex: string | Vertex): void {
        const v = typeof vertex === 'string' ? this.optVertex(vertex) : vertex;

        if (v === undefined) {
            return;
        }

        delete this.data[v.id];

        for (const node of this.vertices) {
            node.removeEdge(v);
        }
    }

    removeEdge(from: string | Vertex, to: string | Vertex): void {
        const f = typeof from === 'string' ? this.optVertex(from) : from;
        const t = typeof to === 'string' ? this.optVertex(to) : to;

        if (f !== undefined && t !== undefined) {
            f.removeEdge(t);
        }
    }

    separate(): DirectedGraph[] {
        if (this.size === 0) {
            return [this.clone()];
        }

        const visited: UMap<boolean> = {};

        const ret = [];

        while (Object.keys(visited).length < this.size) {
            const queue: Vertex[] = [];
            const v = this.vertices.find((v) => visited[v.id] === undefined);
            if (v === undefined) {
                break;
            }
            const graph = new DirectedGraph();
            ret.push(graph);

            queue.push(v);
            while (queue.length > 0) {
                const vertex = queue.shift() as Vertex;
                if (visited[vertex.id]) {
                    continue;
                }
                visited[vertex.id] = true;
                graph.addVertex(vertex.id);

                for (const edge of vertex.edges) {
                    if (visited[edge.vertex.id] === undefined) {
                        queue.push(edge.vertex);
                        graph.addEdge(vertex.id, edge.vertex.id, edge.weight);
                    }
                }
            }
        }

        return ret;
    }

    toString(): string {
        let lines = '';
        for (const vertex of this.vertices) {
            lines += `${vertex}\n`;
        }

        return lines;
    }

    dotString(withWeight: boolean = false): string {
        let lines = 'digraph {\n';
        for (const vertex of this.vertices) {
            for (const edge of vertex.edges) {
                lines += `    ${vertex.id} -> ${edge.vertex.id}`;
                if (withWeight) {
                    lines += ` [label="${edge.weight}"]`;
                }
                lines += '\n';
            }
        }

        return lines + '}';
    }
}

export class UndirectedGraph implements Graph {

    private readonly data: UMap<Vertex>;

    constructor(graph: Graph | undefined = undefined) {
        this.data = {};

        if (graph !== undefined) {
            for (const node of graph.vertices) {
                for (const edge of node.edges) {
                    this.addEdge(node.id, edge.vertex.id, edge.weight);
                }
            }
        }
    }

    get vertices(): Vertex[] {
        return Object.values(this.data);
    }

    get size(): number {
        return this.vertices.length;
    }

    clone(): UndirectedGraph {
        return new UndirectedGraph(this);
    }

    optVertex(id: string): Vertex | undefined {
        return this.data[id];
    }

    getVertex(id: string): Vertex {
        return this.data[id];
    }

    addVertex(id: string): Vertex {
        if (this.data[id] === undefined) {
            this.data[id] = new Vertex(id);
        }
        return this.data[id];
    }

    addEdge(from: string | Vertex, to: string | Vertex, weight: number): void {
        if (typeof from === 'string') {
            from = this.addVertex(from);
        }

        if (typeof to === 'string') {
            to = this.addVertex(to);
        }

        to.addEdge(from, weight)
        from.addEdge(to, weight);
    }

    removeVertex(vertex: string | Vertex): void {
        const v = typeof vertex === 'string' ? this.optVertex(vertex) : vertex;

        if (v === undefined) {
            return;
        }

        delete this.data[v.id];

        for (const node of this.vertices) {
            node.removeEdge(v);
        }
    }

    removeEdge(from: string | Vertex, to: string | Vertex): void {
        const f = typeof from === 'string' ? this.optVertex(from) : from;
        const t = typeof to === 'string' ? this.optVertex(to) : to;

        if (f !== undefined && t !== undefined) {
            f.removeEdge(t);
            t.removeEdge(f);
        }
    }

    separate(): UndirectedGraph[] {
        if (this.size === 0) {
            return [this.clone()];
        }

        const visited: UMap<boolean> = {};

        const ret = [];

        while (Object.keys(visited).length < this.size) {
            const queue: Vertex[] = [];
            const v = this.vertices.find((v) => visited[v.id] === undefined);
            if (v === undefined) {
                break;
            }
            const graph = new UndirectedGraph();
            ret.push(graph);

            queue.push(v);
            while (queue.length > 0) {
                const vertex = queue.shift() as Vertex;
                if (visited[vertex.id]) {
                    continue;
                }
                visited[vertex.id] = true;
                graph.addVertex(vertex.id);

                for (const edge of vertex.edges) {
                    if (visited[edge.vertex.id] === undefined) {
                        queue.push(edge.vertex);
                        graph.addEdge(vertex.id, edge.vertex.id, edge.weight);
                    }
                }
            }
        }

        return ret;
    }

    toString(): string {
        let lines = '';
        for (const vertex of this.vertices) {
            lines += `${vertex}\n`;
        }

        return lines;
    }

    dotString(withWeight: boolean = false): string {
        const visited: UMap<boolean> = {};

        let lines = 'graph {\n';
        lines += '    edge [dir=none];\n';
        for (const vertex of this.vertices) {
            for (const edge of vertex.edges) {
                const hash = `${vertex.id}-${edge.vertex.id}`;
                const hash2 = `${edge.vertex.id}-${vertex.id}`;
                if (visited[hash] !== undefined || visited[hash2] !== undefined) {
                    continue;
                }
                visited[hash] = true;
                visited[hash2] = true;
                lines += `    ${vertex.id} -- ${edge.vertex.id}`;
                if (withWeight) {
                    lines += ` [label=${edge.weight}]`;
                }
                lines += ';\n';
            }
        }

        return lines + '}';
    }

    transformToDirectedGraph(): DirectedGraph {
        return new DirectedGraph(this);
    }
}

export class Vertex {
    private readonly _edges: UMap<Edge>;
    private readonly _origins: UMap<Vertex>;

    constructor(
        public readonly id: string
    ) {
        this._edges = {};
        this._origins = {};
    }

    get edges(): Edge[] {
        return Object.values(this._edges);
    }

    addEdge(vertex: Vertex, weight: number): Edge {
        this._edges[vertex.id] = new Edge(vertex, weight);
        vertex._origins[vertex.id] = this;

        return this._edges[vertex.id];
    }

    removeEdge(vertex: Vertex): void {
        delete vertex._origins[this.id];
        delete this._edges[vertex.id];
    }

    getEdge(vertex: Vertex): Edge | undefined {
        return this._edges[vertex.id];
    }

    toString(): string {
        const ret =  `${this.id} -> `;
        const e = [];
        for (const edge of this.edges) {
            e.push(edge.toString());
        }

        return ret + e.join(', ');
    }
}

export class Edge {
    constructor(
        public readonly vertex: Vertex,
        public readonly weight: number
    ) {}

    toString() {
        return `${this.vertex.id}(${this.weight})`;
    }
}