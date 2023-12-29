# Advent of Code

App version of [Readme.app.md](./README.app.md)

## Configure

```sh
yarn install
```

## How to run

With ts-node

```sh
./advent 2023 1
```

With bun (ts)

```sh
./advent-bun 2023 1
```

## Tools used for some exercises

* [Graphviz](https://graphviz.org)

## Perfomance results

Computer used: **MacBook Pro (M1 Pro)**

All times are in **miliseconds**

Execution program is **Ts-Node**

$\color{lightgreen}{\textsf{Less than 1 milisecond}}$

$\color{orange}{\textsf{More than 1 milisecond}}$

$\color{darkorange}{\textsf{More than 10 milisecond}}$

$\color{red}{\textsf{More than 100 milisecond}}$

$\color{darkred}{\textsf{More than 1 second}}$


### Part 1

|            | **2015** | **2016** | **2017** | **2018** | **2019** | **2020** | **2021** | **2022** | **2023**                                                               |
|------------|----------|----------|----------|----------|----------|----------|----------|----------|------------------------------------------------------------------------|
| **Day 1**  |          |          |          |          |          |          |          |          | $\color{lightgreen}{\textsf{0.693}}$                                   |
| **Day 2**  |          |          |          |          |          |          |          |          | $\color{lightgreen}{\textsf{0.110}}$                                   |
| **Day 3**  |          |          |          |          |          |          |          |          | $\color{orange}{\textsf{3.505}}$                                       |
| **Day 4**  |          |          |          |          |          |          |          |          | $\color{lightgreen}{\textsf{0.497}}$                                   |
| **Day 5**  |          |          |          |          |          |          |          |          | $\color{lightgreen}{\textsf{0.337}}$                                   |
| **Day 6**  |          |          |          |          |          |          |          |          | $\color{lightgreen}{\textsf{0.044}}$                                   |
| **Day 7**  |          |          |          |          |          |          |          |          | $\color{orange}{\textsf{2.694}}$                                       |
| **Day 8**  |          |          |          |          |          |          |          |          | $\color{orange}{\textsf{1.380}}$                                       |
| **Day 9**  |          |          |          |          |          |          |          |          | $\color{orange}{\textsf{2.443}}$                                       |
| **Day 10** |          |          |          |          |          |          |          |          | $\color{orange}{\textsf{1.753}}$                                       |
| **Day 11** |          |          |          |          |          |          |          |          | $\color{orange}{\textsf{7.697}}$                                       |
| **Day 12** |          |          |          |          |          |          |          |          | $\color{darkorange}{\textsf{27.590}}$                                  |
| **Day 13** |          |          |          |          |          |          |          |          | $\color{orange}{\textsf{2.648}}$                                       |
| **Day 14** |          |          |          |          |          |          |          |          | $\color{orange}{\textsf{3.583}}$                                       |
| **Day 15** |          |          |          |          |          |          |          |          | $\color{lightgreen}{\textsf{0.936}}$                                   |
| **Day 16** |          |          |          |          |          |          |          |          | $\color{orange}{\textsf{6.827}}$                                       |
| **Day 17** |          |          |          |          |          |          |          |          | $\color{red}{\textsf{778.990}}$                                        |
| **Day 18** |          |          |          |          |          |          |          |          | $\color{lightgreen}{\textsf{0.212}}$                                   |
| **Day 19** |          |          |          |          |          |          |          |          | $\color{orange}{\textsf{1.620}}$                                       |
| **Day 20** |          |          |          |          |          |          |          |          | $\color{darkorange}{\textsf{11.573}}$                                  |
| **Day 21** |          |          |          |          |          |          |          |          | $\color{darkorange}{\textsf{47.354}}$                                  |
| **Day 22** |          |          |          |          |          |          |          |          | $\color{red}{\textsf{207.238}}$                                        |
| **Day 23** |          |          |          |          |          |          |          |          | $\color{lightgreen}{\textsf{0.884}}$                                   |
| **Day 24** |          |          |          |          |          |          |          |          | $\color{darkorange}{\textsf{34.876}}$                                  |
| **Day 25** |          |          |          |          |          |          |          |          | $\color{darkred}{\textsf{∞}}$ <sup>$\color{darkred}{\textsf{1}}$</sup> |

**1**: _I tried to use MinCut algorithm, but it took too long, then I solved it using [Graphviz](https://graphviz.org)_

### Part 2

| **Day**    | **2015** | **2016** | **2017** | **2018** | **2019** | **2020** | **2021** | **2022** | **2023**                                                                 |
|------------|----------|----------|----------|----------|----------|----------|----------|----------|--------------------------------------------------------------------------|
| **Day 1**  |          |          |          |          |          |          |          |          | $\color{orange}{\textsf{1.643}}$                                         |
| **Day 2**  |          |          |          |          |          |          |          |          | $\color{lightgreen}{\textsf{0.095}}$                                     |
| **Day 3**  |          |          |          |          |          |          |          |          | $\color{orange}{\textsf{1.577}}$                                         |
| **Day 4**  |          |          |          |          |          |          |          |          | $\color{lightgreen}{\textsf{0.352}}$                                     |
| **Day 5**  |          |          |          |          |          |          |          |          | $\color{darkred}{\textsf{~8m}}$ <sup>$\color{darkred}{\textsf{1}}$</sup> |
| **Day 6**  |          |          |          |          |          |          |          |          | $\color{lightgreen}{\textsf{0.034}}$                                     |
| **Day 7**  |          |          |          |          |          |          |          |          | $\color{orange}{\textsf{5.465}}$                                         |
| **Day 8**  |          |          |          |          |          |          |          |          | $\color{orange}{\textsf{6.317}}$                                         |
| **Day 9**  |          |          |          |          |          |          |          |          | $\color{lightgreen}{\textsf{0.787}}$                                     |
| **Day 10** |          |          |          |          |          |          |          |          | $\color{orange}{\textsf{7.080}}$                                         |
| **Day 11** |          |          |          |          |          |          |          |          | $\color{orange}{\textsf{5.198}}$                                         |
| **Day 12** |          |          |          |          |          |          |          |          | $\color{red}{\textsf{555.160}}$                                          |
| **Day 13** |          |          |          |          |          |          |          |          | $\color{lightgreen}{\textsf{0.549}}$                                     |
| **Day 14** |          |          |          |          |          |          |          |          | $\color{red}{\textsf{488.850}}$                                          |
| **Day 15** |          |          |          |          |          |          |          |          | $\color{orange}{\textsf{1.111}}$                                         |
| **Day 16** |          |          |          |          |          |          |          |          | $\color{darkred}{\textsf{~1s}}$                                          |
| **Day 17** |          |          |          |          |          |          |          |          | $\color{darkred}{\textsf{~3s}}$                                          |
| **Day 18** |          |          |          |          |          |          |          |          | $\color{lightgreen}{\textsf{0.109}}$                                     |
| **Day 19** |          |          |          |          |          |          |          |          | $\color{orange}{\textsf{2.107}}$                                         |
| **Day 20** |          |          |          |          |          |          |          |          | $\color{darkorange}{\textsf{17.712}}$                                    |
| **Day 21** |          |          |          |          |          |          |          |          | $\color{darkred}{\textsf{~17s}}$                                         |
| **Day 22** |          |          |          |          |          |          |          |          | $\color{darkred}{\textsf{~1m}}$                                          |
| **Day 23** |          |          |          |          |          |          |          |          | $\color{orange}{\textsf{5.559}}$                                         |
| **Day 24** |          |          |          |          |          |          |          |          | $\color{darkred}{\textsf{~7s}}$                                          |
| **Day 25** |          |          |          |          |          |          |          |          | ⭐️                                                                       |

**1**: _It took around eight minutes, I'll optimize it later, I think I can do it that requires less than 10ms._
