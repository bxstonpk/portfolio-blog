## The question

Approximate nearest-neighbor (ANN) indexes like IVF-Flat and HNSW answer queries far faster than exact brute-force search (Flat), but they cost time to build first. This course research project asks: **how many queries does it take before ANN beats Flat**, once index build time is counted? And how does that number change with dataset size and embedding dimension?

## Scope

- **Data:** a public product-review dataset, cleaned and de-duplicated, with separate validation and test query sets of 1,000 queries each.
- **Embeddings:** MiniLM-L6 (384-d) and mpnet-base (768-d), CPU only. Because these are two different models, results compare "model + index" pairs rather than the effect of dimension alone.
- **Corpus sizes:** 10k, 50k, 100k, 250k, 500k, and 1M vectors. Each size is a prefix of the same corpus, so results across sizes are comparable.
- **Indexes (FAISS):** Flat (exact), IVF-Flat (`nlist` scaled to size, sweeping `nprobe`), and HNSW (`M=32`, `efConstruction=200`, sweeping `efSearch`).
- **Metrics:** single-query latency (p50/p95/mean), Recall@10 against exact ground truth, index build time, and peak process RAM.

Each index's operating point is chosen from **validation recall** only: the cheapest setting that reaches recall ≥ 0.95. Results are then reported on the test set, so the test set is never used for tuning.

## How the benchmark is built

It was designed to run on several machines over identical data, so it has features that keep results trustworthy and let a run resume after being stopped:

- **One job, one subprocess:** if a job crashes or runs out of memory, other jobs are unaffected, and that job's peak RAM can be measured directly.
- **Results are saved right away:** each finished job is appended to a CSV with fsync, and a journal records state for recovery. A rerun skips jobs that already finished.
- **Memory watchdog:** RAM is checked every 0.2 s, and jobs estimated not to fit are skipped.
- **Data integrity:** every data file has a SHA-256 in a manifest that's verified before a run. Each job's hash includes its parameters, the FAISS/NumPy versions, and the dataset fingerprint.
- **Unit tests:** cover ground-truth computation, recall, CSV writes under a crash, the break-even formula, and streaming index builds.

![One job inside the worker: load data → build the index in chunks → sweep parameters → time each query → write results](images/projects/vector-search-benchmark/worker-flowchart.webp)

## Break-even formula

Total time for Q queries is `T(Q) = index build time + Q × mean latency`.
The break-even point `Q*` is the query count where ANN's `T(Q)` equals Flat's. Beyond `Q*` queries, ANN is cheaper.

The chart at the top of this page plots `T(Q)` at 1M vectors, 384-d. The crossings are the break-even points: IVF-Flat overtakes Flat at about 613 queries, HNSW at about 5,285.

## Results

Everything ran on one laptop (Intel Core 5 120U, 16 GB RAM), with 4 threads for building and 1 thread for search. Figures below are at recall@10 ≥ 0.95.

| 1M vectors, 384-d | Build time | Mean latency per query | Break-even |
|---|---|---|---|
| Flat (exact) | ~1.6 s | ~143 ms | — |
| IVF-Flat | ~86 s | ~4.1 ms | ~613 queries |
| HNSW | ~751 s | ~0.8 ms | ~5,285 queries |

![Per-query latency vs. dataset size: Flat grows roughly linearly with size, while ANN grows much more slowly](images/projects/vector-search-benchmark/latency-vs-size.webp)

![Break-even vs. dataset size: hundreds of queries for IVF-Flat, thousands for HNSW](images/projects/vector-search-benchmark/break-even.webp)

What the results show:

- In these experiments, IVF-Flat breaks even sooner, at about 160–610 queries. HNSW needs about 1,400–6,000 because its index takes much longer to build.
- For large query volumes, HNSW answers fastest: about 180× faster than Flat at 1M vectors.
- If you only need a few hundred queries, Flat is still the cheaper choice, even at a million vectors.

![Peak RAM per job vs. dataset size](images/projects/vector-search-benchmark/peak-ram.webp)

## Application: marketing analysis of reviews

I reused the same vectors from the experiment (MiniLM, 384-d) for a demo that analyzes reviews from a marketing angle. It uses 100,000 reviews with the positive/negative labels that come with the dataset (50% positive) and answers three questions.

### Choosing the index from the experiment

The demo runs about 1,010 queries in total. The program reads this machine's measured build times and latencies and computes `T(Q)` for each index: IVF-Flat ≈ 5.4 s, Flat ≈ 12.5 s, HNSW ≈ 49.3 s. So it picks IVF-Flat (`nprobe=48`, the setting that passed recall ≥ 0.95). The research results drive the choice rather than intuition.

### 1. What segments are there, and which is least satisfied?

- Reviews are split into 10 segments with k-means on the vectors.
- Each segment's keywords come from c-TF-IDF.
- "Pain words" are words that stand out in a segment's negative reviews compared with its positive ones.

The least satisfied segment is electronics (phone, battery, sound), with only 32% positive reviews; its pain words are support, software, and months. Next is general goods (quality, price, plastic) at 36% positive, with pain words broke, cheap, and return.

![Market map: share of reviews on the x-axis, share of positive reviews on the y-axis; red segments are below 50% satisfaction](images/projects/vector-search-benchmark/market-segments.webp)

### 2. Is each topic discussed positively or negatively?

I wrote 10 topics a marketing team might care about as neutral English phrases, such as "shipping and delivery time". Each phrase is embedded, the 300 nearest reviews are retrieved, and the positive/negative share is counted.

- Most negative: customer service/returns (17% positive), compared with the previous version (27%), battery (29%).
- Most positive: easy to use (74%), bought as a gift (71%).

![Positive/negative share per topic, from the 300 reviews nearest to each question](images/projects/vector-search-benchmark/market-aspects.webp)

### 3. Monitoring new reviews as they arrive

The demo simulates 1,000 new reviews arriving one at a time. For each one, it:

1. finds the 10 nearest existing reviews and takes a similarity-weighted positive/negative vote;
2. assigns it to the nearest segment;
3. raises an alert if it's predicted negative.

Predictions matched the true labels 77.3% of the time. Mean latency was 2.08 ms per query (p95 3.85 ms), and the whole demo, from building the index to the end, took about 38 seconds.

![The terminal dashboard at the end of the demo: segments, topics customers mention, and negative-review alerts](images/projects/vector-search-benchmark/market-dashboard.webp)

Caveats:

- The 77% accuracy comes from a simple neighbor vote, not a purpose-trained classifier.
- Topic search returns reviews that are *similar* to the question, which doesn't guarantee each one is actually about that topic (mean similarity about 0.36–0.54).
- The k-means segments mostly follow product categories (books, music, movies), not customer groups as such.
- It's a demo for a presentation, not something used on real business data.

## Limitations

- It ran on a single machine; the planned cross-machine comparison hasn't been done.
- Only 384 and 768 dimensions were feasible. Models that produce 1536-d embeddings are too slow on CPU (even mpnet-768 was measured at about 54 hours for 1M texts).
- At 768-d, there's no break-even for 1M because Flat ran out of RAM. At 500k it wasn't computed, because test recall came out just under 0.95 (0.94–0.95), and the third repeat of Flat/IVF-Flat at that size didn't fit in RAM.
- All latencies are single-query, single-thread; batch search wasn't measured.
