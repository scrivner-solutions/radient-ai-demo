# User Interface & Operations Screenshots

This document contains placeholders and descriptions for the primary system views and operational dashboards of Radient AI.

---

## 1. Homepage & Current-State Dashboard
Displays real-time synthetic operational metrics, worked FTE counts, paid FTE counts, scanner utilization percentages, average patient wait minutes, and active overtime alerts.

```
+--------------------------------------------------------------------------------+
|  [RADIENT AI]                                  [ MRI ] [ CT ] [ XRAY ]         |
+--------------------------------------------------------------------------------+
|  WORKED FTE     PAID FTE       OVERTIME %     UTILIZATION %    WAIT TIME       |
|  [ 12.4 ]       [ 14.2 ]       [ 12.8% ]      [ 84.5% ]        [ 18 mins ]     |
|                                                                                |
|  +-------------------------------------+  +----------------------------------+ |
|  |           WORKFORCE PROFILE         |  |          AI INSIGHTS PANEL       | |
|  |  [ Chart: Hourly FTE Coverage ]     |  |  (!) Scanner underutilization    | |
|  |  Solid line: Actual FTEs            |  |      detected during night shift | |
|  |  Dotted line: Needed capacity       |  |  (!) Burnout risk index elevated | |
|  +-------------------------------------+  +----------------------------------+ |
+--------------------------------------------------------------------------------+
```
*(Screenshot path: `screenshots/homepage.png` - Placeholder)*

---

## 2. Manual Simulation Dashboard
Provides interactive sliders for adjusting scheduled technician shifts, modality opening hours, staffing allocations, and cross-training configurations.

```
+--------------------------------------------------------------------------------+
|  [MANUAL SIMULATION CONTROLS]                                                   |
+--------------------------------------------------------------------------------+
|  Technician Count:  [========o-------] 12                                      |
|  Modality Hours:    [==========o-----] 16 hrs                                  |
|  Overtime Threshold: [====o-----------] 40 hrs                                 |
|                                                                                |
|  --> [Run Manual Calculation]                                                  |
|  Result: Estimated Overtime Cost = $12,400 | Calculated Burnout Risk = Low     |
+--------------------------------------------------------------------------------+
```
*(Screenshot path: `screenshots/scenario_dashboard.png` - Placeholder)*

---

## 3. AI Scenario Explorer & Recommendations
The primary natural-language query interface where operations directors input optimization goals and receive ranked future-state recommendations.

```
+--------------------------------------------------------------------------------+
|  [AI SCENARIO EXPLORER]                                                        |
+--------------------------------------------------------------------------------+
|  Enter Goal: [ "Optimize MRI staffing to reduce cost without increasing wait" ]|
|  Constraints: Enforce minimum coverage floor.                                  |
|                                                                                |
|  --> [ RUN AI OPTIMIZATION ]                                                   |
|                                                                                |
|  +--------------------------------------------------------------------------+  |
|  | RANKED RECOMMENDATIONS                                                   |  |
|  | 1. Modality Shift Extension (+2 hrs) -- Score: 92/100 (Recommended)       |  |
|  | 2. Cross-Train 2 X-ray Technicians -- Score: 85/100                        |  |
|  | 3. Reduce Peak FTE by 0.5 -- Score: 78/100                               |  |
|  +--------------------------------------------------------------------------+  |
|  | EXECUTIVE EXPLANATION                                                    |  |
|  | "Based on the MRI playbook parameters, extending opening hours on CT/MRI |  |
|  | distributes peak demand. Doing so reduces waiting time without requiring|  |
|  | expensive call-back shifts..."                                           |  |
|  +--------------------------------------------------------------------------+  |
+--------------------------------------------------------------------------------+
```
*(Screenshot path: `screenshots/scenario_explorer_recommendations.png` - Placeholder)*

---

## 4. Google Cloud Run Services Console
A view of the deployed services in the Google Cloud Console, demonstrating active status, URL links, and CPU allocations.

```
+--------------------------------------------------------------------------------+
|  Cloud Run > Services                                                          |
+--------------------------------------------------------------------------------+
|  [Name]                    [Region]       [URL]                                |
|  [x] radient-frontend      us-central1    https://radient-frontend-xyz.a.run.app|
|  [x] radient-backend       us-central1    https://radient-backend-xyz.a.run.app |
|  [x] radient-scenario-agent us-central1   https://scenario-agent-xyz.a.run.app  |
+--------------------------------------------------------------------------------+
```
*(Screenshot path: `screenshots/cloud_run_services.png` - Placeholder)*

---

## 5. Agent Card JSON Endpoint
A browser view displaying the resolved agent card metadata containing input/output schemas at `/.well-known/agent-card.json`.

```json
{
  "name": "Radient Scenario Explorer Agent",
  "description": "Generates and ranks future-state radiology operational scenarios",
  "protocolVersion": "0.3.0",
  "version": "0.1.0",
  "url": "https://scenario-agent-xyz.a.run.app/a2a/jsonrpc",
  "capabilities": {
    "streaming": false
  }
}
```
*(Screenshot path: `screenshots/agent_card_json.png` - Placeholder)*

---

## 6. Remote Scenario Agent Logs (A2A Logs)
Standard logs displaying the handshake discovery sequence and incoming JSON-RPC 2.0 messages.

```
2026-06-10T00:15:30Z INFO [A2A-Server] Received request method: sendMessage
2026-06-10T00:15:30Z INFO [A2A-Server] Validating inputs for modality: CT
2026-06-10T00:15:31Z INFO [A2A-Server] Iterating 5 candidate metrics configurations
2026-06-10T00:15:32Z INFO [A2A-Server] Executing Gemini tradeoffs prioritization
2026-06-10T00:15:33Z INFO [A2A-Server] Returning status 200 JSON-RPC response
```
*(Screenshot path: `screenshots/scenario_agent_logs.png` - Placeholder)*

---

## 7. Custom Domain & DNS Status
Cloud Console showing custom domains successfully bound to `https://rad-ai.solutions`.

```
+--------------------------------------------------------------------------------+
|  Custom Domain Mappings                                                        |
+--------------------------------------------------------------------------------+
|  Domain: rad-ai.solutions  ->  Points to Cloud Run Load Balancer               |
|  SSL Certificate: Active / Provisioned                                         |
+--------------------------------------------------------------------------------+
```
*(Screenshot path: `screenshots/custom_domain.png` - Placeholder)*

---

## 8. High-Level Architecture Diagram / A2A Flow
Visual representations of the request flow from the browser, through the backend serving layer, and down to the A2A Scenario Agent microservice.
*(Screenshot path: `screenshots/architecture_diagram.png` - Placeholder)*
