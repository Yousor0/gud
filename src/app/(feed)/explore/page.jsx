import React from 'react';
import Carasoul from '../../../components/VideoCarasoul';
import ProfileCarasoul from '../../../components/ProfileCarasoul';
import { videos } from '../../../data/videos';
import { users } from '../../../data/users';
import PageHeader from '../../../components/PageHeader';
import headerImage from '../../../../public/login02.png';

export default function page() {
  const fitnessVideos = videos
    .filter((video) => video.type === 'Fitness')
    .sort(() => Math.random() - 0.5);
  const nutritionVideos = videos
    .filter((video) => video.type === 'Nutrition')
    .sort(() => Math.random() - 0.5);

  const fitnessProfiles = users.filter((user) => user.type === 'Fitness');
  const nutritionProfiles = users.filter((user) => user.type === 'Nutrition');

  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        title="Get a GÜD workout from Home"
        subtext="At-home workouts and nutritional guidance tailored too you"
        image={headerImage}
      />

      {/* Profiles */}
      <section className="mx-auto flex w-full max-w-md flex-col px-5 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <h1 className="section-title">Our Professionals</h1>
        <ProfileCarasoul
          usersAPI={fitnessProfiles}
          sectionTitle={'Fitness Trainers'}
        />
        <ProfileCarasoul
          usersAPI={nutritionProfiles}
          sectionTitle={'Nutritionists'}
        />
      </section>

      {/* Videos */}
      <section className="mx-auto flex w-full max-w-md flex-col px-5 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <h1 className="section-title">Explore our Library</h1>
        <Carasoul
          videoAPI={videos}
          sectionTitle={'Continue Where You Left Off'}
        />
        <Carasoul videoAPI={fitnessVideos} sectionTitle={'Fitness'} />
        <Carasoul videoAPI={nutritionVideos} sectionTitle={'Nutrition'} />
      </section>
    </div>
  );
}
