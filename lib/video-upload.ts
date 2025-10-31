import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface VideoMetadata {
  userId: string;
  title: string;
  description?: string;
  recipientId?: string;
  deliveryDate?: string;
}

export async function uploadVideoToStorage(
  videoBlob: Blob,
  userId: string,
  filename: string
): Promise<{ path: string; error: Error | null }> {
  try {
    const filePath = `${userId}/${Date.now()}-${filename}`;
    
    const { data, error } = await supabase.storage
      .from('videos')
      .upload(filePath, videoBlob, {
        contentType: 'video/webm',
        upsert: false,
      });

    if (error) {
      console.error('Storage upload error:', error);
      return { path: '', error };
    }

    return { path: data.path, error: null };
  } catch (error) {
    console.error('Upload exception:', error);
    return { path: '', error: error as Error };
  }
}

export async function saveVideoMetadata(
  metadata: VideoMetadata,
  videoPath: string
): Promise<{ videoId: string | null; error: Error | null }> {
  try {
    const { data: urlData } = await supabase.storage
      .from('videos')
      .getPublicUrl(videoPath);

    const { data, error } = await supabase
      .from('videos')
      .insert({
        user_id: metadata.userId,
        title: metadata.title,
        description: metadata.description,
        video_url: urlData.publicUrl,
        recipient_id: metadata.recipientId,
        delivery_date: metadata.deliveryDate,
        delivery_status: metadata.deliveryDate ? 'scheduled' : 'draft',
        quality: '1080p',
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (error) {
      console.error('Database insert error:', error);
      return { videoId: null, error };
    }

    return { videoId: data.id, error: null };
  } catch (error) {
    console.error('Metadata save exception:', error);
    return { videoId: null, error: error as Error };
  }
}

export async function getVideosByUser(userId: string) {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { videos: data || [], error };
}

export async function deleteVideo(videoId: string, videoPath: string) {
  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from('videos')
    .remove([videoPath]);

  if (storageError) {
    console.error('Storage deletion error:', storageError);
    return { error: storageError };
  }

  // Delete from database
  const { error: dbError } = await supabase
    .from('videos')
    .delete()
    .eq('id', videoId);

  return { error: dbError };
}