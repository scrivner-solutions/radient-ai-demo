# System Architecture — Radient AI

This document provides a detailed layout of Radient AI's system architecture, operational boundaries, microservices topologies, and agent flow configurations.

---

## 1. High-Level App Architecture
The system consists of a Frontend Dashboard, a Backend Serving Layer, and an isolated remote Agent-to-Agent (A2A) Scenario Explorer Agent.

```mermaid
graph TD
  FE["Frontend User Interface"] <-->|REST API / JSON| BE["Backend Serving Layer"]
  BE <-->|A2A JSON-RPC 2.0| AE["Scenario Explorer Agent (Cloud Run)"]
  AE <-->|HTTP / API| Gemini["Google Gemini API"]
  AE <-->|TypeScript Exec| CalcEngine["Deterministic Calculation Engine"]
```

---

## 2. AI Insights Current-State Flow
The current-state AI Insights feature explains current operational metrics based on synthetic historical logs.

```mermaid
sequenceDiagram
  autonumber
  actor User as Operations Manager
  participant FE as Frontend Dashboard
  participant BE as Backend Serving Layer
  participant DB as Firestore Cache
  participant Gemini as Google Gemini API

  User->>FE: Open Dashboard / View Current State
  FE->>BE: GET /api/insights
  BE->>DB: Retrieve cached raw operations metrics
  DB-->>BE: Return raw metrics (worked FTE, scanner hours, overtime rate)
  BE->>Gemini: Request insights generation (summarized inputs)
  Gemini-->>BE: Return natural language executive insights
  BE-->>FE: Response JSON (insight items)
  FE->>User: Display AI Insights Panel (e.g. Warning: High Overtime)
```

---

## 3. AI Scenario Explorer Future-State Flow
The Scenario Explorer suggests optimized settings for future operations based on user constraints and natural language goals.

```mermaid
sequenceDiagram
  autonumber
  actor User as Operations Manager
  participant FE as Frontend Scenario UI
  participant BE as Backend Serving Layer
  participant A2A as Remote Scenario Explorer Agent
  participant Calc as Deterministic Calculator
  participant Gemini as Google Gemini API

  User->>FE: Enter goal: "Reduce CT costs by $50k" & click Run
  FE->>BE: POST /api/scenario/explore
  BE->>A2A: JSON-RPC (sendMessage) with user payload
  Note over A2A: Read agentCard.json for schema compliance
  A2A->>Calc: Run 5 Candidate Scenarios (varying FTE & scheduling hours)
  Calc-->>A2A: Return exact math (FTE counts, cost delta, wait time delta, burnout indices)
  A2A->>Gemini: Request tradeoffs ranking & executive justification
  Note over Gemini: Evaluate candidate runs against playbook principles
  Gemini-->>A2A: Return executiveExplanation & ranked top 5 scenarios
  A2A-->>BE: Return JSON-RPC response payload
  BE-->>FE: Return JSON (scenarios, top five, explanation)
  FE->>User: Render side-by-side comparison, charts, and recommendations
```

---

## 4. Remote A2A Scenario Agent Flow
Details how the agent-to-agent protocol handles handshake, discovery, and message routing.

```mermaid
graph LR
  Client["Backend A2A Client"] -->|1. GET /.well-known/agent-card.json| Server["Remote A2A Server"]
  Server -->|2. Return Agent Card Metadata| Client
  Client -->|3. POST /a2a/jsonrpc (sendMessage)| Server
  Server -->|4. Execute Task via ScenarioExecutor| Server
  Server -->|5. Return JSON-RPC Response message| Client
```

---

## 5. Gemini + Deterministic Tools + Grounding Boundary
Demonstrates the separation of concerns. Gemini does **not** perform calculations. It only explains and synthesizes.

```mermaid
graph TD
  subgraph "Generative AI Explanation Boundary"
    Gemini["Google Gemini 2.5 Flash"]
    Grounding["Lightweight Grounding Playbooks"]
    Gemini <-->|Context retrieval| Grounding
  end

  subgraph "Mathematical Trust Boundary"
    Calc["Deterministic Calculator Engine"]
    Formulas["FTE, Overtime, Cost, Utilization Calculations"]
    Calc <-->|TypeScript Logic| Formulas
  end

  Input["User Input Goal & Modality"] --> Calc
  Calc -->|Verifiable Numeric Output| Gemini
  Gemini -->|Executive Explanation & Recommendations| Output["User Interface Dashboard"]
```

---

## 6. Cloud Run Service Layout
The microservice layout deployed in Google Cloud Run.

```mermaid
graph TD
  Internet["Public Web Traffic"] -->|HTTPS| CustomDomain["rad-ai.solutions"]
  CustomDomain --> LoadBalancer["Cloud Load Balancing / Routing"]
  
  subgraph "Google Cloud Run Instances"
    LoadBalancer -->|/| ServiceFE["radient-frontend (Cloud Run)"]
    LoadBalancer -->|/api/*| ServiceBE["radient-backend (Cloud Run)"]
    ServiceBE -->|Internal JSON-RPC| ServiceAE["radient-scenario-agent (Cloud Run)"]
  end

  subgraph "External & Managed Services"
    ServiceBE <--> DB["Cloud Firestore (Datastore Mode)"]
    ServiceAE <--> GeminiAPI["Google Gemini API (Vertex AI/AI Studio)"]
  end
```

> **Note on Implementation Details:**  
> Formulas, private playbook paths, and exact network weights are kept in the private repository space. "Implementation details intentionally omitted from the public repository."
