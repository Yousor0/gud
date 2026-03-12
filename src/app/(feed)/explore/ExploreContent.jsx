'use client';

import { useState } from 'react';
import VideoCarousel from '../../../features/videos/components/VideoCarousel';
import ExploreProCard from './ExploreProCard';

const TYPE_ORDER = ['fitness', 'nutrition'];

export default function ExploreContent({ professionals, fitnessTagGroups, nutritionTagGroups }) {
  const [tab, setTab] = useState('videos');
  const [videoType, setVideoType] = useState('fitness');

  const sortedProfessionals = [...professionals].sort(
    (a, b) => TYPE_ORDER.indexOf(a.content_type) - TYPE_ORDER.indexOf(b.content_type)
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Main dropdown */}
      <div className="flex justify-center">
        <select
          value={tab}
          onChange={(e) => setTab(e.target.value)}
        >
          <option value="videos">Videos</option>
          <option value="professionals">Professionals</option>
        </select>
      </div>

      {/* Professionals grid */}
      {tab === 'professionals' && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProfessionals.map((pro) => (
            <ExploreProCard key={pro.user_id} pro={pro} />
          ))}
        </div>
      )}

      {/* Videos by type + tag */}
      {tab === 'videos' && (
        <div className="flex flex-col gap-6">
          {/* Video type dropdown */}
          <div className="flex justify-center">
            <select
              value={videoType}
              onChange={(e) => setVideoType(e.target.value)}
            >
              <option value="fitness">Fitness</option>
              <option value="nutrition">Nutrition</option>
            </select>
          </div>

          {videoType === 'fitness' && fitnessTagGroups.map(([tag, tagVideos]) => (
            <VideoCarousel
              key={tag}
              sectionTitle={tag.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              videoAPI={tagVideos}
            />
          ))}

          {videoType === 'nutrition' && nutritionTagGroups.map(([tag, tagVideos]) => (
            <VideoCarousel
              key={tag}
              sectionTitle={tag.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              videoAPI={tagVideos}
            />
          ))}
        </div>
      )}
    </div>
  );
}
