/**
 * Radient AI - Sanitized A2A Client & Fallback Orchestration
 * 
 * Demonstrates client-side A2A agent discovery, RPC calls,
 * and automated fallback to local calculations if the remote service is offline.
 * 
 * "Implementation details intentionally omitted from the public repository."
 */

import { ScenarioInput, ScenarioOutput, ScenarioExecutor } from './scenarioExecutor';

export class RadientA2aClient {
  private localExecutor = new ScenarioExecutor();

  /**
   * Routes scenario execution to the remote A2A service or falls back locally.
   */
  async executeScenario(
    remoteAgentUrl: string | undefined,
    useRemote: boolean,
    input: ScenarioInput
  ): Promise<ScenarioOutput & { executionMode: 'remote-a2a' | 'local-fallback' | 'local' }> {
    
    // Check if remote agent execution is enabled
    if (useRemote && remoteAgentUrl) {
      try {
        console.log(`Routing scenario exploration to remote A2A: ${remoteAgentUrl}`);
        
        // In practice, this discovers the Agent Card via GET remoteAgentUrl/.well-known/agent-card.json,
        // validates the input payload against the card's schema, and makes a POST request to the JSON-RPC route.
        const remoteResult = await this.callRemoteA2aAgent(remoteAgentUrl, input);
        
        return {
          ...remoteResult,
          executionMode: 'remote-a2a'
        };
      } catch (err) {
        console.warn(`Remote A2A Agent call failed. Falling back to local execution. Error:`, err);
        const fallbackResult = await this.localExecutor.execute(input);
        return {
          ...fallbackResult,
          executionMode: 'local-fallback'
        };
      }
    }

    // Direct local execution path
    const localResult = await this.localExecutor.execute(input);
    return {
      ...localResult,
      executionMode: 'local'
    };
  }

  /**
   * Helper implementing the JSON-RPC 2.0 message envelope for A2A communication.
   */
  private async callRemoteA2aAgent(url: string, input: ScenarioInput): Promise<ScenarioOutput> {
    const payload = {
      jsonrpc: '2.0',
      id: 'uuid-request-id',
      method: 'sendMessage',
      params: {
        message: {
          messageId: 'message-id-uuid',
          role: 'user',
          parts: [{ kind: 'text', text: JSON.stringify(input) }],
          kind: 'message'
        }
      }
    };

    // Simulated fetch call to A2A server
    const response = await fetch(`${url}/a2a/jsonrpc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`A2A Agent responded with HTTP status ${response.status}`);
    }

    const rpcResponse = await response.json();
    if (rpcResponse.error) {
      throw new Error(rpcResponse.error.message || 'JSON-RPC Error');
    }

    const textPart = rpcResponse.result?.message?.parts?.find((p: any) => p.kind === 'text');
    if (!textPart || !textPart.text) {
      throw new Error('Received invalid empty response format from A2A Agent.');
    }

    return JSON.parse(textPart.text) as ScenarioOutput;
  }
}
