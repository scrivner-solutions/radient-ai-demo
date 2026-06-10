# Agentic Design & Decision Framework — Radient AI

This document details the design patterns, agent contracts, protocols, and technical rationales underlying Radient AI's agentic architecture.

---

## 1. Root Workflow
The system orchestrates operations through a hierarchical root workflow.
- **Root Agent / Coordinator:** Parses incoming operational snapshots and routes specific analysis segments to subordinate agents.
- **Data Quality Agent:** Inspects modality inputs, identifies missing fields, and cleans outliers.
- **Operational Benchmarking Agent:** Checks current-state statistics against synthetic performance thresholds.
- **Scenario Explorer Agent:** Synthesizes multi-variable simulation runs into prioritized operational recommendations.
- **Executive Recommendation Agent:** Generates natural language justifications and summaries suitable for hospital CFOs and department managers.

---

## 2. The Deterministic Calculation Boundary (Why Gemini Does Not Own Math)
Generative AI models are historically prone to arithmetic hallucinations, minor calculation drift, and rounding discrepancies. In a high-stakes clinical operations environment, an error of $1,000 in overtime math or 0.2 FTE in staffing can invalidate a simulation's credibility.

*   **Design Decision:** Gemini is strictly restricted from performing numeric calculations, budget forecasts, FTE sums, or utilization computations.
*   **TypeScript Calculation Tools:** A suite of deterministic algorithms calculates:
    - Paid vs Worked FTE counts.
    - Escalated overtime and premium labor costs.
    - Scanner hour utilization percentage.
    - Capacity and technician throughput limits.
*   **Separation of Concerns:** The deterministic tools calculate a fixed set of candidate results. These results are packaged as structured JSON data and fed into Gemini's context window. Gemini then performs cognitive synthesis (explaining the tradeoffs, comparing qualitative factors, and phrasing the executive recommendation).

---

## 3. Remote Scenario Explorer A2A Agent
To prevent experimental optimization runs from affecting production dashboard operations, the **Scenario Explorer** is isolated into a separate microservice:
- **Loose Coupling:** The backend serving layer is not compiled with the Scenario Explorer's agent dependencies.
- **Agent-to-Agent (A2A) SDK:** Uses standard message-passing models, maintaining clean interfaces and enabling zero-side-effect development.

---

## 4. Agent Card
The Remote Scenario Explorer publishes an **Agent Card** at `/.well-known/agent-card.json`.
- The Agent Card describes the agent's identity, description, technical version, streaming capability, target URL, and schema validation criteria for inputs and outputs.
- *For the card structure, see the sample-code directory.*

---

## 5. JSON-RPC Endpoint
The A2A microservice exposes a single JSON-RPC 2.0 endpoint at `/a2a/jsonrpc`.
- Standard RPC methods like `sendMessage` are used to submit inputs.
- The inputs and outputs are validated at runtime against the schema definitions published in the Agent Card.

---

## 6. Fallback Modes & Graceful Degradation
To guarantee production reliability, Radient AI implements two layers of automated fallback:

1.  **A2A Network Fallback:** If the remote A2A microservice endpoint is unreachable, timed out, or returns an error, the backend serving controller catches the exception, logs a warning, and executes the local fallback wrapper. The response is flagged with `executionMode: "local-fallback"`.
2.  **Grounding Fallback:** If the local reference playbook files are missing or inaccessible, the enrichment script catches the read error and executes the prompt using the base Gemini model without grounding context.

---

> **Note on Implementation Details:**  
> "Implementation details intentionally omitted from the public repository." Detailed prompt engineering matrix guidelines, local test scripts, and system prompts are private IP.
