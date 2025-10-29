'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const [search, setSearch] = useState(q || '');

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1 w-full mb-8'>
      <input
        type='text'
        placeholder='Search...'
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        className='w-full sm:flex-1 border border-gray-300 rounded-md p-2'
      />
      <button
        onClick={onSubmit}
        className='bg-blue-500 text-white px-4 py-2 rounded-md whitespace-nowrap'
      >
        Search
      </button>
    </div>
  );
}
