import portfolioKnowledge from '@/data/portfolio-knowledge.json';
import { PortfolioKnowledge, ChatMessage } from '@/types/chatbot';
import { initializeIntentEmbeddings, matchIntent, keywordMatch } from './intent-matcher';
import { generateResponse, generateFallbackResponse } from './response-generator';

const knowledge: PortfolioKnowledge = portfolioKnowledge as PortfolioKnowledge;
let isInitialized = false;

/**
 * Initialize the chatbot by loading the model and computing embeddings
 */
export async function initializeChatbot(): Promise<void> {
  if (isInitialized) {
    return;
  }

  console.log('Initializing chatbot...');

  try {
    // Initialize intent embeddings
    await initializeIntentEmbeddings(knowledge.intents);
    isInitialized = true;
    console.log('Chatbot initialized successfully');
  } catch (error) {
    console.error('Error initializing chatbot:', error);
    throw error;
  }
}

/**
 * Process a user message and generate a response
 */
export async function processMessage(userInput: string): Promise<ChatMessage> {
  // Ensure chatbot is initialized
  if (!isInitialized) {
    await initializeChatbot();
  }

  // Sanitize input
  const sanitizedInput = userInput.trim();
  if (!sanitizedInput) {
    return {
      role: 'assistant',
      content: 'Please ask me something!'
    };
  }

  try {
    // Try keyword matching first for very short queries
    const keywordResult = keywordMatch(sanitizedInput, knowledge.intents);
    if (keywordResult) {
      console.log('Matched via keywords:', keywordResult.tag);
      return generateResponse(keywordResult);
    }

    // Try semantic matching with the model
    const intentMatch = await matchIntent(sanitizedInput, knowledge.intents, 0.4);

    if (intentMatch) {
      console.log(`Matched intent: ${intentMatch.intent.tag} (confidence: ${intentMatch.confidence.toFixed(3)})`);
      return generateResponse(intentMatch.intent);
    }

    // No match found, return fallback
    console.log('No intent matched, using fallback');
    return generateFallbackResponse(knowledge);

  } catch (error) {
    console.error('Error processing message:', error);
    return {
      role: 'assistant',
      content: 'Sorry, something went wrong. Please try again.'
    };
  }
}

/**
 * Get all available intents (for debugging/testing)
 */
export function getAvailableIntents() {
  return knowledge.intents.map(intent => ({
    tag: intent.tag,
    examplePatterns: intent.patterns.slice(0, 3)
  }));
}
