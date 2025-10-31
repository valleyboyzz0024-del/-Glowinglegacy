import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '@/lib/leonardo-ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, width = 1920, height = 1080 } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const imageUrl = await generateImage(prompt, {
      width,
      height,
      num_images: 1,
    });

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Error generating background:', error);
    return NextResponse.json(
      { error: 'Failed to generate background' },
      { status: 500 }
    );
  }
}