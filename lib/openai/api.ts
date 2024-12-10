import { GenerationParams } from './types';
import { GENERATION_ERRORS } from './constants';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function generateContent(params: GenerationParams): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || GENERATION_ERRORS.UNEXPECTED);
    }

    if (!data?.content) {
      throw new Error(GENERATION_ERRORS.NO_CONTENT);
    }

    return data.content;
  } catch (error) {
    console.error('Generation error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(GENERATION_ERRORS.UNEXPECTED);
  }
}