"use strict";

// [[https://adventofcode.com/2024/day/3]]
// Input file [[inputs/2024/day3.input.txt]]

import Puzzle from "src/Puzzle";

type Solution = number | undefined;

type Input = string;

const DO: string = "do()";
const DONT: string = "don't()";
const MUL_START: string = "mul(";
const MUL_END: string = ')';
const MUL_MIDDLE: string = ',';

export default class Day3 extends Puzzle<Input> {

    parseInput(input: string): Input {
        return input;
    }

    async run1(data: Input): Promise<Solution> {
        let total = 0;
        const lineRegex = new RegExp(`mul\\((\\d{1,3}),(\\d{1,3})\\)`, 'g');
        let matches = data.matchAll(lineRegex);

        for (let match of matches) {
            let temp = match[0];

            let x = Number(match[1]);
            let y = Number(match[2]);
            total += x * y;
        }

        return total
    }

    async run2(data: Input): Promise<Solution> {
        let total = 0;
        const lineRegex = new RegExp(`mul\\((\\d{1,3}),(\\d{1,3})\\)|do\\(\\)|don't\\(\\)`, 'g');
        let matches = data.matchAll(lineRegex);
        let flag = true;

        for (let match of matches) {
            let temp = match[0];
            if (temp === DO)
                flag = true;
            else if (temp === DONT)
                flag = false;
            else {
                if (flag) {
                    let x = Number(match[1]);
                    let y = Number(match[2]);
                    total += x * y;
                }
            }
        }

        return total
    }
}

/*
#include <lib/Input.hpp>
#include <lib/Utils.hpp>
#include <string>
#include <iterator>
#include <regex>

namespace {
    static int solve(string line) {
        regex mulRegex(R"(mul\((\d+),(\d+)\))");
        auto total = 0;
        auto mulBegin = sregex_iterator(line.begin(), line.end(), mulRegex);
        auto mulEnd = sregex_iterator();

        for (sregex_iterator i = mulBegin; i != mulEnd; ++i) {
            smatch mulMatch = *i;
            int num1 = stoi(mulMatch[1].str(), nullptr, 10);
            int num2 = stoi(mulMatch[2].str(), nullptr, 10);

            total += num1 * num2;
        }

        return total;
    }

    static string clean(const string &line) {
        regex lineRegex("don't\\(\\).*?(do\\(\\)|$)");
        string newLine = regex_replace(line, lineRegex, "");

        return newLine;
    }

    using namespace std;
    using Input = string;

    const string DO = "do()";
    const string DONT = "don't()";

    Input parseInput(const string &data) {
        return data;
    }

    // 184576302
    int runPart1(const string &line) {
        return solve(line);
    }

    // 118173507
    int runPart2(const string &line) {
        auto total = 0;
        regex lineRegex(R"(mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\))");

        sregex_iterator begin(line.begin(), line.end(), lineRegex);
        sregex_iterator end;

        bool flag = true;

        for (auto it = begin; it != end; it++) {
            string temp = it->str();
            if (temp == "do()")
                flag = true;
            else if (temp == "don't()")
                flag = false;
            else {
                if (flag) {
                    int x = stoi((*it)[1].str());
                    int y = stoi((*it)[2].str());
                    total += x * y;
                }
            }
        }

        return total;
    }
};
 */