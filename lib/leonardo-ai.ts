const LEONARDO_API_KEY = process.env.LEONARDO_API_KEY || '7ae10c66-bcef-4ce8-9f98-27ca48b109d8';
const LEONARDO_API_URL = 'https://cloud.leonardo.ai/api/rest/v1';

export interface GenerationOptions {
  width?: number;
  height?: number;
  num_images?: number;
  guidance_scale?: number;
  num_inference_steps?: number;
}

export interface GeneratedImage {
  url: string;
  id: string;
}

export async function generateImage(
  prompt: string,
  options: GenerationOptions = {}
): Promise<string> {
  const {
    width = 1024,
    height = 768,
    num_images = 1,
    guidance_scale = 7,
    num_inference_steps = 50,
  } = options;

  try {
    // Step 1: Create generation
    const generationResponse = await fetch(`${LEONARDO_API_URL}/generations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LEONARDO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        width,
        height,
        num_images,
        guidance_scale,
        num_inference_steps,
        modelId: 'e71a1c2f-4f80-4800-934f-2c68979d8cc8', // Leonardo Diffusion XL
        presetStyle: 'CINEMATIC',
      }),
    });

    if (!generationResponse.ok) {
      const errorText = await generationResponse.text();
      console.error('Leonardo API Error:', errorText);
      throw new Error(`Leonardo API error: ${generationResponse.status}`);
    }

    const generationData = await generationResponse.json();
    const generationId = generationData.sdGenerationJob?.generationId;

    if (!generationId) {
      throw new Error('No generation ID received from Leonardo API');
    }

    // Step 2: Poll for completion
    let attempts = 0;
    const maxAttempts = 60; // 60 seconds max
    
    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      
      const statusResponse = await fetch(
        `${LEONARDO_API_URL}/generations/${generationId}`,
        {
          headers: {
            'Authorization': `Bearer ${LEONARDO_API_KEY}`,
          },
        }
      );

      if (!statusResponse.ok) {
        throw new Error(`Failed to check generation status: ${statusResponse.status}`);
      }

      const statusData = await statusResponse.json();
      const generation = statusData.generations_by_pk;

      if (generation?.status === 'COMPLETE' && generation.generated_images?.length > 0) {
        return generation.generated_images[0].url;
      }

      if (generation?.status === 'FAILED') {
        throw new Error('Image generation failed');
      }

      attempts++;
    }

    throw new Error('Image generation timed out');
  } catch (error) {
    console.error('Error generating image with Leonardo AI:', error);
    throw error;
  }
}

export async function generateBackgroundImage(theme: 'memorial' | 'celebration' | 'legacy' = 'memorial'): Promise<string> {
  const prompts = {
    memorial: 'elegant memorial background with golden light rays, dark atmospheric background with subtle textures, ethereal atmosphere, cinematic lighting, high quality, professional photography, 8k',
    celebration: 'joyful celebration background with golden confetti, warm lighting, elegant atmosphere, high quality, professional photography, 8k',
    legacy: 'timeless legacy background with golden accents, sophisticated dark background, refined textures, cinematic lighting, high quality, professional photography, 8k',
  };

  return generateImage(prompts[theme], {
    width: 1920,
    height: 1080,
    guidance_scale: 8,
    num_inference_steps: 60,
  });
}