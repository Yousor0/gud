import { notFound } from 'next/navigation';
import { getVideoById } from '../../../features/videos/services/videoService';
import MediaPageContent from './MediaPageContent';

export default async function MediaPage({ params }) {
  const { content } = await params;

  let video;
  try {
    video = await getVideoById(content);
  } catch {
    notFound();
  }

  return <MediaPageContent key={content} video={video} />;
}
