"use strict";

// [[https://adventofcode.com/2015/day/9]]
// Input file [[inputs/2015/day9.input.txt]]

import Puzzle from "src/Puzzle";
import Graph, {DirectedGraph, Vertex} from "src/Graph";
import {UMap} from "src/Utils";

type Solution = number | undefined;

type Input = Graph;

export default class Day9 extends Puzzle<Input> {

    parseInput(input: string): Input {
        const graph = new DirectedGraph();
        const start = graph.addVertex('start');

        input.split('\n').forEach(line => {
            const [from, _, to, __, distance] = line.split(' ');
            graph.addEdge(start, from, 0);
            graph.addEdge(start, to, 0);
            graph.addEdge(from, to, +distance);
            graph.addEdge(to, from, +distance);
        });

        return graph;
    }

    getMinimumDistance(flights: Graph, city: Vertex | undefined = undefined, visited: UMap<boolean> = {}, distance: number = 0): number {
        city = city ?? flights.getVertex('start');

        if (Object.values(visited).length === flights.size - 1) {
            return distance;
        }

        visited[city.id] = true;

        let minimumScore = Infinity;

        for (const flight of city.edges) {
            if (!visited[flight.vertex.id]) {
                minimumScore = Math.min(minimumScore, this.getMinimumDistance(flights, flight.vertex, visited, distance + flight.weight));
            }
        }

        delete visited[city.id];

        return minimumScore;
    }

    getMaximumDistance(flights: Graph, city: Vertex | undefined = undefined, visited: UMap<boolean> = {}, distance: number = 0): number {
        city = city ?? flights.getVertex('start');

        if (Object.values(visited).length === flights.size - 1) {
            return distance;
        }

        visited[city.id] = true;

        let maximumScore = 0;

        for (const flight of city.edges) {
            if (!visited[flight.vertex.id]) {
                maximumScore = Math.max(maximumScore, this.getMaximumDistance(flights, flight.vertex, visited, distance + flight.weight));
            }
        }

        delete visited[city.id];

        return maximumScore;
    }

    async run1(flights: Input): Promise<Solution> {
        return this.getMinimumDistance(flights);
    }

    async run2(flights: Input): Promise<Solution> {
        return this.getMaximumDistance(flights);
    }
}