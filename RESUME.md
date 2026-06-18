# Marcus Chen

**Senior Rust Backend Engineer**

Berlin, Germany · marcus.chen.dev@proton.me · +49 176 482 9103  
[linkedin.com/in/marcus-chen-rust](https://linkedin.com/in/marcus-chen-rust) · [github.com/mchen-rust](https://github.com/mchen-rust)

---

## Professional Summary

Senior backend engineer with **7 years** of professional Rust development across fintech, logistics, and developer-tools platforms. Builds production services on **Tokio**, **Axum**, and **gRPC** handling millions of daily requests. Deep experience with **SQLx** and PostgreSQL at scale, **Serde**-driven API contracts, **WebSocket** streaming, and **`tracing`**-based observability. Comfortable with Rust’s trait system, zero-copy patterns, and cache-conscious data layout for latency-sensitive paths. Track record shipping CLIs, microservices, and backend infrastructure in distributed teams.

---

## Core Skills

| Area | Technologies |
|------|----------------|
| **Language** | Rust (2018/2021), async/await, traits, generics, lifetimes |
| **Async runtime** | Tokio, Tower, `select!`, runtime/worker tuning |
| **Web frameworks** | Axum, Actix Web 4, Tower HTTP |
| **Serialization** | Serde, serde_json, Prost, Protocol Buffers |
| **Databases** | SQLx, PostgreSQL, migrations, connection pooling; Diesel ORM |
| **RPC & messaging** | gRPC, Tonic, tonic-web, WebSockets (`tokio-tungstenite`) |
| **CLI & tooling** | Clap v4, Cargo workspaces, `build.rs`, custom binaries |
| **Observability** | `tracing`, `tracing-subscriber`, OpenTelemetry exporters, Prometheus |
| **Systems** | Allocation profiling, `#[repr(C)]` layouts, `bytes::Bytes`, flamegraphs |
| **Infrastructure** | Docker, Kubernetes, GitHub Actions, AWS (ECS, RDS), Linux |

---

## Professional Experience

### Senior Rust Backend Engineer — Relay Financial GmbH

**March 2022 – Present** · Berlin, Germany (hybrid)

- Lead backend engineer on a **payment-rail orchestration service** written in Rust; platform processes **~4.2M API calls/day** with p99 latency **< 85 ms**.
- Rebuilt legacy Node settlement workers as **Tokio** microservices using **Axum** and **gRPC** (Tonic); cut end-to-end settlement time from 12 min to **3.4 min** median.
- Own the **PostgreSQL** layer via **SQLx**: 40+ migrations, compile-time query checks, read-replica routing; eliminated an entire class of N+1 queries, reducing DB CPU by **38%**.
- Designed **Protobuf** schemas for 6 internal services; added backward-compatible field evolution and contract tests in CI.
- Built a **WebSocket** gateway for merchant dashboards (live transaction status); handles **~12k concurrent connections** per node with heartbeat and backpressure.
- Rolled out **`tracing`** + OpenTelemetry across 9 Rust services; mean incident triage time dropped from **47 min to 18 min**.
- Shipped **`relay-ops`** CLI (Clap) used by SRE for replay jobs, cache invalidation, and one-off ledger corrections.
- On-call rotation for production **payment infrastructure**; participated in SOC 2 audit prep and disaster-recovery drills.

### Rust Backend Engineer — Cartwheel Logistics

**June 2019 – February 2022** · Remote (EU)

- Developed route-optimization and fleet-tracking APIs on **Actix Web** and later **Axum**; peak load **~18k req/s** during holiday seasons.
- Implemented **SQLx** and **Diesel** data access for shipment and depot tables (~**220 GB** PostgreSQL); tuned indexes and partial indexes for geo-range queries.
- Introduced **gRPC** between dispatch engine and mobile clients; replaced JSON polling, cutting mobile battery drain complaints by **~30%**.
- Used **Serde** custom deserializers for tolerant ingestion of partner EDI payloads; reduced integration onboarding from 3 weeks to **5 days** average.
- Added **WebSocket** feeds for driver location updates; designed reconnect tokens and gap-fill protocol.
- Profiled allocation hotspots with `dhat` and `perf`; reduced allocator pressure on the hot matching loop by **52%** via `SmallVec` and struct-of-arrays layout.
- Built internal **`cw-migrate`** CLI (Clap) for schema deploys and data backfills across staging and production.

### Software Engineer — Bitstem Ltd.

**August 2017 – May 2019** · London, UK

- Joined as a Go backend developer; transitioned to **Rust** in 2018 for a new exchange feed aggregator (team’s first Rust service in production).
- Implemented low-latency market-data fan-out with **Tokio** and **WebSockets**; sustained **~40k messages/s** per instance.
- Contributed to **Serde**-based wire formats and snapshot persistence to PostgreSQL.
- Wrote operational scripts later consolidated into a **`bitstem-cli`** Cargo binary.

---

## Selected Projects

### Tauri Desktop App with Embedded gRPC Backend

**Personal project · 2025**  
**Stack:** Rust, Tokio, Tonic, SQLx, Serde, PostgreSQL, Protocol Buffers, React

- Desktop app combining **Tauri** UI with an embedded **gRPC** server (Tonic + tonic-web) and standalone `grpc-server` binary.
- Shared **Protobuf** contracts for auth and todo services; `build.rs` codegen with Serde derives on generated types.
- **SQLx** connection pool to PostgreSQL; JWT auth scaffolding with Argon2 and async service handlers.
- Tower HTTP CORS and gRPC-web layers for browser-based clients.

### `ledger-diff` — Open-source CLI

**github.com/mchen-rust/ledger-diff · 2023**  
**Stack:** Rust, Clap, Serde, SQLx

- CLI to compare double-entry ledger exports and emit structured diff reports (JSON/CSV).
- **~340 GitHub stars**; used by two fintech teams for reconciliation workflows.

---

## Education

**B.Sc. Computer Science**  
Technical University of Munich (TUM) · Graduated 2017  
Thesis: *Efficient in-memory indexes for stream processing on constrained hardware*

---

## Additional

- **Languages:** English (fluent), German (B2), Mandarin (native)
- **Work authorization:** EU citizen, open to remote within CET ±3h
