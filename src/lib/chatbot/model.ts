import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

let model: use.UniversalSentenceEncoder | null = null;

/**
 * Load the Universal Sentence Encoder model
 * This is a lightweight model for computing sentence embeddings
 */
export async function loadModel(): Promise<use.UniversalSentenceEncoder> {
  if (model) {
    return model;
  }

  try {
    console.log('Loading Universal Sentence Encoder...');
    model = await use.load();
    console.log('Model loaded successfully');
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    throw error;
  }
}

/**
 * Compute embeddings for a list of sentences
 */
export async function getEmbeddings(sentences: string[]): Promise<tf.Tensor2D> {
  const loadedModel = await loadModel();
  return loadedModel.embed(sentences);
}

/**
 * Calculate cosine similarity between two embeddings
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  return dotProduct / (magnitudeA * magnitudeB);
}
