import {
  searchVideos,
  searchProfessionals,
} from '../../../features/search/services/searchServices';
import PageHeader from '../../../components/layout/PageHeader';
import SearchResults from './SearchResults';
import ProfessionalResults from './ProfessionalResults';
import SearchTypeDropdown from './SearchTypeDropdown';

export default async function SearchPage({ searchParams }) {
  const { q, type } = await searchParams;
  const query = q?.trim() ?? '';
  const searchType = type === 'professionals' ? 'professionals' : 'videos';

  const results = query
    ? searchType === 'professionals'
      ? await searchProfessionals(query)
      : await searchVideos(query)
    : [];

  const resultCount = results.length;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8">
      <div className="flex flex-col gap-3">
        <PageHeader
          title={query ? `Results for "${query}"` : 'Search'}
          subtext={
            query
              ? `${resultCount} ${searchType === 'professionals' ? 'professional' : 'video'}${resultCount !== 1 ? 's' : ''} found`
              : 'Enter a search term to find videos or professionals'
          }
        />
        <SearchTypeDropdown currentType={searchType} query={query} />
      </div>

      {resultCount === 0 && query && (
        <p className="text-center text-gray-500">
          No {searchType} found matching &ldquo;{query}&rdquo;.
        </p>
      )}

      {searchType === 'professionals' ? (
        <ProfessionalResults professionals={results} />
      ) : (
        <SearchResults videos={results} />
      )}
    </div>
  );
}
