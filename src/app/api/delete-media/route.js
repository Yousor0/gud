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

  const { s3Key } = await req.json();

  // Verify the key belongs to the authenticated user
  if (!s3Key.includes(`/${user.id}/`)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: s3Key,
  });

  await s3.send(command);
  return NextResponse.json({ success: true });
}
