'use client';

import { useState } from 'react';
import VideoCarousel from '../../../features/videos/components/VideoCarousel';
import ExploreProCard from './ExploreProCard';

const TYPE_ORDER = ['fitness', 'nutrition'];

export default function ExploreContent({ professionals, fitnessTagGroups, nutritionTagGroups }) {
  const [tab, setTab] = useState('videos');
  const [videoType, setVideoType] = useState('fitness');

  const groupedProfessionals = TYPE_ORDER.map((type) => ({
    type,
    pros: professionals.filter((p) => p.content_type === type),
  })).filter(({ pros }) => pros.length > 0);

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
        <div className="flex flex-col gap-6">
          {groupedProfessionals.map(({ type, pros }) => (
            <div key={type} className="flex flex-col gap-3">
              <h3 className="sub-header">
                {type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {pros.map((pro) => (
                  <ExploreProCard key={pro.user_id} pro={pro} />
                ))}
              </div>
            </div>
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
