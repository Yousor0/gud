import React from 'react';
import Carasoul from '../../../components/VideoCarasoul';
import { videos } from '../../../data/videos';

export default function page() {
  const fitnessVideos =  videos.filter(video => video.type === 'Fitness');
  const nutritionVideos =  videos.filter(video => video.type === 'Nutrition');


  return (
    <div className="my-20 px-8 sm:px-10 md:px-10 lg:px-20 xl:px-30">
      <div className="flex flex-col gap-4">
        <h1 className="page-title pl-5">Explore</h1>
        <Carasoul
          videoAPI={videos}
          sectionTitle={'Continue Where You Left Off'}
        />
        <Carasoul videoAPI={fitnessVideos} sectionTitle={'Fitness'} />
        <Carasoul videoAPI={nutritionVideos} sectionTitle={'Nutrition'} />
      </div>
    </div>
  );
}
