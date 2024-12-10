import { NextResponse } from 'next/server';
import { createContentPrompt } from '@/lib/openai/prompts';
import { validateGenerationParams } from '@/lib/openai/validation';
import { GenerationParams } from '@/lib/openai/types';
import OpenAI from 'openai';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });

    let params: GenerationParams;
    try {
      params = await request.json();
    } catch (e) {
      console.error('Error parsing request body:', e);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const validationError = validateGenerationParams(params);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const prompt = createContentPrompt(params);
    
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 1000,
      });

      const generatedContent = completion.choices[0]?.message?.content;

      if (!generatedContent) {
        return NextResponse.json(
          { error: 'No content generated' },
          { status: 500 }
        );
      }

      return NextResponse.json({ content: generatedContent });
    } catch (error: any) {
      console.error('OpenAI API error:', error);
      return NextResponse.json(
        { error: error?.message || 'Failed to generate content' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error in generate route:', error);
    return NextResponse.json(
      { error: error?.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}