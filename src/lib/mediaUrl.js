const CDN = process.env.NEXT_PUBLIC_CDN_BASE_URL;

export function avatarUrl(s3Key) {
  if (!s3Key) return '/default-avatar.jpg';
  return `${CDN}/${s3Key}`;
}

export function thumbnailUrl(s3Key) {
  if (!s3Key) return '/default-thumbnail.jpg';
  return `${CDN}/${s3Key}`;
}

export function videoUrl(s3Key) {
  return `${CDN}/${s3Key}`;
}
