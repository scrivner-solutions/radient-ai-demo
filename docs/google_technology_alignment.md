# Google Technology Alignment — Radient AI

This document outlines how Radient AI leverages Google Cloud and AI services to build an agentic operational intelligence platform.

---

## 1. Technology Status Alignment

### Current Implementation

*   **✅ Gemini API:** Interprets numerical scenario outputs, reasons about operational tradeoffs, and generates natural-language executive summaries.
*   **✅ ADK-Compatible Agents:** Agent card schemas, structured payloads, and execution entry points align with the Google Agent Development Kit (ADK) standards.
*   **✅ Agent-to-Agent (A2A) Protocols:** Decentralized communication architecture allowing independent services to publish capability cards and consume remote APIs.
*   **✅ Agent Cards:** Published metadata schemas detailing execution contracts, available under the standard `/.well-known/agent-card.json` path.
*   **✅ JSON-RPC 2.0:** Standardized lightweight message-passing format for inter-agent communication.
*   **✅ Google Cloud Run:** Serves frontend web assets, Express API backends, and A2A Scenario Agent containers securely and efficiently.
*   **✅ Google Firestore:** Retains synthetic baseline states, cached operational insights, and user simulation configurations.
*   **✅ Custom Domain & SSL:** Configured secure custom mappings (`https://rad-ai.solutions`) for access and API routing.

### Future Roadmap Integration

*   **🚧 Vertex AI Agent Engine:** Transition the custom Cloud Run agent runtime orchestration to Vertex AI Agent Engine.
*   **🚧 Agent Runtime:** Migrate custom JSON-RPC endpoints to the official Agent Runtime hosting framework.
*   **🚧 Benchmark Intelligence Database:** Expand Firestore to include automated cross-modality benchmarking and multi-facility intelligence schemas.

---

## 2. Vertex AI Agent Engine Compatibility
A key engineering goal during the development of Radient AI was ensuring a clean path to **Vertex AI Agent Engine**.

*   **Decoupled Calculations:** By isolating calculations into pure TypeScript tools, we ensure these functions can be directly registered as **Vertex AI Tools** when migrating.
*   **Standard Interface Alignment:** The inputs (`modality`, `goal`, `constraints`) and outputs (`scenariosEvaluated`, `executiveExplanation`) conform to structured schemas that map perfectly to Vertex AI agent parameters.
*   **A2A Integration:** Our current A2A client-server structure mirrors the future agent-to-agent negotiation protocols supported by Vertex AI ecosystems.
