# Advent of Code

App version of [Readme](./README.app.md)

## Configure

```sh
yarn install
```

```sh
cp config.dist.json config.json
```

**Optional** If you want to download the input automatically, you need to set the session cookie in the config.js file. You can find it in the browser console.

```json
{
  "cookie": "MY_COOKIE"
}
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

Results marked as INF means that solved by hand

$\color{lightgreen}{\textsf{Less than 1 milisecond}}$

$\color{orange}{\textsf{More than 1 milisecond}}$

$\color{darkorange}{\textsf{More than 10 milisecond}}$

$\color{red}{\textsf{More than 100 milisecond}}$

$\color{darkred}{\textsf{More than 1 second}}$



### $\color{#FFFF66}{\texttt{*}}$ Part 1

| **Day**    |                              **2015** |                              **2016** |                              **2017** |                              **2018** |                              **2019** |                              **2020** |                              **2021** |                              **2022** |                              **2023** |
|------------|--------------------------------------:|--------------------------------------:|--------------------------------------:|--------------------------------------:|--------------------------------------:|--------------------------------------:|--------------------------------------:|--------------------------------------:|--------------------------------------:|
| **Day  1** |  $\color{lightgreen}{\texttt{0.269}}$ |  $\color{lightgreen}{\texttt{0.172}}$ |                                       |                                       |                                       |                                       |                                       |  $\color{lightgreen}{\texttt{0.113}}$ |  $\color{lightgreen}{\texttt{0.640}}$ |
| **Day  2** |  $\color{lightgreen}{\texttt{0.257}}$ |  $\color{lightgreen}{\texttt{0.780}}$ |                                       |                                       |                                       |                                       |                                       |  $\color{lightgreen}{\texttt{0.479}}$ |  $\color{lightgreen}{\texttt{0.106}}$ |
| **Day  3** |      $\color{orange}{\texttt{1.619}}$ |  $\color{lightgreen}{\texttt{0.323}}$ |                                       |                                       |                                       |                                       |                                       |      $\color{orange}{\texttt{1.967}}$ |  $\color{lightgreen}{\texttt{0.207}}$ |
| **Day  4** |       $\color{red}{\texttt{215.132}}$ | $\color{darkorange}{\texttt{11.799}}$ |                                       |                                       |                                       |                                       |                                       |  $\color{lightgreen}{\texttt{0.359}}$ |  $\color{lightgreen}{\texttt{0.426}}$ |
| **Day  5** |  $\color{lightgreen}{\texttt{0.786}}$ |       $\color{darkred}{\texttt{>7s}}$ |                                       |                                       |                                       |                                       |                                       |  $\color{lightgreen}{\texttt{0.394}}$ |  $\color{lightgreen}{\texttt{0.364}}$ |
| **Day  6** | $\color{darkorange}{\texttt{63.910}}$ |  $\color{lightgreen}{\texttt{0.469}}$ |                                       |                                       |                                       |                                       |                                       |  $\color{lightgreen}{\texttt{0.503}}$ |  $\color{lightgreen}{\texttt{0.047}}$ |
| **Day  7** |  $\color{lightgreen}{\texttt{0.857}}$ |                                       |                                       |                                       |                                       |                                       |                                       |  $\color{lightgreen}{\texttt{0.849}}$ |      $\color{orange}{\texttt{2.683}}$ |
| **Day  8** |  $\color{lightgreen}{\texttt{0.257}}$ |                                       |                                       |                                       |                                       |                                       |                                       |  $\color{lightgreen}{\texttt{0.970}}$ |      $\color{orange}{\texttt{1.333}}$ |
| **Day  9** | $\color{darkorange}{\texttt{86.531}}$ |                                       |                                       |                                       |                                       |                                       |                                       |      $\color{orange}{\texttt{5.441}}$ |  $\color{lightgreen}{\texttt{0.002}}$ |
| **Day 10** | $\color{darkorange}{\texttt{61.356}}$ |                                       |                                       |                                       |                                       |                                       |                                       |  $\color{lightgreen}{\texttt{0.095}}$ |      $\color{orange}{\texttt{1.763}}$ |
| **Day 11** |       $\color{darkred}{\texttt{INF}}$ |                                       |                                       |                                       |                                       |                                       |                                       |  $\color{lightgreen}{\texttt{0.298}}$ |      $\color{orange}{\texttt{7.652}}$ |
| **Day 12** |  $\color{lightgreen}{\texttt{0.309}}$ |                                       |                                       |                                       |                                       |                                       |                                       |      $\color{orange}{\texttt{3.428}}$ | $\color{darkorange}{\texttt{23.652}}$ |
| **Day 13** |      $\color{orange}{\texttt{6.308}}$ |                                       |                                       |                                       |                                       |                                       |                                       |      $\color{orange}{\texttt{2.149}}$ |      $\color{orange}{\texttt{2.605}}$ |
| **Day 14** |      $\color{orange}{\texttt{2.755}}$ |                                       |                                       |                                       |                                       |                                       |                                       |      $\color{orange}{\texttt{3.865}}$ |      $\color{orange}{\texttt{3.359}}$ |
| **Day 15** | $\color{darkorange}{\texttt{84.058}}$ |                                       |                                       |                                       |                                       |                                       |                                       |       $\color{darkred}{\texttt{>4s}}$ |  $\color{lightgreen}{\texttt{0.928}}$ |
| **Day 16** |  $\color{lightgreen}{\texttt{0.091}}$ |                                       |                                       |                                       |                                       |                                       |                                       |       $\color{darkred}{\texttt{>6s}}$ |      $\color{orange}{\texttt{6.538}}$ |
| **Day 17** |       $\color{red}{\texttt{202.985}}$ |                                       |                                       |                                       |                                       |                                       |                                       |      $\color{orange}{\texttt{7.367}}$ |       $\color{red}{\texttt{731.511}}$ |
| **Day 18** | $\color{darkorange}{\texttt{97.254}}$ |                                       |                                       |                                       |                                       |                                       |                                       |      $\color{orange}{\texttt{2.568}}$ |  $\color{lightgreen}{\texttt{0.195}}$ |
| **Day 19** |      $\color{orange}{\texttt{3.220}}$ |                                       |                                       |                                       |                                       |                                       |                                       |      $\color{darkred}{\texttt{>11s}}$ |      $\color{orange}{\texttt{1.710}}$ |
| **Day 20** |       $\color{red}{\texttt{576.501}}$ |                                       |                                       |                                       |                                       |                                       |                                       | $\color{darkorange}{\texttt{68.767}}$ | $\color{darkorange}{\texttt{11.904}}$ |
| **Day 21** |  $\color{lightgreen}{\texttt{0.952}}$ |                                       |                                       |                                       |                                       |                                       |                                       |      $\color{orange}{\texttt{2.115}}$ | $\color{darkorange}{\texttt{47.542}}$ |
| **Day 22** |      $\color{darkred}{\texttt{>11s}}$ |                                       |                                       |                                       |                                       |                                       |                                       |      $\color{orange}{\texttt{2.556}}$ |       $\color{red}{\texttt{209.524}}$ |
| **Day 23** |  $\color{lightgreen}{\texttt{0.154}}$ |                                       |                                       |                                       |                                       |                                       |                                       | $\color{darkorange}{\texttt{48.819}}$ |      $\color{orange}{\texttt{1.384}}$ |
| **Day 24** |       $\color{darkred}{\texttt{INF}}$ |                                       |                                       |                                       |                                       |                                       |                                       |       $\color{darkred}{\texttt{>1s}}$ | $\color{darkorange}{\texttt{33.667}}$ |
| **Day 25** |       $\color{red}{\texttt{738.586}}$ |                                       |                                       |                                       |                                       |                                       |                                       |  $\color{lightgreen}{\texttt{0.205}}$ |       $\color{darkred}{\texttt{INF}}$ |


### $\color{#FFFF66}{\texttt{**}}$ Part 2

| **Day**    |                              **2015** |                              **2016** |                              **2017** |                              **2018** |                              **2019** |                              **2020** |                              **2021** |                              **2022** |                              **2023** |
|------------|--------------------------------------:|--------------------------------------:|--------------------------------------:|--------------------------------------:|--------------------------------------:|--------------------------------------:|--------------------------------------:|--------------------------------------:|--------------------------------------:|
| **Day  1** |  $\color{lightgreen}{\texttt{0.115}}$ |  $\color{lightgreen}{\texttt{0.256}}$ |                                       |                                       |                                       |                                       |                                       |  $\color{lightgreen}{\texttt{0.102}}$ |      $\color{orange}{\texttt{1.598}}$ |
| **Day  2** |  $\color{lightgreen}{\texttt{0.130}}$ |  $\color{lightgreen}{\texttt{0.660}}$ |                                       |                                       |                                       |                                       |                                       |  $\color{lightgreen}{\texttt{0.613}}$ |  $\color{lightgreen}{\texttt{0.103}}$ |
| **Day  3** |      $\color{orange}{\texttt{1.988}}$ |  $\color{lightgreen}{\texttt{0.651}}$ |                                       |                                       |                                       |                                       |                                       |  $\color{lightgreen}{\texttt{0.325}}$ |  $\color{lightgreen}{\texttt{0.106}}$ |
| **Day  4** |       $\color{darkred}{\texttt{>7s}}$ |      $\color{orange}{\texttt{7.438}}$ |                                       |                                       |                                       |                                       |                                       |  $\color{lightgreen}{\texttt{0.219}}$ |  $\color{lightgreen}{\texttt{0.475}}$ |
| **Day  5** |      $\color{orange}{\texttt{1.833}}$ |      $\color{darkred}{\texttt{>21s}}$ |                                       |                                       |                                       |                                       |                                       |  $\color{lightgreen}{\texttt{0.430}}$ |       $\color{darkred}{\texttt{>8m}}$ |
| **Day  6** | $\color{darkorange}{\texttt{66.922}}$ |  $\color{lightgreen}{\texttt{0.452}}$ |                                       |                                       |                                       |                                       |                                       |      $\color{orange}{\texttt{2.169}}$ |  $\color{lightgreen}{\texttt{0.041}}$ |
| **Day  7** |  $\color{lightgreen}{\texttt{0.513}}$ |                                       |                                       |                                       |                                       |                                       |                                       |  $\color{lightgreen}{\texttt{0.451}}$ |      $\color{orange}{\texttt{5.344}}$ |
| **Day  8** |  $\color{lightgreen}{\texttt{0.269}}$ |                                       |                                       |                                       |                                       |                                       |                                       |      $\color{orange}{\texttt{3.299}}$ |      $\color{orange}{\texttt{6.380}}$ |
| **Day  9** | $\color{darkorange}{\texttt{94.315}}$ |                                       |                                       |                                       |                                       |                                       |                                       |      $\color{orange}{\texttt{6.718}}$ |  $\color{lightgreen}{\texttt{0.001}}$ |
| **Day 10** |       $\color{darkred}{\texttt{>1s}}$ |                                       |                                       |                                       |                                       |                                       |                                       |  $\color{lightgreen}{\texttt{0.186}}$ |      $\color{orange}{\texttt{6.533}}$ |
| **Day 11** |       $\color{darkred}{\texttt{INF}}$ |                                       |                                       |                                       |                                       |                                       |                                       | $\color{darkorange}{\texttt{46.745}}$ |      $\color{orange}{\texttt{5.165}}$ |
| **Day 12** |  $\color{lightgreen}{\texttt{0.762}}$ |                                       |                                       |                                       |                                       |                                       |                                       |      $\color{orange}{\texttt{3.141}}$ |       $\color{red}{\texttt{528.548}}$ |
| **Day 13** | $\color{darkorange}{\texttt{29.090}}$ |                                       |                                       |                                       |                                       |                                       |                                       |      $\color{orange}{\texttt{1.099}}$ |  $\color{lightgreen}{\texttt{0.569}}$ |
| **Day 14** |  $\color{lightgreen}{\texttt{0.260}}$ |                                       |                                       |                                       |                                       |                                       |                                       | $\color{darkorange}{\texttt{16.992}}$ |       $\color{red}{\texttt{482.525}}$ |
| **Day 15** | $\color{darkorange}{\texttt{65.303}}$ |                                       |                                       |                                       |                                       |                                       |                                       |      $\color{darkred}{\texttt{>26s}}$ |      $\color{orange}{\texttt{1.341}}$ |
| **Day 16** |  $\color{lightgreen}{\texttt{0.081}}$ |                                       |                                       |                                       |                                       |                                       |                                       |       $\color{darkred}{\texttt{>3m}}$ |       $\color{darkred}{\texttt{>1s}}$ |
| **Day 17** |       $\color{red}{\texttt{200.915}}$ |                                       |                                       |                                       |                                       |                                       |                                       |      $\color{orange}{\texttt{6.637}}$ |       $\color{darkred}{\texttt{>2s}}$ |
| **Day 18** | $\color{darkorange}{\texttt{88.793}}$ |                                       |                                       |                                       |                                       |                                       |                                       |      $\color{orange}{\texttt{5.666}}$ |  $\color{lightgreen}{\texttt{0.112}}$ |
| **Day 19** |      $\color{orange}{\texttt{3.257}}$ |                                       |                                       |                                       |                                       |                                       |                                       |       $\color{darkred}{\texttt{>3m}}$ |      $\color{orange}{\texttt{2.112}}$ |
| **Day 20** | $\color{darkorange}{\texttt{37.701}}$ |                                       |                                       |                                       |                                       |                                       |                                       |       $\color{red}{\texttt{803.713}}$ | $\color{darkorange}{\texttt{17.168}}$ |
| **Day 21** |  $\color{lightgreen}{\texttt{0.540}}$ |                                       |                                       |                                       |                                       |                                       |                                       |  $\color{lightgreen}{\texttt{0.686}}$ |      $\color{darkred}{\texttt{>18s}}$ |
| **Day 22** |       $\color{red}{\texttt{412.600}}$ |                                       |                                       |                                       |                                       |                                       |                                       |      $\color{orange}{\texttt{2.249}}$ |       $\color{darkred}{\texttt{>1m}}$ |
| **Day 23** |  $\color{lightgreen}{\texttt{0.095}}$ |                                       |                                       |                                       |                                       |                                       |                                       |       $\color{darkred}{\texttt{>1s}}$ |       $\color{darkred}{\texttt{>5s}}$ |
| **Day 24** |       $\color{darkred}{\texttt{INF}}$ |                                       |                                       |                                       |                                       |                                       |                                       |       $\color{darkred}{\texttt{>3s}}$ |       $\color{darkred}{\texttt{>6s}}$ |
| **Day 25** |    $\color{#FFFF66}{\texttt{* × 50}}$ |    $\color{#9999CC}{\texttt{* × 12}}$ |                                       |                                       |                                       |                                       |                                       |    $\color{#FFFF66}{\texttt{* × 50}}$ |    $\color{#FFFF66}{\texttt{* × 50}}$ |
