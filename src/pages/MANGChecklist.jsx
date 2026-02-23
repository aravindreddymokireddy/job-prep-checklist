import { useState, useEffect } from "react";

const sections = [
  {
    id: "dsa", label: "DSA & Coding", icon: "⚡", color: "#f59e0b",
    items: [
      { id: "dsa1", text: "Arrays & Strings — Two pointers, sliding window, prefix sums", level: "Must" },
      { id: "dsa2", text: "Hash Maps & Sets — Frequency counting, anagrams, two-sum variants", level: "Must" },
      { id: "dsa3", text: "Trees & Graphs — BFS, DFS, traversals, cycle detection", level: "Must" },
      { id: "dsa4", text: "Dynamic Programming — Memoization, tabulation, knapsack, LCS", level: "Must" },
      { id: "dsa5", text: "Binary Search — On arrays & on answer space", level: "Must" },
      { id: "dsa6", text: "Stack & Queues — Monotonic stack, sliding window max", level: "Must" },
      { id: "dsa7", text: "Heaps / Priority Queue — Top K, median of data stream", level: "Must" },
      { id: "dsa8", text: "Tries — Prefix search, autocomplete", level: "Good" },
      { id: "dsa9", text: "Union-Find / Disjoint Set — Connected components", level: "Good" },
      { id: "dsa10", text: "Bit Manipulation — XOR tricks, power of 2 checks", level: "Good" },
      { id: "dsa11", text: "Backtracking — Permutations, subsets, N-Queens", level: "Good" },
      { id: "dsa12", text: "Segment Trees / BIT — Range queries", level: "Advanced" },
    ],
  },
  {
    id: "sd", label: "System Design", icon: "🏗️", color: "#3b82f6",
    items: [
      { id: "sd1", text: "Clarify requirements — Functional & non-functional (scale, latency, consistency)", level: "Must" },
      { id: "sd2", text: "Capacity estimation — QPS, storage, bandwidth back-of-envelope", level: "Must" },
      { id: "sd3", text: "API Design — REST vs gRPC, versioning, idempotency", level: "Must" },
      { id: "sd4", text: "Database choice — SQL vs NoSQL, sharding, replication", level: "Must" },
      { id: "sd5", text: "Caching strategy — Redis, CDN, write-through vs write-back", level: "Must" },
      { id: "sd6", text: "Load Balancing — L4 vs L7, consistent hashing, health checks", level: "Must" },
      { id: "sd7", text: "Message Queues — Kafka, RabbitMQ, async decoupling", level: "Must" },
      { id: "sd8", text: "CAP Theorem & BASE — Consistency trade-offs", level: "Must" },
      { id: "sd9", text: "Rate Limiting — Token bucket, leaky bucket algorithms", level: "Good" },
      { id: "sd10", text: "Search — Elasticsearch, inverted index, relevance scoring", level: "Good" },
      { id: "sd11", text: "Microservices patterns — Saga, circuit breaker, service mesh", level: "Good" },
      { id: "sd12", text: "Distributed transactions — 2PC, eventual consistency, idempotency keys", level: "Advanced" },
      { id: "sd13", text: "Real-time systems — WebSockets, SSE, long polling trade-offs", level: "Good" },
      { id: "sd14", text: "Practice designs: URL shortener, Twitter feed, WhatsApp, Uber", level: "Must" },
    ],
  },
  {
    id: "behavioral", label: "Behavioral (STAR)", icon: "🎯", color: "#8b5cf6",
    items: [
      { id: "beh1", text: "Prepare 5–7 strong STAR stories covering conflict, failure, leadership, impact", level: "Must" },
      { id: "beh2", text: "Research company values & map your stories to them", level: "Must" },
      { id: "beh3", text: "'Tell me about yourself' — crisp 2-min narrative arc", level: "Must" },
      { id: "beh4", text: "Quantify impact — % improvements, $ saved, users served", level: "Must" },
      { id: "beh5", text: "Conflict resolution story — respectful disagreement with a peer/manager", level: "Must" },
      { id: "beh6", text: "Failure story — what went wrong and what you changed", level: "Must" },
      { id: "beh7", text: "Why this company? — specific, genuine, non-generic answer", level: "Must" },
      { id: "beh8", text: "Questions to ask interviewer — 2–3 thoughtful, role-specific questions", level: "Must" },
    ],
  },
  {
    id: "java", label: "Java / Spring Boot", icon: "☕", color: "#10b981",
    items: [
      { id: "j1", text: "Java 8+ features — Streams, Lambdas, Optional, CompletableFuture", level: "Must" },
      { id: "j2", text: "Concurrency — ThreadPool, synchronized, volatile, locks", level: "Must" },
      { id: "j3", text: "JVM internals — GC types, heap/stack, class loading", level: "Good" },
      { id: "j4", text: "Spring Boot — DI, AOP, auto-configuration, @Transactional", level: "Must" },
      { id: "j5", text: "REST API best practices — status codes, error handling, versioning", level: "Must" },
      { id: "j6", text: "Database — JPA/Hibernate, N+1 problem, query optimization", level: "Must" },
      { id: "j7", text: "Microservices with Spring — Feign, Eureka, Spring Cloud Gateway", level: "Good" },
    ],
  },
  {
    id: "process", label: "Interview Process", icon: "📋", color: "#ef4444",
    items: [
      { id: "p1", text: "Resume tailored to role — keywords, impact-first bullets", level: "Must" },
      { id: "p2", text: "Mock interviews done — at least 10 coding + 3 system design", level: "Must" },
      { id: "p3", text: "Think aloud during problems — verbalize your thought process", level: "Must" },
      { id: "p4", text: "Time management — solve brute force first, then optimize", level: "Must" },
      { id: "p5", text: "Edge cases habit — null, empty, overflow, duplicates", level: "Must" },
      { id: "p6", text: "Test your code — trace through examples before declaring done", level: "Must" },
      { id: "p7", text: "Leetcode solved — 150+ (Easy: 50, Medium: 80+, Hard: 20+)", level: "Must" },
      { id: "p8", text: "Company-specific LC tagged problems reviewed", level: "Good" },
    ],
  },
];

const levelColors = {
  Must:     { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
  Good:     { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
  Advanced: { bg: "#ede9fe", text: "#5b21b6", border: "#c4b5fd" },
};

export default function MANGChecklist() {
  const [checked, setChecked] = useState(() => { try { return JSON.parse(localStorage.getItem("maang_checklist") || "{}"); } catch { return {}; } });
  const [activeSection, setActiveSection] = useState("dsa");
  const [filter, setFilter] = useState("All");

  useEffect(() => { try { localStorage.setItem("maang_checklist", JSON.stringify(checked)); } catch {} }, [checked]);

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const totalItems = sections.flatMap(s => s.items).length;
  const totalChecked = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((totalChecked / totalItems) * 100);
  const currentSection = sections.find(s => s.id === activeSection);
  const filteredItems = currentSection.items.filter(item => filter === "All" || item.level === filter);
  const sectionProgress = (sec) => Math.round((sec.items.filter(i => checked[i.id]).length / sec.items.length) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", fontFamily: "'IBM Plex Mono','Courier New',monospace", padding: "24px 16px", color: "#e2e8f0" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 6, color: "#94a3b8", textTransform: "uppercase", marginBottom: 8 }}>MAANG Readiness Tracker</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, background: "linear-gradient(90deg, #f59e0b, #f472b6, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Interview Prep Checklist</h1>
          <div style={{ marginTop: 6, color: "#64748b", fontSize: 13 }}>{totalChecked} of {totalItems} items complete</div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "16px 20px", marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
            <span style={{ color: "#94a3b8" }}>Overall Readiness</span>
            <span style={{ fontWeight: 700, color: pct >= 75 ? "#10b981" : pct >= 40 ? "#f59e0b" : "#ef4444" }}>{pct}%</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 99, height: 8 }}>
            <div style={{ height: "100%", borderRadius: 99, transition: "width 0.5s ease", width: `${pct}%`, background: pct >= 75 ? "linear-gradient(90deg,#10b981,#34d399)" : pct >= 40 ? "linear-gradient(90deg,#f59e0b,#fcd34d)" : "linear-gradient(90deg,#ef4444,#f87171)" }} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {sections.map(sec => {
            const active = activeSection === sec.id;
            return (
              <button key={sec.id} onClick={() => setActiveSection(sec.id)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, background: active ? sec.color : "rgba(255,255,255,0.06)", color: active ? "#000" : "#94a3b8", fontWeight: active ? 700 : 400, transition: "all 0.2s" }}>
                <span>{sec.icon}</span><span>{sec.label}</span>
                <span style={{ background: active ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.1)", borderRadius: 99, padding: "1px 6px", fontSize: 10 }}>{sectionProgress(sec)}%</span>
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {["All", "Must", "Good", "Advanced"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "4px 12px", borderRadius: 99, border: "1px solid", cursor: "pointer", fontSize: 11, fontFamily: "inherit", background: filter === f ? "rgba(255,255,255,0.15)" : "transparent", color: filter === f ? "#e2e8f0" : "#64748b", borderColor: filter === f ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.08)", transition: "all 0.15s" }}>{f}</button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filteredItems.map(item => {
            const done = !!checked[item.id];
            const lc = levelColors[item.level];
            return (
              <div key={item.id} onClick={() => toggle(item.id)} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", background: done ? "rgba(16,185,129,0.06)" : "rgba(255,255,255,0.04)", border: `1px solid ${done ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.08)"}`, borderRadius: 10, cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 1, border: `2px solid ${done ? "#10b981" : "rgba(255,255,255,0.2)"}`, background: done ? "#10b981" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                  {done && <span style={{ color: "#000", fontSize: 12, fontWeight: 900 }}>✓</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 14, color: done ? "#64748b" : "#e2e8f0", textDecoration: done ? "line-through" : "none", transition: "all 0.2s" }}>{item.text}</span>
                </div>
                <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, background: lc.bg, color: lc.text, border: `1px solid ${lc.border}`, fontWeight: 700, letterSpacing: 0.5, flexShrink: 0 }}>{item.level}</span>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 20, padding: "12px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, color: "#64748b", minWidth: 120 }}>{currentSection.icon} {currentSection.label}</span>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.07)", borderRadius: 99, height: 6 }}>
            <div style={{ height: "100%", borderRadius: 99, width: `${sectionProgress(currentSection)}%`, background: currentSection.color, transition: "width 0.4s ease" }} />
          </div>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>{currentSection.items.filter(i => checked[i.id]).length}/{currentSection.items.length}</span>
        </div>

        <div style={{ textAlign: "center", marginTop: 24, fontSize: 11, color: "#334155" }}>Progress saves automatically · Click any item to toggle</div>
      </div>
    </div>
  );
}
