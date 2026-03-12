import { notFound } from 'next/navigation';
import { getVideoById, getVideosByType } from '../../../features/videos/services/videoService';
import { getCommentsByVideoId } from '../../../features/comments/services/commentService';
import { createClient } from '../../../lib/supabase/server';
import MediaPageContent from './MediaPageContent';

export default async function MediaPage({ params }) {
  const { content } = await params;

  let video;
  try {
    video = await getVideoById(content);
  } catch {
    notFound();
  }

  const isProfessional = video.profiles?.role === 'professional';

  const [rawRelatedVideos, comments, professional] = await Promise.all([
    video.type ? getVideosByType(video.type, video.id) : Promise.resolve([]),
    getCommentsByVideoId(video.id),
    isProfessional
      ? createClient().then((supabase) =>
          supabase
            .from('professional_profiles')
            .select('content_type, specialties, certifications')
            .eq('user_id', video.user_id)
            .single()
            .then(({ data }) => data ?? null)
          .catch(() => null)
        )
      : Promise.resolve(null),
  ]);

  const relatedVideos = rawRelatedVideos.sort(() => Math.random() - 0.5);

  return (
    <MediaPageContent
      key={content}
      video={video}
      relatedVideos={relatedVideos}
      comments={comments}
      professional={professional}
    />
  );
}
