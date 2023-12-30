"use strict";

// [[https://adventofcode.com/2015/day/14]]
// Input file [[inputs/2015/day14.input.txt]]

import Puzzle from "src/Puzzle.ts";

type Solution = number | undefined;

interface Deer {
    name: string;
    speed: number;
    duration: number;
    rest: number;
}

interface Score {
    points: number;
    distance: number;
}

type Input = Deer[];

export default class Day14 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input.split('\n').map((line) => {
            const [_, name, speed, duration, rest] = line.match(/(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./) || ['', '', '', '', ''];
            return {name, speed: +speed, duration: +duration, rest: +rest};
        });
    }

    race(deers: Deer[], time: number): Score {
        let score = 0;
        let points = [];
        let bestDistance = 0;

        for (let i = 1; i <= time; i++) {
            const time = i;
            let distances = [];
            bestDistance = 0;

            for (let j = 0; j < deers.length; j++) {
                const deer = deers[j];
                if (points[j] === undefined) {
                    points[j] = 0;
                }

                const speed = deer.speed;
                const flyTime = deer.duration;
                const restTime = deer.rest;
                const timePerFlight = flyTime + restTime;
                const remainingTime = time % timePerFlight;
                const fullFlights = Math.floor(time / timePerFlight);
                const fullDistance = speed * fullFlights * flyTime + speed * Math.min(flyTime, remainingTime);
                const distanceDone = Math.max(fullDistance, score);
                distances[j] = distanceDone;
                bestDistance = Math.max(bestDistance, distanceDone);
            }

            for (let j = 0; j < deers.length; j++) {
                if (distances[j] === bestDistance) {
                    points[j]++;
                }
            }
        }

        return {
            points: Math.max(...points),
            distance: bestDistance,
        };
    }

    async run1(deers: Input): Promise<Solution> {
        return this.race(deers, 2503).distance;
    }

    async run2(deers: Input): Promise<Solution> {
        return this.race(deers, 2503).points;
    }
}