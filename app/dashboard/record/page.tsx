'use client';

import { useCallback, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Circle, Square } from 'lucide-react';

const Webcam = dynamic(() => import('react-webcam').then(m => m.default as any), { ssr: false }) as any;

export default function RecordPage() {
  const webcamRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [chunks, setChunks] = useState<BlobPart[]>([]);
  const [saving, setSaving] = useState(false);

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
    // Phase 2 will upload to Supabase Storage and create DB rows.
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    alert('Saved locally (demo). In the next phase, this uploads to Supabase.');
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gold/20 bg-background-card/60 p-6 shadow-glow">
        <div className="text-lg font-heading text-gold">Record a New Video</div>
        <div className="text-sm text-text-secondary">Speak from the heart. You can always re-record.</div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="border-gold/20 bg-background-card/60">
          <CardHeader>
            <CardTitle className="text-gold">Camera</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
                  <Circle className="mr-2 h-4 w-4" /> Start Recording
                </Button>
              ) : (
                <Button size="lg" variant="outline" onClick={handleStop}>
                  <Square className="mr-2 h-4 w-4" /> Stop
                </Button>
              )}
              {previewUrl && (
                <Button size="lg" onClick={handleSave} disabled={saving}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Keep This Recording'}
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
