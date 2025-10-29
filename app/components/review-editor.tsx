'use client';
// review를 작성시 '작성하기' 버튼을 클릭후에 버튼을 diable시키거나 loading 표시가 되어
// 버튼이 또 눌려지는 것을 방지하기 위해 이 review-editor를 server component에서 client component로 변경함.

import { createReviewAction } from '../actions/create-review.action';
import { useActionState } from 'react';
import { useEffect } from 'react';

export default function ReviewEditor({ bookId }: { bookId: string }) {
  // 위의 문제를 구현하기 위해 useActionState(react19에서 추가된 기능)를 사용함.
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    undefined
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <div className='mx-auto p-4 space-y-4'>
      <h2 className='text-xl font-bold'>Review Editor</h2>
      <form className='space-y-4' action={formAction}>
        <input
          required
          type='text'
          name='bookId'
          value={bookId}
          hidden
          readOnly
        />
        <input
          required
          type='textarea'
          name='content'
          disabled={isPending}
          placeholder='Review....'
          className='w-full p-2 rounded-md border border-gray-300 resize-vertical h-24'
        />
        <div className='flex items-center justify-end gap-2'>
          <input
            required
            type='text'
            name='author'
            disabled={isPending}
            placeholder='Author...'
            className='w-1/3 p-2 rounded-md border border-gray-300'
          />
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded-md whitespace-nowrap cursor-pointer'
            disabled={isPending}
          >
            {isPending ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
