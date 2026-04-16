import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';

const s3 = new S3Client({ region: process.env.AWS_REGION });

const MAX_FILE_SIZE = {
  avatar: 10 * 1024 * 1024, // 10MB
  video: 500 * 1024 * 1024, // 500MB
  thumbnail: 10 * 1024 * 1024, // 10MB
};

export async function POST(req) {
  const { userId, fileType, fileSize, mediaType } = await req.json();

  const maxSize = MAX_FILE_SIZE[mediaType];
  if (!maxSize) {
    return NextResponse.json({ error: 'Invalid mediaType' }, { status: 400 });
  }
  if (fileSize > maxSize) {
    return NextResponse.json({ error: 'File too large' }, { status: 413 });
  }

  const ext = fileType.split('/')[1];
  const key = `${mediaType}s/${userId}/${crypto.randomUUID()}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    ContentType: fileType,
    ContentLength: fileSize,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 300 });
  return NextResponse.json({ url, key });
}
