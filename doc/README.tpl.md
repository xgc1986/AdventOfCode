# Advent of Code

%%LINK%%

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

Results marked as INF means that solved with pen and paper

%%LEGEND_TABLE%%

### %%STARS1%% Part 1

%%PERFOMANCE_TABLE_1%%

### %%STARS2%% Part 2

%%PERFOMANCE_TABLE_2%%