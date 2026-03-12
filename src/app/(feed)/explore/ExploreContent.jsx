'use client';

import { useState } from 'react';
import VideoCarousel from '../../../features/videos/components/VideoCarousel';
import ExploreProCard from './ExploreProCard';

export default function ExploreContent({ professionals, fitnessTagGroups, nutritionTagGroups }) {
  const [tab, setTab] = useState('videos');
  const [videoType, setVideoType] = useState('fitness');

  return (
    <div className="flex flex-col gap-8">
      {/* Switcher */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setTab('videos')}
          className={`rounded-full px-6 py-2 text-base font-medium duration-150 ${
            tab === 'videos'
              ? 'bg-brand-primary text-white'
              : 'border-bg-accent border text-black/70 hover:bg-gray-100'
          }`}
        >
          Videos
        </button>
        <button
          onClick={() => setTab('professionals')}
          className={`rounded-full px-6 py-2 text-base font-medium duration-150 ${
            tab === 'professionals'
              ? 'bg-brand-primary text-white'
              : 'border-bg-accent border text-black/70 hover:bg-gray-100'
          }`}
        >
          Professionals
        </button>
      </div>

      {/* Professionals grid */}
      {tab === 'professionals' && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {professionals.map((pro) => (
            <ExploreProCard key={pro.user_id} pro={pro} />
          ))}
        </div>
      )}

      {/* Videos by type + tag */}
      {tab === 'videos' && (
        <div className="flex flex-col gap-6">
          {/* Video type sub-switcher */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setVideoType('fitness')}
              className={`rounded-full px-6 py-2 text-base font-medium duration-150 ${
                videoType === 'fitness'
                  ? 'bg-blue-two text-white'
                  : 'border-bg-accent border text-black/70 hover:bg-gray-100'
              }`}
            >
              Fitness
            </button>
            <button
              onClick={() => setVideoType('nutrition')}
              className={`rounded-full px-6 py-2 text-base font-medium duration-150 ${
                videoType === 'nutrition'
                  ? 'bg-green-two text-white'
                  : 'border-bg-accent border text-black/70 hover:bg-gray-100'
              }`}
            >
              Nutrition
            </button>
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
