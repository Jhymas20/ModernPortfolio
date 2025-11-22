import { Intent, ChatMessage, PortfolioKnowledge } from '@/types/chatbot';

/**
 * Generate a response from an intent
 */
export function generateResponse(intent: Intent): ChatMessage {
  // Pick a random response from the intent's responses
  const randomResponse = intent.responses[
    Math.floor(Math.random() * intent.responses.length)
  ];

  return {
    role: 'assistant',
    content: randomResponse,
    navigate_to: intent.navigate_to || undefined
  };
}

/**
 * Generate a fallback response when no intent is matched
 */
export function generateFallbackResponse(knowledge: PortfolioKnowledge): ChatMessage {
  const randomFallback = knowledge.fallback_responses[
    Math.floor(Math.random() * knowledge.fallback_responses.length)
  ];

  return {
    role: 'assistant',
    content: randomFallback
  };
}
