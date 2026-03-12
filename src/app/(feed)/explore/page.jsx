import PageHeader from '../../../components/layout/PageHeader';
import { createClient } from '../../../lib/supabase/server';
import ExploreContent from './ExploreContent';

const OMITTED_TAGS = ['fitness', 'nutrition'];

function groupByFirstTag(videos) {
  const groups = {};
  for (const video of videos) {
    const tag = video.tags?.find((t) => !OMITTED_TAGS.includes(t)) ?? 'Other';
    if (!groups[tag]) groups[tag] = [];
    groups[tag].push(video);
  }
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
}

export default async function page() {
  const supabase = await createClient();

  const [{ data: videos }, { data: professionals }] = await Promise.all([
    supabase.from('videos').select('*, profiles(username, avatar_public_id)').order('created_at', { ascending: false }),
    supabase.from('full_professional_profiles').select('*'),
  ]);

  const fitnessVideos = (videos ?? []).filter((v) => v.type === 'fitness');
  const nutritionVideos = (videos ?? []).filter((v) => v.type === 'nutrition');

  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        title="Get a GÜD workout from Home"
        subtext="At-home workouts and nutritional guidance tailored too you"
      />

      <section className="mx-auto flex w-full max-w-md flex-col gap-4 px-10 sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-7xl">
        <h2 className="section-title">Explore our Library</h2>
        <ExploreContent
          professionals={professionals ?? []}
          fitnessTagGroups={groupByFirstTag(fitnessVideos).filter(([, videos]) => videos.length >= 5)}
          nutritionTagGroups={groupByFirstTag(nutritionVideos).filter(([, videos]) => videos.length >= 3)}
        />
      </section>
    </div>
  );
}
