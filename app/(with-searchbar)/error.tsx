'use client';

import { useEffect, startTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div>
      <h3 className='text-2xl font-bold text-red-500'>
        Error: {error.message}
      </h3>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버컴포넌트들을 다시 불러옴
            reset(); // 에러 상태를 초기화, 컴포넌트들을 다시 렌더링
          });
        }}
        className='bg-blue-500 text-white px-4 py-2 rounded-md'
      >
        Reset
      </button>
    </div>
  );
}
