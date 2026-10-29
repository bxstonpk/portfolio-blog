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

## Limitations

- It ran on a single machine; the planned cross-machine comparison hasn't been done.
- Only 384 and 768 dimensions were feasible. Models that produce 1536-d embeddings are too slow on CPU (even mpnet-768 was measured at about 54 hours for 1M texts).
- At 768-d, there's no break-even for 1M because Flat ran out of RAM. At 500k it wasn't computed, because test recall came out just under 0.95 (0.94–0.95), and the third repeat of Flat/IVF-Flat at that size didn't fit in RAM.
- All latencies are single-query, single-thread; batch search wasn't measured.
