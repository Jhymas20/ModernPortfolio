import * as tf from '@tensorflow/tfjs';
import { getEmbeddings, cosineSimilarity } from './model';
import { Intent, IntentMatch } from '@/types/chatbot';

// Cache for pattern embeddings
let patternEmbeddingsCache: Map<string, number[]> = new Map();
let intentPatternsCache: Map<string, string[]> = new Map();

/**
 * Initialize embeddings for all intent patterns
 */
export async function initializeIntentEmbeddings(intents: Intent[]): Promise<void> {
  patternEmbeddingsCache.clear();
  intentPatternsCache.clear();

  // Collect all unique patterns
  const allPatterns: string[] = [];
  const patternToIntent: Map<string, string> = new Map();

  intents.forEach(intent => {
    intentPatternsCache.set(intent.tag, intent.patterns);
    intent.patterns.forEach(pattern => {
      allPatterns.push(pattern.toLowerCase());
      patternToIntent.set(pattern.toLowerCase(), intent.tag);
    });
  });

  if (allPatterns.length === 0) {
    return;
  }

  // Compute embeddings for all patterns at once
  const embeddings = await getEmbeddings(allPatterns);
  const embeddingsArray = await embeddings.array();

  // Cache the embeddings
  allPatterns.forEach((pattern, index) => {
    patternEmbeddingsCache.set(pattern, embeddingsArray[index]);
  });

  // Clean up tensors
  embeddings.dispose();
}

/**
 * Match user input to the best intent using cosine similarity
 */
export async function matchIntent(
  userInput: string,
  intents: Intent[],
  threshold: number = 0.5
): Promise<IntentMatch | null> {
  const normalizedInput = userInput.toLowerCase().trim();

  // Compute embedding for user input
  const inputEmbedding = await getEmbeddings([normalizedInput]);
  const inputEmbeddingArray = (await inputEmbedding.array())[0];

  let bestMatch: IntentMatch | null = null;
  let highestSimilarity = threshold;

  // Compare against all cached pattern embeddings
  for (const [pattern, patternEmbedding] of patternEmbeddingsCache) {
    const similarity = cosineSimilarity(inputEmbeddingArray, patternEmbedding);

    if (similarity > highestSimilarity) {
      // Find which intent this pattern belongs to
      const matchedIntent = intents.find(intent =>
        intent.patterns.some(p => p.toLowerCase() === pattern)
      );

      if (matchedIntent) {
        highestSimilarity = similarity;
        bestMatch = {
          intent: matchedIntent,
          confidence: similarity
        };
      }
    }
  }

  // Clean up tensors
  inputEmbedding.dispose();

  return bestMatch;
}

/**
 * Simple keyword matching fallback for very short queries
 */
export function keywordMatch(userInput: string, intents: Intent[]): Intent | null {
  const normalizedInput = userInput.toLowerCase().trim();
  const words = normalizedInput.split(/\s+/);

  // For very short queries (1-2 words), use keyword matching
  if (words.length <= 2) {
    for (const intent of intents) {
      for (const pattern of intent.patterns) {
        const patternWords = pattern.toLowerCase().split(/\s+/);

        // Check if all user words are in the pattern
        const allWordsMatch = words.every(word =>
          patternWords.some(pWord => pWord.includes(word) || word.includes(pWord))
        );

        if (allWordsMatch) {
          return intent;
        }
      }
    }
  }

  return null;
}
