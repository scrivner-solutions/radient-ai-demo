# Deployment Guide — Radient AI

This document provides a sanitized deployment overview for hosting the Radient AI microservice architecture on Google Cloud Run.

---

## 1. Cloud Run Deployment Overview
Radient AI is built as a set of decoupled, containerized Node.js services.

### Services Topology
1.  **`radient-frontend`**:
    *   Hosts the web client.
    *   Serves compiled assets and UI dashboard layouts.
2.  **`radient-backend`**:
    *   Hosts the main Express API serving layer.
    *   Manages connection to Firestore and performs core routing.
3.  **`radient-scenario-agent`**:
    *   Hosts the isolated A2A Scenario Explorer JSON-RPC microservice.
    *   Interacts with Google Gemini and performs deterministic optimization runs.

---

## 2. Environment Variables (Required Keys Only)

To deploy the services, configure the following environment variables in Google Cloud Run.

### Backend Service (`radient-backend`)
*   `PORT`: The port on which the Express API server listens (e.g. `8080`).
*   `NODE_ENV`: Target environment (e.g. `production`, `development`).
*   `ORG_ID`: Synthetic identifier for the target healthcare organization.
*   `USE_SCENARIO_A2A`: Set to `true` to route explore requests to the remote A2A service.
*   `SCENARIO_A2A_URL`: The fully qualified public URL of the `radient-scenario-agent` instance.
*   `FIRESTORE_PROJECT_ID`: The Google Cloud Project ID hosting the Firestore instance.

### Scenario Agent Service (`radient-scenario-agent`)
*   `PORT`: The port on which the A2A server listens (e.g. `8080`).
*   `GEMINI_API_KEY`: API credential key for authenticating with Gemini.
*   `GEMINI_MODEL`: The target model descriptor (e.g. `gemini-2.5-flash`).
*   `PLAYBOOK_DIR`: Path to the directory hosting lightweight grounding references.

---

## 3. Custom Domain Configuration
Traffic is mapped to custom subdomains via Google Cloud Load Balancing or Cloud Run custom domain mappings:
*   Frontend: `https://rad-ai.solutions` or `https://app.rad-ai.solutions`
*   Backend: `https://rad-ai.solutions/api/*`

---

## 4. Deployment Pipeline (GCP Cloud Build)
Services are continuously built and stored in Google Artifact Registry via Cloud Build, then deployed using the following CLI workflow logic:

```bash
# 1. Build and push backend image
gcloud builds submit --tag gcr.io/[PROJECT_ID]/radient-backend

# 2. Deploy backend service to Cloud Run
gcloud run deploy radient-backend \
  --image gcr.io/[PROJECT_ID]/radient-backend \
  --platform managed \
  --allow-unauthenticated

# 3. Build and deploy scenario agent service
gcloud builds submit --tag gcr.io/[PROJECT_ID]/radient-scenario-agent
gcloud run deploy radient-scenario-agent \
  --image gcr.io/[PROJECT_ID]/radient-scenario-agent \
  --platform managed \
  --allow-unauthenticated
```

> **Note on Configuration Secrets:**  
> Actual values for `GEMINI_API_KEY`, database credentials, and internal routing endpoints are stored securely in Secret Manager and injected at runtime. "Implementation details intentionally omitted from the public repository."
