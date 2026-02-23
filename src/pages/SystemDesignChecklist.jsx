import { useState, useEffect } from "react";

const pillars = [
  {
    id: "foundations", label: "Foundations", icon: "🧱", color: "#60a5fa",
    description: "Core concepts every SD interview starts with",
    items: [
      { id: "f1", text: "Horizontal vs Vertical Scaling — trade-offs, when to use each", level: "Must", tip: "Always lead with this when asked about scale. Vertical = bigger machine, horizontal = more machines." },
      { id: "f2", text: "CAP Theorem — Consistency, Availability, Partition tolerance trade-offs", level: "Must", tip: "No system can guarantee all three. CP (HBase), AP (Cassandra), CA (single-node SQL)." },
      { id: "f3", text: "ACID vs BASE — when to relax consistency for availability", level: "Must", tip: "ACID = traditional RDBMS. BASE = eventual consistency for distributed NoSQL." },
      { id: "f4", text: "Latency numbers every engineer should know — memory, disk, network RTT", level: "Must", tip: "L1 cache ~1ns, RAM ~100ns, SSD ~100µs, HDD ~10ms, network ~150ms cross-region." },
      { id: "f5", text: "Back-of-envelope estimation — QPS, storage, bandwidth calculations", level: "Must", tip: "1M DAU × 10 requests/day = ~120 QPS. Practice this until it's instinctive." },
      { id: "f6", text: "SLAs, SLOs, SLIs — reliability targets and error budgets", level: "Good", tip: "99.9% = 8.7 hrs downtime/year. 99.99% = 52 min. Know these for design discussions." },
      { id: "f7", text: "Synchronous vs Asynchronous communication patterns", level: "Must", tip: "Sync = REST/gRPC, tight coupling. Async = queues/events, loose coupling, better resilience." },
    ],
  },
  {
    id: "networking", label: "Networking & APIs", icon: "🌐", color: "#34d399",
    description: "Protocols, API design, and communication strategies",
    items: [
      { id: "n1", text: "REST API design — resources, HTTP verbs, status codes, idempotency", level: "Must", tip: "GET/PUT/DELETE must be idempotent. POST is not. 201 = created, 409 = conflict." },
      { id: "n2", text: "gRPC vs REST vs GraphQL — when to use which", level: "Must", tip: "gRPC = internal microservices (binary, fast). GraphQL = flexible client queries. REST = standard public APIs." },
      { id: "n3", text: "WebSockets vs SSE vs Long Polling — real-time trade-offs", level: "Must", tip: "WebSockets = full duplex (chat). SSE = server push (notifications). Long polling = simple fallback." },
      { id: "n4", text: "DNS resolution flow — from browser to IP", level: "Good", tip: "Browser cache → OS cache → Recursive resolver → Root NS → TLD NS → Authoritative NS." },
      { id: "n5", text: "CDN — edge caching, cache invalidation, origin pull vs push", level: "Must", tip: "Push CDN = you upload content. Pull CDN = CDN fetches on first miss. Use for static assets." },
      { id: "n6", text: "API Gateway — rate limiting, auth, routing, request transformation", level: "Must", tip: "Single entry point for microservices. Kong, AWS API Gateway, NGINX are common choices." },
      { id: "n7", text: "API versioning strategies — URL path, headers, query params", level: "Good", tip: "/api/v1/ is simplest. Header versioning is cleaner but harder to test in browser." },
    ],
  },
  {
    id: "databases", label: "Databases", icon: "🗄️", color: "#f59e0b",
    description: "SQL, NoSQL, and the decisions that make or break scale",
    items: [
      { id: "db1", text: "SQL vs NoSQL decision framework — structure, scale, consistency needs", level: "Must", tip: "SQL = structured data, complex queries, strong consistency. NoSQL = scale, flexible schema, eventual consistency." },
      { id: "db2", text: "Database indexing — B-tree, composite indexes, covering indexes", level: "Must", tip: "Indexes speed reads, slow writes. Index columns in WHERE, JOIN, ORDER BY clauses." },
      { id: "db3", text: "Database sharding — horizontal partitioning strategies", level: "Must", tip: "Range sharding (simple, hotspot risk). Hash sharding (even distribution). Directory sharding (flexible)." },
      { id: "db4", text: "Replication — master-slave, multi-master, read replicas", level: "Must", tip: "Read replicas handle read scaling. Multi-master needs conflict resolution. Replication lag is real." },
      { id: "db5", text: "NoSQL types — Key-Value, Document, Column-family, Graph", level: "Must", tip: "Redis=KV, MongoDB=Doc, Cassandra=Column, Neo4j=Graph. Each excels in specific access patterns." },
      { id: "db6", text: "Cassandra — wide-column model, ring architecture, tunable consistency", level: "Good", tip: "Partition key determines node. No JOINs. Denormalize aggressively. Use for time-series, logs." },
      { id: "db7", text: "Database connection pooling — why and how", level: "Good", tip: "DB connections are expensive. PgBouncer, HikariCP pool and reuse connections. Default pool = 10–20." },
      { id: "db8", text: "N+1 query problem and solutions — eager loading, JOIN, batch fetch", level: "Must", tip: "1 query for list + N queries for each item = disaster. Fix with JOIN or IN clause batch fetch." },
      { id: "db9", text: "CQRS — separate read and write models", level: "Good", tip: "Write model normalizes data. Read model denormalizes for query performance. Works well with Event Sourcing." },
      { id: "db10", text: "Data partitioning strategies — range, hash, list, composite", level: "Good", tip: "Composite partitioning (range + hash) avoids hotspots while maintaining locality for range queries." },
    ],
  },
  {
    id: "caching", label: "Caching", icon: "⚡", color: "#f472b6",
    description: "The fastest way to improve read performance at scale",
    items: [
      { id: "c1", text: "Cache-aside (Lazy loading) — app reads cache first, writes to DB on miss", level: "Must", tip: "Most common. App manages cache population. Risk: cache miss storms on cold start." },
      { id: "c2", text: "Write-through vs Write-back vs Write-around", level: "Must", tip: "Write-through = write to cache + DB sync (consistent). Write-back = write cache, async DB (fast, risky)." },
      { id: "c3", text: "Cache eviction policies — LRU, LFU, TTL, FIFO", level: "Must", tip: "LRU = evict least recently used (most common). LFU = evict least frequently used. TTL = time-based expiry." },
      { id: "c4", text: "Cache stampede / thundering herd — prevention strategies", level: "Good", tip: "When cache expires, thousands of requests hit DB simultaneously. Fix: mutex lock, jitter in TTL." },
      { id: "c5", text: "Redis architecture — single-threaded, data structures, persistence", level: "Must", tip: "Supports strings, hashes, lists, sets, sorted sets. RDB (snapshot) vs AOF (append-only log) persistence." },
      { id: "c6", text: "Distributed caching — Redis Cluster, consistent hashing", level: "Good", tip: "Redis Cluster splits keyspace into 16384 hash slots. Consistent hashing minimizes key remapping on node changes." },
      { id: "c7", text: "Cache invalidation strategies — TTL, event-driven, versioned keys", level: "Must", tip: "Versioned keys (user:v3:123) avoid stale data entirely. TTL is simplest but can serve stale briefly." },
    ],
  },
  {
    id: "messaging", label: "Messaging & Queues", icon: "📨", color: "#a78bfa",
    description: "Async communication for resilient, decoupled systems",
    items: [
      { id: "mq1", text: "Message Queue vs Event Streaming — RabbitMQ vs Kafka", level: "Must", tip: "RabbitMQ = work queue, message deleted after consume. Kafka = event log, retained, replay possible." },
      { id: "mq2", text: "Kafka architecture — topics, partitions, consumer groups, offsets", level: "Must", tip: "Partition = unit of parallelism. Consumer group = load balancing. Offset = position in partition." },
      { id: "mq3", text: "At-least-once vs At-most-once vs Exactly-once delivery", level: "Must", tip: "At-least-once = duplicates possible (common). Exactly-once = expensive, needs idempotent consumers." },
      { id: "mq4", text: "Dead Letter Queue (DLQ) — handling failed messages", level: "Good", tip: "Messages that fail after N retries go to DLQ. Allows inspection, replay, and alerting without data loss." },
      { id: "mq5", text: "Backpressure — handling producer faster than consumer", level: "Good", tip: "Producer overwhelms consumer. Solutions: bounded queues, rate limiting, dropping, or scaling consumers." },
      { id: "mq6", text: "Pub/Sub pattern — decoupled broadcasting to multiple consumers", level: "Must", tip: "One publisher, many subscribers. SNS+SQS in AWS. Good for fan-out (send email + notification + analytics)." },
      { id: "mq7", text: "Saga pattern — distributed transactions via events/choreography", level: "Good", tip: "Each service publishes events. Compensating transactions on failure. Avoids 2PC across services." },
    ],
  },
  {
    id: "reliability", label: "Reliability & Scale", icon: "🛡️", color: "#fb923c",
    description: "Making systems survive failures at scale",
    items: [
      { id: "r1", text: "Load Balancing — round robin, weighted, IP hash, least connections", level: "Must", tip: "L4 = TCP level, faster. L7 = HTTP level, smarter routing. Sticky sessions via IP hash or cookies." },
      { id: "r2", text: "Circuit Breaker pattern — fail fast, prevent cascade failures", level: "Must", tip: "Closed → Open (failures exceed threshold) → Half-Open (test recovery). Hystrix, Resilience4j." },
      { id: "r3", text: "Rate Limiting algorithms — token bucket, leaky bucket, fixed/sliding window", level: "Must", tip: "Token bucket = burst allowed. Leaky bucket = smooth rate. Sliding window = most accurate, more memory." },
      { id: "r4", text: "Health checks — liveness vs readiness probes", level: "Good", tip: "Liveness = is app alive? Readiness = is app ready to serve traffic? Kubernetes uses both for pod management." },
      { id: "r5", text: "Retry strategies — exponential backoff with jitter", level: "Must", tip: "Never retry immediately — you'll amplify the failure. Add random jitter to desynchronize retry storms." },
      { id: "r6", text: "Graceful degradation — serve reduced functionality on partial failure", level: "Good", tip: "Show cached results when DB is down. Show recommendations without personalization when ML service fails." },
      { id: "r7", text: "Chaos Engineering — intentionally introducing failures to test resilience", level: "Advanced", tip: "Netflix Chaos Monkey kills random instances in production. Tests that your system truly handles failure gracefully." },
      { id: "r8", text: "Consistent Hashing — distribute load with minimal remapping", level: "Must", tip: "Adding/removing a node only remaps 1/N keys. Used in CDNs, distributed caches, load balancers." },
    ],
  },
  {
    id: "microservices", label: "Microservices", icon: "🧩", color: "#2dd4bf",
    description: "Patterns for service-oriented architecture",
    items: [
      { id: "ms1", text: "Service decomposition — domain-driven design, bounded contexts", level: "Must", tip: "Split by business domain, not technical layer. User service, Order service, Payment service." },
      { id: "ms2", text: "Service discovery — client-side vs server-side (Eureka, Consul)", level: "Good", tip: "Services register on startup. Client queries registry for available instances. Eureka is popular with Spring Boot." },
      { id: "ms3", text: "API Gateway patterns — BFF (Backend For Frontend)", level: "Good", tip: "BFF = one gateway per client type (mobile BFF, web BFF). Tailor response shape to client needs." },
      { id: "ms4", text: "Distributed tracing — correlating requests across services", level: "Good", tip: "Assign a trace ID at entry, propagate through all services. Jaeger, Zipkin, AWS X-Ray for visualization." },
      { id: "ms5", text: "Service mesh — Istio, Linkerd for cross-cutting concerns", level: "Advanced", tip: "Sidecar proxy (Envoy) handles mTLS, retries, tracing, load balancing without app code changes." },
      { id: "ms6", text: "Strangler Fig Pattern — incremental monolith to microservices migration", level: "Good", tip: "Route traffic to new services gradually. Old monolith shrinks as new services take over features." },
      { id: "ms7", text: "Event-driven architecture — choreography vs orchestration", level: "Must", tip: "Choreography = services react to events (decoupled). Orchestration = central coordinator (simpler to trace)." },
    ],
  },
  {
    id: "practice", label: "Practice Designs", icon: "🎯", color: "#e879f9",
    description: "Classic interview questions — practice end-to-end",
    items: [
      { id: "pr1", text: "Design URL Shortener (bit.ly) — hashing, redirect, analytics", level: "Must", tip: "Key decisions: ID generation (MD5 vs counter vs base62), 301 vs 302 redirect, click analytics pipeline." },
      { id: "pr2", text: "Design Twitter / News Feed — fanout, timeline generation", level: "Must", tip: "Push model (fanout on write) vs Pull model (fanout on read). Hybrid for celebrities. Redis for timelines." },
      { id: "pr3", text: "Design WhatsApp / Chat System — real-time, message delivery", level: "Must", tip: "WebSockets for real-time. Message status (sent/delivered/read). E2E encryption. Group chat fan-out." },
      { id: "pr4", text: "Design Uber / Ride-sharing — geo-search, matching, real-time tracking", level: "Must", tip: "Quadtree or Geohash for nearby drivers. Driver location via WebSockets. Matching = priority queue." },
      { id: "pr5", text: "Design YouTube / Video Streaming — upload, transcoding, CDN", level: "Must", tip: "Blob storage for raw video. Async transcoding pipeline. Multiple resolutions. CDN for delivery." },
      { id: "pr6", text: "Design Google Search — crawling, indexing, ranking", level: "Good", tip: "Crawler → Parser → Inverted index → Ranking (PageRank). Bloom filter for visited URLs." },
      { id: "pr7", text: "Design Distributed Cache (Redis) — data structure, eviction, cluster", level: "Good", tip: "Hash ring for key distribution. Replication for fault tolerance. Eviction on memory pressure." },
      { id: "pr8", text: "Design Rate Limiter — multi-tier, distributed", level: "Good", tip: "Token bucket in Redis with Lua script for atomicity. Sliding window log for accuracy. Return 429 with Retry-After header." },
      { id: "pr9", text: "Design Notification System — push, email, SMS fan-out", level: "Good", tip: "Message queue for fan-out. Priority queues for urgent alerts. Retry on failure. Deduplication via idempotency key." },
      { id: "pr10", text: "Design Distributed ID Generator (Snowflake) — unique IDs at scale", level: "Advanced", tip: "64-bit: timestamp(41) + datacenter(5) + machine(5) + sequence(12). ~4096 IDs/ms per machine." },
    ],
  },
];

const levelMeta = {
  Must:     { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
  Good:     { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
  Advanced: { bg: "#ede9fe", text: "#5b21b6", border: "#c4b5fd" },
};

export default function SystemDesignChecklist() {
  const [checked, setChecked]  = useState(() => { try { return JSON.parse(localStorage.getItem("sd_checklist") || "{}"); } catch { return {}; } });
  const [active, setActive]    = useState("foundations");
  const [filter, setFilter]    = useState("All");
  const [expandedTip, setTip]  = useState(null);

  useEffect(() => { try { localStorage.setItem("sd_checklist", JSON.stringify(checked)); } catch {} }, [checked]);

  const toggle    = (id) => setChecked(p => ({ ...p, [id]: !p[id] }));
  const toggleTip = (id) => setTip(p => p === id ? null : id);

  const allItems  = pillars.flatMap(p => p.items);
  const totalDone = allItems.filter(i => checked[i.id]).length;
  const pct       = Math.round((totalDone / allItems.length) * 100);
  const secPct    = (p) => Math.round((p.items.filter(i => checked[i.id]).length / p.items.length) * 100);

  const cur          = pillars.find(p => p.id === active);
  const visibleItems = cur.items.filter(i => filter === "All" || i.level === filter);
  const curDone      = cur.items.filter(i => checked[i.id]).length;
  const readinessLabel = pct >= 80 ? "🟢 Interview Ready" : pct >= 50 ? "🟡 Making Progress" : pct >= 20 ? "🟠 Getting Started" : "🔴 Just Beginning";

  return (
    <div style={{ minHeight: "100vh", background: "#080c14", fontFamily: "'IBM Plex Mono','Courier New',monospace", color: "#c9d1d9", padding: "28px 16px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 5, color: "#58a6ff", textTransform: "uppercase", marginBottom: 6 }}>System Design</div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#e6edf3" }}>Interview Readiness Checklist</h1>
          <p style={{ margin: "8px 0 0", color: "#8b949e", fontSize: 13 }}>{pillars.length} pillars · {allItems.length} topics · Click 💡 for interview tips</p>
        </div>

        <div style={{ background: "#0d1117", border: "1px solid #21262d", borderRadius: 12, padding: "18px 22px", marginBottom: 24, display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "#8b949e" }}>Overall Progress</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: pct >= 75 ? "#3fb950" : pct >= 40 ? "#e3b341" : "#f85149" }}>{totalDone} / {allItems.length}</span>
            </div>
            <div style={{ background: "#21262d", borderRadius: 99, height: 8, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 99, transition: "width 0.5s ease", width: `${pct}%`, background: pct >= 75 ? "linear-gradient(90deg,#238636,#3fb950)" : pct >= 40 ? "linear-gradient(90deg,#9e6a03,#e3b341)" : "linear-gradient(90deg,#da3633,#f85149)" }} />
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#e6edf3" }}>{pct}%</div>
            <div style={{ fontSize: 11, color: "#8b949e" }}>{readinessLabel}</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: 10, marginBottom: 24 }}>
          {pillars.map(p => {
            const sp = secPct(p); const sel = active === p.id;
            return (
              <button key={p.id} onClick={() => setActive(p.id)} style={{ background: sel ? "#0d1117" : "rgba(13,17,23,0.6)", border: `1px solid ${sel ? p.color : "#21262d"}`, borderRadius: 10, padding: "12px 14px", cursor: "pointer", textAlign: "left", transition: "all 0.2s", boxShadow: sel ? `0 0 12px ${p.color}30` : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 18 }}>{p.icon}</span>
                  <span style={{ fontSize: 11, color: p.color, fontWeight: 700 }}>{sp}%</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: sel ? p.color : "#8b949e", marginBottom: 6 }}>{p.label}</div>
                <div style={{ background: "#21262d", borderRadius: 99, height: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${sp}%`, background: p.color, borderRadius: 99, transition: "width 0.4s" }} />
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, padding: "12px 16px", background: "#0d1117", border: `1px solid ${cur.color}40`, borderRadius: 10 }}>
          <span style={{ fontSize: 22 }}>{cur.icon}</span>
          <div>
            <div style={{ fontWeight: 700, color: cur.color }}>{cur.label}</div>
            <div style={{ fontSize: 12, color: "#8b949e" }}>{cur.description}</div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 13, color: "#8b949e" }}>{curDone}/{cur.items.length} done</div>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {["All", "Must", "Good", "Advanced"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "4px 14px", borderRadius: 99, cursor: "pointer", fontSize: 11, fontFamily: "inherit", background: filter === f ? "#21262d" : "transparent", color: filter === f ? "#e6edf3" : "#8b949e", border: `1px solid ${filter === f ? "#30363d" : "#21262d"}`, transition: "all 0.15s" }}>{f}</button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {visibleItems.map(item => {
            const done = !!checked[item.id]; const lc = levelMeta[item.level]; const tipOpen = expandedTip === item.id;
            return (
              <div key={item.id} style={{ background: done ? "#091e0f" : "#0d1117", border: `1px solid ${done ? "#238636" : "#21262d"}`, borderRadius: 10, overflow: "hidden", transition: "border-color 0.2s" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "13px 15px", cursor: "pointer" }} onClick={() => toggle(item.id)}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 2, border: `2px solid ${done ? "#3fb950" : "#30363d"}`, background: done ? "#3fb950" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                    {done && <span style={{ color: "#000", fontSize: 11, fontWeight: 900, lineHeight: 1 }}>✓</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 13, color: done ? "#8b949e" : "#e6edf3", textDecoration: done ? "line-through" : "none" }}>{item.text}</span>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, background: lc.bg, color: lc.text, border: `1px solid ${lc.border}`, fontWeight: 700, letterSpacing: 0.5 }}>{item.level}</span>
                    <button onClick={e => { e.stopPropagation(); toggleTip(item.id); }} style={{ width: 20, height: 20, borderRadius: "50%", border: `1px solid ${tipOpen ? cur.color : "#30363d"}`, background: tipOpen ? cur.color + "20" : "transparent", color: tipOpen ? cur.color : "#8b949e", cursor: "pointer", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>💡</button>
                  </div>
                </div>
                {tipOpen && (
                  <div style={{ padding: "10px 15px 13px 45px", background: "#010409", borderTop: `1px solid ${cur.color}30`, fontSize: 12, color: "#8b949e", lineHeight: 1.6 }}>
                    <span style={{ color: cur.color, fontWeight: 700 }}>💡 Pro tip: </span>{item.tip}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 28, padding: "14px 18px", background: "#0d1117", border: "1px solid #21262d", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontSize: 12, color: "#8b949e" }}>
            <span style={{ color: "#e6edf3", fontWeight: 600 }}>{totalDone}</span> topics mastered ·{" "}
            <span style={{ color: "#e6edf3", fontWeight: 600 }}>{allItems.length - totalDone}</span> remaining
          </div>
          <div style={{ fontSize: 11, color: "#8b949e" }}>Progress auto-saved · Click 💡 for tips</div>
        </div>
      </div>
    </div>
  );
}
