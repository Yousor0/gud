'use client';

import { SearchVideoCard } from '../../../features/videos/components/VideoCard';

export default function SearchResults({ videos }) {
  if (videos.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video) => (
        <SearchVideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
