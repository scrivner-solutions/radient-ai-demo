# Google Cloud Challenge Submission Summary — Radient AI

This document details the features, technical implementations, and integration of Google Cloud technologies for the Radient AI challenge submission.

---

## 1. What We Built
We built **Radient AI**, an operational intelligence and scenario planning platform for hospital radiology departments. 
*   **Modality Dashboard:** Aggregates and renders synthetic workload, FTE staffing, scanner utilization, and overtime metrics.
*   **AI Insights Panel:** Scans telemetry data to flag operational bottlenecks or workload imbalances.
*   **AI Scenario Explorer:** A conversational scenario engine that evaluates and ranks operational staffing adjustments.

---

## 2. Why It Is Agentic
Radient AI demonstrates core autonomous behaviors:
*   **Intent Interpretation:** Parses a user's natural language goal (e.g., *"Reduce cost without increasing wait time"*) into specific simulation constraints.
*   **Goal-Directed Simulation:** Autonomously executes multiple candidate staffing variations, evaluating the tradeoffs of each.
*   **Reflective Tradeoff Ranking:** Evaluates calculated results against expert guidelines and selects the top-performing scenario.
*   **Decoupled Multi-Agent Communication:** Leverages standard Agent-to-Agent (A2A) specifications, allowing separate services to query, handshake, and negotiate recommendations.

---

## 3. Google Cloud Services Used

### Google Gemini API
*   **Purpose:** Summarizes current-state insights and generates executive recommendations.
*   **Configuration:** Deployed using `gemini-2.5-flash` for high-speed analysis, incorporating a lightweight, file-based RAG grounding matrix.

### Google Cloud Run
*   **Purpose:** Hosts the three primary components (Frontend, Backend, and A2A Scenario Agent) as isolated, auto-scaling containers.
*   **Benefits:** Guarantees isolation, quick cold starts, and zero runtime cost when inactive.

### Google Firestore
*   **Purpose:** Stores baseline operational profiles, cached insights, and session data.
*   **Benefits:** Serverless, highly available NoSQL database that integrates seamlessly with Express and Cloud Run.

### Custom Domain Mappings
*   **Purpose:** Exposes services through secure, custom SSL routes (`https://rad-ai.solutions`).

---

## 4. A2A & JSON-RPC Implementation
*   **A2A SDK:** Deployed an agent executor wrapper compliant with standard A2A agent specs.
*   **Agent Card Discovery:** Exposes the capabilities schema under `GET /.well-known/agent-card.json`.
*   **Protocol Contract:** Exposes execution routes at `POST /a2a/jsonrpc` matching standard message-passing payloads.

---

## 5. Fallback & Graceful Degradation
*   If the remote `radient-scenario-agent` service encounters an outage, backend Express controllers route simulation requests to a local calculation wrapper.
*   If grounding files are unavailable, the LLM falls back to standard explanation prompts.

---

## 6. Future Agent Engine Plan
Radient AI was designed with Google ADK compatibility and future Vertex AI Agent Engine deployment in mind.
*   The current A2A JSON-RPC interface matches Google's managed agent runtime ecosystem requirements.
*   Migration to Vertex AI Agent Engine will require shifting endpoint routing from custom Cloud Run instances to the managed Agent Engine runtime, while preserving the existing TypeScript deterministic calculators as native tools.
