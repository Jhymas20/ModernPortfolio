export interface Intent {
  tag: string;
  patterns: string[];
  responses: string[];
  navigate_to: string | null;
}

export interface PortfolioKnowledge {
  intents: Intent[];
  fallback_responses: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  navigate_to?: string;
}

export interface IntentMatch {
  intent: Intent;
  confidence: number;
}
