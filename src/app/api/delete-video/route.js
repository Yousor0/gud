import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function POST(req) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { videoId, s3Key } = await req.json();

  // Verify ownership before doing anything
  const { data: video, error: fetchError } = await supabase
    .from('videos')
    .select('user_id')
    .eq('id', videoId)
    .single();

  if (fetchError || !video) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (video.user_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Delete video file and thumbnail from S3
  await Promise.all([
    s3.send(new DeleteObjectCommand({ Bucket: process.env.AWS_S3_BUCKET, Key: `${s3Key}.mp4` })),
    s3.send(new DeleteObjectCommand({ Bucket: process.env.AWS_S3_BUCKET, Key: `${s3Key}.jpg` })),
  ]);

  // Delete the DB record
  const { error: deleteError } = await supabase
    .from('videos')
    .delete()
    .eq('id', videoId);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
