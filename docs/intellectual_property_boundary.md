# Intellectual Property Boundary — Radient AI

This document establishes the demarcation between the publicly disclosed system specifications and the private, proprietary intellectual property (IP) of Radient AI.

---

## 1. Public Domain & Open Specifications
The following architectural designs, data shapes, and communication interfaces are public:

*   **System Architecture Topology:** Decoupled layout connecting Frontend, Backend Serving, and A2A Agent Services on Google Cloud.
*   **A2A Interface & Agent Card:** Schema specifications, JSON-RPC 2.0 endpoint routes, and client-server message formats.
*   **High-Level Agent Workflow:** Orchestration between Data Quality, Benchmarking, and Scenario Explorer Agents.
*   **Gemini Separation Pattern:** The pattern of passing deterministic calculation results to an LLM for synthesis, preventing mathematical hallucination.
*   **Synthetic Data Formats:** Structure and schema layout of input configurations and simulation output records.

---

## 2. Private & Proprietary Intellectual Property (IP)
To protect Radient AI's consulting intelligence and software assets, the following items are restricted to the private production repository and are omitted from this public package:

*   **Deterministic Formulas:** TypeScript logic calculating precise technologist workloads, overtime multipliers, and scan capacities.
*   **Prompt Engineering Matrix:** Specific system instructions, agent personality parameters, and formatting guidelines passed to Google Gemini.
*   **Benchmark Thresholds:** Target scanner utilization ranges, staff burnout indexes, and modality baseline constraints.
*   **Recommendation Ranking Heuristics:** Weighted algorithms used to prioritize and sort candidate scenarios.
*   **Consulting Playbook (RAG Corpus):** Clinical operation files and playbook records detailing operational improvement strategies.

> [!IMPORTANT]
> **Implementation details intentionally omitted from the public repository.**  
> For files matching the above categories, placeholder implementations or generic description markers are utilized in the `sample-code/` and `sample-data/` folders of this public-demo package.
