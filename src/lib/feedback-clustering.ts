import { Feedback } from '@/types/feedback';

export interface Embedding {
  id: string;
  vector: number[];
}

export function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return normA === 0 || normB === 0 ? 0 : dot / (normA * normB);
}

export async function generateEmbedding(text: string): Promise<number[]> {
  // In production, use sentence-transformers (all-MiniLM-L6-v2) via ONNX runtime.
  // This mock returns a deterministic pseudo-embedding based on character codes.
  const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return Array.from({ length: 384 }, (_, i) => Math.sin((hash + i) * 0.1));
}

export async function checkDuplicate(
  description: string,
  existing: Feedback[] = []
): Promise<Feedback | null> {
  const newEmbedding = await generateEmbedding(description);
  const THRESHOLD = 0.85;

  for (const item of existing) {
    if (!item.description) continue;
    const existingEmbedding = await generateEmbedding(item.description);
    const similarity = cosineSimilarity(newEmbedding, existingEmbedding);
    if (similarity >= THRESHOLD) {
      return item;
    }
  }
  return null;
}

export function clusterFeedback(feedbackList: Feedback[]): Map<string, Feedback[]> {
  const clusters = new Map<string, Feedback[]>();
  feedbackList.forEach((f) => {
    const key = f.clusterId || f.category;
    if (!clusters.has(key)) clusters.set(key, []);
    clusters.get(key)!.push(f);
  });
  return clusters;
}