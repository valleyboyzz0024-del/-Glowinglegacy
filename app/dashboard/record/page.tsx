'use client';

import { useCallback, useRef, useState, useEffect } from 'react';
import dynamicImport from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Circle as RecordCircle, Square, CheckCircle, AlertCircle } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';

// Force dynamic rendering - page needs Supabase at runtime
export const dynamic = 'force-dynamic';

const Webcam = dynamicImport(() => import('react-webcam').then(m => m.default as any), { ssr: false }) as any;

export default function RecordPage() {
  const webcamRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [chunks, setChunks] = useState<BlobPart[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState('My Video Message');

  useEffect(() => {
    async function getUser() {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    }
    getUser();
  }, []);

  const handleStart = useCallback(() => {
    setPreviewUrl(null);
    setChunks([]);
    const stream = webcamRef.current?.stream as MediaStream | undefined;
    if (!stream) return;
    const mr = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
    mediaRecorderRef.current = mr;
    mr.ondataavailable = (e) => {
      if (e.data.size > 0) setChunks((prev) => [...prev, e.data]);
    };
    mr.onstop = () => {
      // Safely reference the latest chunks without adding to deps
      setChunks((prev) => {
        const blob = new Blob(prev, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        return prev;
      });
    };
    mr.start();
    setRecording(true);
  }, []);

  const handleStop = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }, []);

  const handleSave = async () => {
    if (!userId) {
      setErrorMessage('You must be logged in to save videos');
      setUploadStatus('error');
      return;
    }

    if (!previewUrl || chunks.length === 0) {
      setErrorMessage('No video to save');
      setUploadStatus('error');
      return;
    }

    setSaving(true);
    setUploadStatus('idle');
    setErrorMessage('');

    try {
      // Create blob from chunks
      const blob = new Blob(chunks, { type: 'video/webm' });
      
      // Create FormData
      const formData = new FormData();
      formData.append('video', blob, `${videoTitle.replace(/\s+/g, '-')}.webm`);
      formData.append('userId', userId);
      formData.append('title', videoTitle);
      formData.append('description', 'Recorded from dashboard');

      // Upload to API
      const response = await fetch('/api/videos/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      setUploadStatus('success');
      setChunks([]);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setPreviewUrl(null);
        setUploadStatus('idle');
        setVideoTitle('My Video Message');
      }, 3000);
    } catch (error) {
      console.error('Upload error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to upload video');
      setUploadStatus('error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gold/20 bg-background-card/60 p-6 shadow-glow">
        <div className="text-lg font-heading text-gold">Record a New Video</div>
        <div className="text-sm text-text-secondary">Speak from the heart. You can always re-record.</div>
      </div>

      {/* Status Messages */}
      {uploadStatus === 'success' && (
        <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <div className="text-green-500">Video uploaded successfully! ✨</div>
        </div>
      )}
      {uploadStatus === 'error' && errorMessage && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <div className="text-red-500">{errorMessage}</div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="border-gold/20 bg-background-card/60">
          <CardHeader>
            <CardTitle className="text-gold">Camera</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {previewUrl && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gold mb-2">Video Title</label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-gold/20 rounded-lg focus:outline-none focus:border-gold transition-colors text-white"
                  placeholder="Enter a title for your video"
                />
              </div>
            )}
            <div className="aspect-video overflow-hidden rounded-xl border border-gold/20">
              {!previewUrl ? (
                <Webcam
                  ref={webcamRef}
                  mirrored
                  audio
                  className="h-full w-full object-cover"
                />
              ) : (
                <video src={previewUrl} controls className="h-full w-full object-contain" />)
              }
            </div>
            <div className="flex items-center gap-3">
              {!recording ? (
                <Button size="lg" onClick={handleStart} className="animate-pulse-glow">
                  <RecordCircle className="mr-2 h-4 w-4" /> Start Recording
                </Button>
              ) : (
                <Button size="lg" variant="outline" onClick={handleStop}>
                  <Square className="mr-2 h-4 w-4" /> Stop
                </Button>
              )}
              {previewUrl && (
                <Button size="lg" onClick={handleSave} disabled={saving || uploadStatus === 'success'}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                    </>
                  ) : uploadStatus === 'success' ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" /> Saved!
                    </>
                  ) : (
                    'Save to Library'
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gold/20 bg-background-card/60">
          <CardHeader>
            <CardTitle className="text-gold">Tips for a Great Recording</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
              <li>Find warm, indirect lighting.</li>
              <li>Look at the camera lens, not the screen.</li>
              <li>Speak slowly and clearly.</li>
              <li>It’s okay to pause and gather your thoughts.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
