import React from 'react';
import VideoCarousel from '../../../features/videos/components/VideoCarousel';
import ProfileCarousel from '../../../components/ProfileCarousel';
import PageHeader from '../../../components/layout/PageHeader';

export default async function page() {
  const videos = await getAllVideos();

  // Random Videos Filters by Type
  const fitnessVideos = videos
    .filter((video) => video.type === 'Fitness')
    .sort(() => Math.random() - 0.5);
  const nutritionVideos = videos
    .filter((video) => video.type === 'Nutrition')
    .sort(() => Math.random() - 0.5);

  // Profile Filters by Type
  const fitnessProfiles = users.filter((user) => user.type === 'Fitness');
  const nutritionProfiles = users.filter((user) => user.type === 'Nutrition');

  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        title="Get a GÜD workout from Home"
        subtext="At-home workouts and nutritional guidance tailored too you"
      />

      {/* Profiles */}
      <section className="mx-auto flex w-full max-w-md flex-col px-5 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <h1 className="section-title">Our Professionals</h1>
        <ProfileCarousel
          usersAPI={fitnessProfiles}
          sectionTitle={'Fitness Trainers'}
        />
        <ProfileCarousel
          usersAPI={nutritionProfiles}
          sectionTitle={'Nutritionists'}
        />
      </section>

      {/* Videos */}
      <section className="mx-auto flex w-full max-w-md flex-col px-10 sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-7xl">
        <h1 className="section-title">Explore our Library</h1>
        <VideoCarousel
          videoAPI={videos}
          sectionTitle={'Continue Where You Left Off'}
        />
        <VideoCarousel videoAPI={fitnessVideos} sectionTitle={'Fitness'} />
        <VideoCarousel videoAPI={nutritionVideos} sectionTitle={'Nutrition'} />
      </section>
    </div>
  );
}
