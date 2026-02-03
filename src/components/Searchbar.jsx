import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Searchbar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-full min-w-60 items-center gap-2 justify-self-start rounded-md border pl-3 sm:max-w-md md:max-w-xl lg:max-w-2xl"
    >
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full text-sm focus:outline-none sm:text-base"
      />
      {/* Search Button */}
      <button
        transition={{ duration: 0.3 }}
        type="submit"
        className="flex items-center justify-center gap-2 rounded-tr-sm rounded-br-sm bg-[#9D4431] px-5 py-2 text-[#FAF7F3] duration-300 hover:bg-[#D07A64]"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        Search
      </button>
    </form>
  );
}
