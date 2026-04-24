import { notFound } from 'next/navigation';
import {
  getVideoById,
  getVideosByType,
} from '../../../features/videos/services/videoServerService';
import { getCommentsByVideoId } from '../../../features/comments/services/commentService';
import MediaPageContent from './MediaPageContent';

function shuffled(arr) {
  return arr
    .map((v) => ({ v, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(({ v }) => v);
}

export default async function MediaPage({ params }) {
  const { content } = await params;

  let video;
  try {
    video = await getVideoById(content);
  } catch {
    notFound();
  }

  const [rawRelatedVideos, comments] = await Promise.all([
    video.type ? getVideosByType(video.type, video.id) : Promise.resolve([]),
    getCommentsByVideoId(video.id),
  ]);

  const relatedVideos = shuffled(rawRelatedVideos);

  return (
    <MediaPageContent
      key={content}
      video={video}
      relatedVideos={relatedVideos}
      comments={comments}
    />
  );
}
