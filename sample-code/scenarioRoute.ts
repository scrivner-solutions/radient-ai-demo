/**
 * Radient AI - Express API Router Segment
 * 
 * Shows how requests are received, routed through the A2A client,
 * and returned with executionMode details to the frontend UI.
 * 
 * "Implementation details intentionally omitted from the public repository."
 */

import { Router, Request, Response, NextFunction } from 'express';
import { RadientA2aClient } from './a2aClient';

const router = Router();
const a2aClient = new RadientA2aClient();

// Simulated Environment Config Keys
const config = {
  useScenarioA2a: process.env.USE_SCENARIO_A2A === 'true',
  scenarioA2aUrl: process.env.SCENARIO_A2A_URL || 'http://localhost:8080'
};

/**
 * POST /api/scenario/explore
 * Triggers the agentic optimization run.
 */
router.post('/scenario/explore', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { modality, goal, constraints } = req.body;

    // Simple schema validation
    if (!modality) {
      return res.status(400).json({ error: "Missing required parameter 'modality'." });
    }

    // Process run through A2A client with fallback logic
    const result = await a2aClient.executeScenario(
      config.scenarioA2aUrl,
      config.useScenarioA2a,
      {
        modality,
        goal,
        constraints
      }
    );

    // Return output metrics, recommendations, and execution modes
    return res.json(result);
  } catch (err: any) {
    return next(err);
  }
});

export default router;
