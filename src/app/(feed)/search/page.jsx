import { searchVideos } from '../../../features/videos/services/videoService';
import PageHeader from '../../../components/layout/PageHeader';
import SearchResults from './SearchResults';

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';

  const videos = query ? await searchVideos(query) : [];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8">
      <PageHeader
        title={query ? `Results for "${query}"` : 'Search'}
        subtext={
          query
            ? `${videos.length} video${videos.length !== 1 ? 's' : ''} found`
            : 'Enter a search term to find videos'
        }
      />

      {videos.length === 0 && query && (
        <p className="text-center text-gray-500">
          No videos found matching &ldquo;{query}&rdquo;.
        </p>
      )}

      <SearchResults videos={videos} />
    </div>
  );
}
