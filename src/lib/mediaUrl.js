const CDN = process.env.NEXT_PUBLIC_CDN_BASE_URL;

const defaultAvatar =
  'https://d2d8wkqybl2mij.cloudfront.net/public/default-avatar.jpg';
const defaultThumbnail =
  'https://d2d8wkqybl2mij.cloudfront.net/public/default_thumbnail.png';

export function avatarUrl(s3Key) {
  if (!s3Key) return defaultAvatar;
  return `${CDN}/${s3Key}`;
}

export function thumbnailUrl(s3Key) {
  if (!s3Key) return defaultThumbnail;
  return `${CDN}/${s3Key}.jpg`;
}

export function videoUrl(s3Key) {
  if (!s3Key) return null;
  return `${CDN}/${s3Key}.mp4`;
}

