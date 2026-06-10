# Radient AI — Intelligent Radiology Operations & Scenario Explorer

> **Live Demo:** [https://rad-ai.solutions](https://rad-ai.solutions)  
> *Note: Certain implementation details are intentionally omitted from this public repository package to protect proprietary intellectual property.*

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [The Problem Statement](#-the-problem-statement)
3. [The Solution: Radient AI](#-the-solution-radient-ai)
4. [Key Features](#-key-features)
5. [Tech Stack](#-tech-stack)
6. [System Architecture](#-system-architecture)
7. [Demo Flow](#-demo-flow)
8. [Safety & Privacy Commitment](#-safety--privacy-commitment)
9. [Google Cloud Challenge Alignment](#-google-cloud-challenge-alignment)

---

## 🔍 Project Overview
**Radient AI** is a state-of-the-art operational intelligence platform built to optimize radiology department staffing, reduce technician burnout, and maximize scanner throughput. By separating deterministic calculation logic from generative explanations, Radient AI delivers mathematical precision backed by Gemini-powered explanation, recommendations, and remote Agent-to-Agent (A2A) orchestration.

---

## ⚠️ The Problem Statement
Modern radiology departments face a multi-variable operational crisis:
* **Technologist Burnout:** Overtime rates exceed sustainable limits, causing staffing shortages and turnover.
* **Underutilized Capital Assets:** Multi-million dollar MRI/CT scanners sit idle due to scheduling gaps or understaffing.
* **Complex Optimization Tradeoffs:** Human schedulers cannot easily balance labor costs, technician shifts, minimum coverage rules, and patient wait times.
* **Unreliable Generative AI:** Relying on LLMs to generate operational numbers results in hallucinations, invalid budget math, and untrustworthy recommendations.

---

## 💡 The Solution: Radient AI
Radient AI introduces an **agentic, explanation-focused architecture** that bridges the gap between rigid operational spreadsheets and flexible AI advisors:
1. **Deterministic Calculators:** TypeScript-based formulas compute exact FTE counts, overtime costs, burnout risk indexes, and patient throughput.
2. **Gemini Generative Synthesis:** Google Gemini acts as an expert consultant, interpreting the exact numbers to explain tradeoffs and recommend next actions.
3. **Agent-to-Agent (A2A) Protocols:** The AI Scenario Explorer is hosted as a separate, isolated microservice, communicating via JSON-RPC 2.0 to ensure system modularity and zero side-effects.

---

## ✨ Key Features
* **Interactive Modality Dashboard:** High-fidelity current-state overview showing worked FTEs, paid FTEs, overtime costs, wait times, and scanner utilization.
* **AI Insights Panel:** Dynamic, current-state summaries highlighting anomalies, low scanner utilization, or elevated technician burnout risk.
* **AI Scenario Explorer:** A natural-language interface allowing users to input optimization goals (e.g., *"Reduce MRI costs by 1 FTE without increasing wait times past 15 mins"*).
* **Ranked Scenario Recommendations:** Evaluates dozens of operational settings, ranks the top five scenarios, and flags feasibility issues.
* **Robust Fallback Engine:** Gracefully degrades from remote A2A calls to local wrapper executions, and from file-based RAG grounding to basic models if resources are offline.

---

## 🛠️ Tech Stack
* **Frontend:** Single Page Application (SPA) built using modern web layouts and dynamic UI dashboards.
* **Backend serving layer:** Node.js, Express, and TypeScript.
* **Database:** Firestore for caching and session state.
* **Generative AI:** Google Gemini, integrating lightweight file-based RAG grounding for clinical operation playbooks.
* **Agent Framework:** Agent-to-Agent (A2A) SDK, JSON-RPC 2.0 communication contracts.
* **Deployment:** Containerized via Docker and hosted on Google Cloud Run.
* **Domain & DNS:** Google Cloud custom domain mappings.

---

## 🏗️ System Architecture
```
[ Frontend Dashboard ]
       │
       ▼ (Express API /api/scenario/explore)
[ Backend Serving Layer ]
       │
       ▼ (A2A Protocol / JSON-RPC)
[ Remote Scenario Explorer Agent ]
       │
       ├─► [ Deterministic Calculation Engine ] (TypeScript)
       │
       └─► [ Gemini 2.5 Flash API ]
             ▲
             └─► [ Lightweight Grounding Context ] (Playbook reference files)
```

---

## 🚀 Demo Flow
1. **Open the App:** Navigate to [https://rad-ai.solutions](https://rad-ai.solutions) to view the current-state radiology dashboard.
2. **View Current Insights:** Observe the Gemini-powered notifications identifying utilization gaps or scheduling inefficiencies.
3. **Open AI Scenario Explorer:** Click the "Explore Scenarios" interface and enter a goal.
4. **Compare Options:** Review the top 5 ranked configurations showing changes in FTE, cost, wait times, and burnout risk.
5. **Verify Security:** Inspect the A2A logging interface to see JSON-RPC agent card discovery and request payloads.

---

## 🔒 Safety & Privacy Note
Radient AI operates entirely on **synthetic, non-identifiable operational datasets**.
* **Zero PHI:** There is no patient data ingested.
* **Security Boundaries:** API keys, database credentials, and proprietary prompt matrices are restricted to the private production repository and never exposed in public repositories or client builds.

---

## 🏆 Google Cloud Challenge Alignment
Radient AI represents a complete realization of the Google agentic paradigm:
* **Gemini Integration:** Orchestrates natural language explanation, cognitive tradeoffs analysis, and RAG grounding.
* **Cloud Run Microservices:** Independent containerized deployment of Frontend, Backend, and A2A Scenario Agent.
* **ADK Compatibility:** Conforms to Google's Agent Development Kit patterns, allowing future seamless migration to Vertex AI Agent Engine.
