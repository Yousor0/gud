import React from 'react';
import Carasoul from '../../../components/VideoCarasoul';
import { videos } from '../../../data/videos';

export default function page() {
  return (
    <div className="my-20 px-8 sm:px-10 md:px-10 lg:px-20 xl:px-30">
      <div className="flex flex-col gap-4">
        <h1 className="page-title pl-5">Explore</h1>
        <Carasoul
          videoAPI={videos}
          sectionTitle={'Continue Where You Left Off'}
        />
        <Carasoul videoAPI={videos} sectionTitle={'Fitness'} />
        <Carasoul videoAPI={videos} sectionTitle={'Nutrition'} />
      </div>
    </div>
  );
}
