# Advent of Code

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

<span style="color:lightgreen">Less than 1 milisecond</span>

<span style="color:orange">More than 1 milisecond</span>

<span style="color:darkorange">More than 10 milisecond</span>

<span style="color:red">More than 100 milisecond</span>

<span style="color:darkred">More than 1 second</span>


### Part 1

|            | **2015** | **2016** | **2017** | **2018** | **2019** | **2020** | **2021** | **2022** | **2023**                                                |
|------------|----------|----------|----------|----------|----------|----------|----------|----------|---------------------------------------------------------|
| **Day 1**  |          |          |          |          |          |          |          |          | <span style="color:lightgreen">_0.693_</span>           |
| **Day 2**  |          |          |          |          |          |          |          |          | <span style="color:lightgreen">_0.110_</span>           |
| **Day 3**  |          |          |          |          |          |          |          |          | <span style="color:orange">_3.505_</span>               |
| **Day 4**  |          |          |          |          |          |          |          |          | <span style="color:lightgreen">_0.497_</span>           |
| **Day 5**  |          |          |          |          |          |          |          |          | <span style="color:lightgreen">_0.337_</span>           |
| **Day 6**  |          |          |          |          |          |          |          |          | <span style="color:lightgreen">_0.044_</span>           |
| **Day 7**  |          |          |          |          |          |          |          |          | <span style="color:orange">_2.694_</span>               |
| **Day 8**  |          |          |          |          |          |          |          |          | <span style="color:orange">_1.380_</span>               |
| **Day 9**  |          |          |          |          |          |          |          |          | <span style="color:orange">_2.443_</span>               |
| **Day 10** |          |          |          |          |          |          |          |          | <span style="color:orange">_1.753_</span>               |
| **Day 11** |          |          |          |          |          |          |          |          | <span style="color:orange">_7.697_</span>               |
| **Day 12** |          |          |          |          |          |          |          |          | <span style="color:darkorange">_27.590_</span>          |
| **Day 13** |          |          |          |          |          |          |          |          | <span style="color:orange">_2.648_</span>               |
| **Day 14** |          |          |          |          |          |          |          |          | <span style="color:orange">_3.583_</span>               |
| **Day 15** |          |          |          |          |          |          |          |          | <span style="color:lightgreen">_0.936_</span>           |
| **Day 16** |          |          |          |          |          |          |          |          | <span style="color:orange">_6.827_</span>               |
| **Day 17** |          |          |          |          |          |          |          |          | <span style="color:red">_778.990_</span>                |
| **Day 18** |          |          |          |          |          |          |          |          | <span style="color:lightgreen">_0.212_</span>           |
| **Day 19** |          |          |          |          |          |          |          |          |                                                         |
| **Day 20** |          |          |          |          |          |          |          |          |                                                         |
| **Day 21** |          |          |          |          |          |          |          |          | <span style="color:darkorange">_47.354_</span>          |
| **Day 22** |          |          |          |          |          |          |          |          | <span style="color:red">_207.238_</span>                |
| **Day 23** |          |          |          |          |          |          |          |          | <span style="color:lightgreen">_0.884_</span>           |
| **Day 24** |          |          |          |          |          |          |          |          | <span style="color:darkorange">_34.876_</span>          |
| **Day 25** |          |          |          |          |          |          |          |          | <span style="color:darkred">**_∞_**<sup> 1</sup></span> |

**1**: _I tried to use MinCut algorithm, but it took too long, then I solved it using [Graphviz](https://graphviz.org)_

### Part 2

| **Day**    | **2015** | **2016** | **2017** | **2018** | **2019** | **2020** | **2021** | **2022** | **2023**                                                  |
|------------|----------|----------|----------|----------|----------|----------|----------|----------|-----------------------------------------------------------|
| **Day 1**  |          |          |          |          |          |          |          |          | <span style="color:orange">_1.643_</span>                 |
| **Day 2**  |          |          |          |          |          |          |          |          | <span style="color:lightgreen">_0.095_</span>             |
| **Day 3**  |          |          |          |          |          |          |          |          | <span style="color:orange">_1.577_</span>                 |
| **Day 4**  |          |          |          |          |          |          |          |          | <span style="color:lightgreen">_0.352_</span>             |
| **Day 5**  |          |          |          |          |          |          |          |          | <span style="color:darkred">**_~8m_**<sup> 1</sup></span> |
| **Day 6**  |          |          |          |          |          |          |          |          | <span style="color:lightgreen">_0.034_</span>             |
| **Day 7**  |          |          |          |          |          |          |          |          | <span style="color:orange">_5.465_</span>                 |
| **Day 8**  |          |          |          |          |          |          |          |          | <span style="color:orange">_6.317_</span>                 |
| **Day 9**  |          |          |          |          |          |          |          |          | <span style="color:lightgreen">_0.787_</span>             |
| **Day 10** |          |          |          |          |          |          |          |          | <span style="color:orange">_7.080_</span>                 |
| **Day 11** |          |          |          |          |          |          |          |          | <span style="color:orange">_5.198_</span>                 |
| **Day 12** |          |          |          |          |          |          |          |          | $\color{red}{\textsf{555.160}}$                           |
| **Day 12** |          |          |          |          |          |          |          |          | $\color{red}{\textsf{lorem ipsum}}$                       |
| **Day 13** |          |          |          |          |          |          |          |          | <span style="color:lightgreen">_0.549_</span>             |
| **Day 14** |          |          |          |          |          |          |          |          | <span style="color:red">_488.850_</span>                  |
| **Day 15** |          |          |          |          |          |          |          |          | <span style="color:orange">_1.111_</span>                 |
| **Day 16** |          |          |          |          |          |          |          |          | <span style="color:darkred">**_~1s_**</span>              |
| **Day 17** |          |          |          |          |          |          |          |          | <span style="color:darkred">**_~3s_**</span>              |
| **Day 18** |          |          |          |          |          |          |          |          | <span style="color:lightgreen">_0.109_</span>             |
| **Day 19** |          |          |          |          |          |          |          |          |                                                           |
| **Day 20** |          |          |          |          |          |          |          |          |                                                           |
| **Day 21** |          |          |          |          |          |          |          |          | <span style="color:darkred">**_~17s_**</span>             |
| **Day 22** |          |          |          |          |          |          |          |          | <span style="color:darkred">**_~1m_**</span>              |
| **Day 23** |          |          |          |          |          |          |          |          | <span style="color:orange">_5.559_</span>                 |
| **Day 24** |          |          |          |          |          |          |          |          | <span style="color:darkred">**_~7s_**</span>              |
| **Day 25** |          |          |          |          |          |          |          |          | <span style="color:lightgreen">⭐️</span>                  |

**1**: _It took around eight minutes, I'll optimize it later, I think I can do it that requires less than 10ms._
