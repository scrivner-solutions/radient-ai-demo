# Security Policy

## Data Privacy & Healthcare Information (PHI)
Radient AI is designed specifically for operational decision-making, staff scheduling, and throughput optimization. 

- **No Protected Health Information (PHI)**: This system does not ingest, process, or store individual patient health information, medical histories, or clinical records.
- **Strictly Synthetic Operational Data**: All baseline scenarios, workload records, modalities, scans-per-hour, and staffing files are entirely synthetic. Any resemblance to actual hospital facilities, staff names, or operational datasets is purely coincidental.
- **Security Boundaries**: No real hospital production databases are linked to this public repository.

## Architectural Security Model

### 1. Deterministic Calculation Boundary
To prevent LLM hallucination and ensure absolute mathematical accuracy, all financial calculations, overtime metrics, FTE calculations, and throughput capacities are computed using a **deterministic calculation engine** written in TypeScript. 
- The generative AI model (Gemini) does **not** perform arithmetic calculations.
- Gemini is only permitted to read the verified deterministic outputs and synthesize them into natural language summaries and executive explanations.

### 2. Lightweight Grounding Isolation
Grounding playbooks and operational guidance materials are accessed via a lightweight file-based retrieval mechanism. Generative responses are strictly bound to the deterministic outputs and the sanitised reference guidelines.

### 3. Production Repository Isolation
The private production repository contains the actual operational formulas, benchmark thresholds, prompt templates, and security configuration details. Certain implementation details are intentionally omitted from this public demo package to protect proprietary intellectual property and maintain security.

## Reporting Vulnerabilities
If you discover a potential security vulnerability, please report it via the contact channels provided in the main workspace or by contacting security@rad-ai.solutions.
