import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';

const s3 = new S3Client({ region: process.env.AWS_REGION });

const MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500MB
const MAX_THUMBNAIL_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  if (profile?.role !== 'professional') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { videoFileType, videoFileSize, thumbnailFileType, thumbnailFileSize } =
    await req.json();

  if (videoFileSize > MAX_VIDEO_SIZE) {
    return NextResponse.json({ error: 'Video file too large' }, { status: 413 });
  }
  if (thumbnailFileSize > MAX_THUMBNAIL_SIZE) {
    return NextResponse.json(
      { error: 'Thumbnail file too large' },
      { status: 413 }
    );
  }

  const uuid = crypto.randomUUID();
  const baseKey = `videos/${user.id}/${uuid}/${uuid}`;

  const [videoUploadUrl, thumbnailUploadUrl] = await Promise.all([
    getSignedUrl(
      s3,
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${baseKey}.mp4`,
        ContentType: videoFileType,
      }),
      { expiresIn: 3600 }
    ),
    getSignedUrl(
      s3,
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${baseKey}.jpg`,
        ContentType: thumbnailFileType || 'image/jpeg',
      }),
      { expiresIn: 3600 }
    ),
  ]);

  return NextResponse.json({ videoUploadUrl, thumbnailUploadUrl, s3Key: baseKey });
}
