import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';

const s3 = new S3Client({ region: process.env.AWS_REGION });

const MAX_FILE_SIZE = {
  avatar: 10 * 1024 * 1024, // 10MB
  video: 500 * 1024 * 1024, // 500MB
  thumbnail: 10 * 1024 * 1024, // 10MB
};

export async function POST(req) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { fileType, fileSize, mediaType } = await req.json();
  const userId = user.id;

  const maxSize = MAX_FILE_SIZE[mediaType];
  if (!maxSize) {
    return NextResponse.json({ error: 'Invalid mediaType' }, { status: 400 });
  }
  if (fileSize > maxSize) {
    return NextResponse.json({ error: 'File too large' }, { status: 413 });
  }

  const ext = fileType.split('/')[1];
  const uuid = crypto.randomUUID();
  const key =
    mediaType === 'avatar'
      ? `avatars/${userId}-${Date.now()}.${ext}`
      : mediaType === 'video'
      ? `videos/${userId}/${uuid}/${uuid}.${ext}`
      : `thumbnails/${userId}/${uuid}/${uuid}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    ContentType: fileType,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 300 });
  return NextResponse.json({ url, key });
}
