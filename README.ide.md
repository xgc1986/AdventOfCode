# Advent of Code



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

<span style="color:lightgreen">Less than 1 milisecond</span>

<span style="color:orange">More than 1 milisecond</span>

<span style="color:darkorange">More than 10 milisecond</span>

<span style="color:red">More than 100 milisecond</span>

<span style="color:darkred">More than 1 second</span>



### <span style="color:#FFFF66">*</span> Part 1

| **Day** | **2015** | **2016** | **2017** | **2018** | **2019** | **2020** | **2021** | **2022** | **2023** |
|---------|---------:|---------:|---------:|---------:|---------:|---------:|---------:|---------:|---------:|
| **Day 1** | <span style="color:lightgreen">0.245</span> | <span style="color:lightgreen">0.121</span> |         |         |         |         |         | <span style="color:lightgreen">0.169</span> | <span style="color:lightgreen">0.640</span> |
| **Day 2** | <span style="color:lightgreen">0.257</span> |         |         |         |         |         |         | <span style="color:lightgreen">0.261</span> | <span style="color:lightgreen">0.106</span> |
| **Day 3** | <span style="color:orange">1.619</span> |         |         |         |         |         |         | <span style="color:orange">1.967</span> | <span style="color:lightgreen">0.207</span> |
| **Day 4** | <span style="color:red">215.132</span> |         |         |         |         |         |         | <span style="color:lightgreen">0.359</span> | <span style="color:lightgreen">0.426</span> |
| **Day 5** | <span style="color:lightgreen">0.786</span> |         |         |         |         |         |         | <span style="color:lightgreen">0.394</span> | <span style="color:lightgreen">0.364</span> |
| **Day 6** | <span style="color:darkorange">63.910</span> |         |         |         |         |         |         | <span style="color:lightgreen">0.503</span> | <span style="color:lightgreen">0.047</span> |
| **Day 7** | <span style="color:lightgreen">0.857</span> |         |         |         |         |         |         | <span style="color:lightgreen">0.849</span> | <span style="color:orange">2.683</span> |
| **Day 8** | <span style="color:lightgreen">0.257</span> |         |         |         |         |         |         | <span style="color:lightgreen">0.970</span> | <span style="color:orange">1.333</span> |
| **Day 9** | <span style="color:darkorange">86.531</span> |         |         |         |         |         |         | <span style="color:orange">5.441</span> | <span style="color:lightgreen">0.002</span> |
| **Day 10** | <span style="color:darkorange">61.356</span> |         |         |         |         |         |         | <span style="color:lightgreen">0.095</span> | <span style="color:orange">1.763</span> |
| **Day 11** | <span style="color:darkred">INF</span> |         |         |         |         |         |         |         | <span style="color:orange">7.652</span> |
| **Day 12** | <span style="color:lightgreen">0.309</span> |         |         |         |         |         |         |         | <span style="color:darkorange">23.652</span> |
| **Day 13** | <span style="color:orange">6.308</span> |         |         |         |         |         |         |         | <span style="color:orange">2.605</span> |
| **Day 14** | <span style="color:orange">2.755</span> |         |         |         |         |         |         |         | <span style="color:orange">3.359</span> |
| **Day 15** | <span style="color:darkorange">84.058</span> |         |         |         |         |         |         |         | <span style="color:lightgreen">0.928</span> |
| **Day 16** | <span style="color:lightgreen">0.091</span> |         |         |         |         |         |         | <span style="color:darkred">>6s</span> | <span style="color:orange">6.538</span> |
| **Day 17** | <span style="color:red">202.985</span> |         |         |         |         |         |         |         | <span style="color:red">731.511</span> |
| **Day 18** | <span style="color:darkorange">97.254</span> |         |         |         |         |         |         |         | <span style="color:lightgreen">0.195</span> |
| **Day 19** | <span style="color:orange">3.220</span> |         |         |         |         |         |         |         | <span style="color:orange">1.710</span> |
| **Day 20** | <span style="color:red">576.501</span> |         |         |         |         |         |         |         | <span style="color:darkorange">11.904</span> |
| **Day 21** | <span style="color:lightgreen">0.952</span> |         |         |         |         |         |         |         | <span style="color:darkorange">47.542</span> |
| **Day 22** | <span style="color:darkred">>11s</span> |         |         |         |         |         |         |         | <span style="color:red">209.524</span> |
| **Day 23** | <span style="color:lightgreen">0.154</span> |         |         |         |         |         |         |         | <span style="color:orange">1.384</span> |
| **Day 24** | <span style="color:darkred">INF</span> |         |         |         |         |         |         |         | <span style="color:darkorange">35.310</span> |
| **Day 25** | <span style="color:red">738.586</span> |         |         |         |         |         |         |         | <span style="color:darkred">INF</span> |


### <span style="color:#FFFF66">**</span> Part 2

| **Day** | **2015** | **2016** | **2017** | **2018** | **2019** | **2020** | **2021** | **2022** | **2023** |
|---------|---------:|---------:|---------:|---------:|---------:|---------:|---------:|---------:|---------:|
| **Day 1** | <span style="color:lightgreen">0.108</span> | <span style="color:lightgreen">0.273</span> |         |         |         |         |         | <span style="color:lightgreen">0.117</span> | <span style="color:orange">1.598</span> |
| **Day 2** | <span style="color:lightgreen">0.130</span> |         |         |         |         |         |         | <span style="color:lightgreen">0.246</span> | <span style="color:lightgreen">0.103</span> |
| **Day 3** | <span style="color:orange">1.988</span> |         |         |         |         |         |         | <span style="color:lightgreen">0.325</span> | <span style="color:lightgreen">0.106</span> |
| **Day 4** | <span style="color:darkred">>7s</span> |         |         |         |         |         |         | <span style="color:lightgreen">0.219</span> | <span style="color:lightgreen">0.475</span> |
| **Day 5** | <span style="color:orange">1.833</span> |         |         |         |         |         |         | <span style="color:lightgreen">0.430</span> | <span style="color:darkred">>8m</span> |
| **Day 6** | <span style="color:darkorange">66.922</span> |         |         |         |         |         |         | <span style="color:orange">2.169</span> | <span style="color:lightgreen">0.041</span> |
| **Day 7** | <span style="color:lightgreen">0.513</span> |         |         |         |         |         |         | <span style="color:lightgreen">0.451</span> | <span style="color:orange">5.344</span> |
| **Day 8** | <span style="color:lightgreen">0.269</span> |         |         |         |         |         |         | <span style="color:orange">3.299</span> | <span style="color:orange">6.380</span> |
| **Day 9** | <span style="color:darkorange">94.315</span> |         |         |         |         |         |         | <span style="color:orange">6.718</span> | <span style="color:lightgreen">0.001</span> |
| **Day 10** | <span style="color:darkred">>1s</span> |         |         |         |         |         |         | <span style="color:lightgreen">0.186</span> | <span style="color:orange">6.533</span> |
| **Day 11** | <span style="color:darkred">INF</span> |         |         |         |         |         |         |         | <span style="color:orange">5.165</span> |
| **Day 12** | <span style="color:lightgreen">0.762</span> |         |         |         |         |         |         |         | <span style="color:red">528.548</span> |
| **Day 13** | <span style="color:darkorange">29.090</span> |         |         |         |         |         |         |         | <span style="color:lightgreen">0.569</span> |
| **Day 14** | <span style="color:lightgreen">0.260</span> |         |         |         |         |         |         |         | <span style="color:red">482.525</span> |
| **Day 15** | <span style="color:darkorange">65.303</span> |         |         |         |         |         |         |         | <span style="color:orange">1.341</span> |
| **Day 16** | <span style="color:lightgreen">0.081</span> |         |         |         |         |         |         | <span style="color:darkred">>3m</span> | <span style="color:darkred">>1s</span> |
| **Day 17** | <span style="color:red">200.915</span> |         |         |         |         |         |         |         | <span style="color:darkred">>2s</span> |
| **Day 18** | <span style="color:darkorange">88.793</span> |         |         |         |         |         |         |         | <span style="color:lightgreen">0.112</span> |
| **Day 19** | <span style="color:orange">3.257</span> |         |         |         |         |         |         |         | <span style="color:orange">2.112</span> |
| **Day 20** | <span style="color:darkorange">37.701</span> |         |         |         |         |         |         |         | <span style="color:darkorange">17.168</span> |
| **Day 21** | <span style="color:lightgreen">0.540</span> |         |         |         |         |         |         |         | <span style="color:darkred">>18s</span> |
| **Day 22** | <span style="color:red">412.600</span> |         |         |         |         |         |         |         | <span style="color:darkred">>1m</span> |
| **Day 23** | <span style="color:lightgreen">0.095</span> |         |         |         |         |         |         |         | <span style="color:darkred">>5s</span> |
| **Day 24** | <span style="color:darkred">INF</span> |         |         |         |         |         |         |         | <span style="color:darkred">>6s</span> |
| **Day 25** | <span style="color:#FFFF66">* × 50</span> | <span style="color:#9999CC">* × 2</span> |         |         |         |         |         | <span style="color:#9999CC">* × 22</span> | <span style="color:#FFFF66">* × 50</span> |
