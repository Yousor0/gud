'use client';

import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';

export default function VideoPlayer({ publicId }) {
  return (
    <CldVideoPlayer
      src={publicId}
      width={1280}
      height={720}
      className="w-full rounded-sm"
      controls
    />
  );
}
