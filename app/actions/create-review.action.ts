'use server';

import { updateTag } from 'next/cache';

export async function createReviewAction(_state: unknown, formData: FormData) {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!content || !author || !bookId) {
    return {
      status: false,
      error: 'Input review content and author',
    };
    // app/components/review-editor.tsx의 useActionState() 함수의 state에 값을 전달하기 위해
    // return의 결과를 명시함.
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      { method: 'POST', body: JSON.stringify({ bookId, content, author }) }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to create review: ${response.statusText} ${response.status}`
      );
    }
    // 5. 태그 기준, 데이터 캐시 즉시 만료 (Server Action에서는 updateTag 사용)
    // app/book/[id]/page.tsx 에서 ReviewList() 함수를 다시 재생성
    updateTag(`reviews-${bookId}`);
    // revalidatePath(`/book/${bookId}`);
    return {
      status: true,
      error: '',
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      error: `Failed to create review: ${error}`,
    };
  }
}

// revalidate 함수는 서버에서만 실행됨
// 1. 특정 주소의 해당하는 페이지만 재검증
// revalidatePath('/book/${bookId}');
// 2. 특정 경로의 모든 동적 페이지를 재검증
// revalidatePath('/book/[id]', 'page');
// 3. 특정 레이아웃을 갖는 모든 페이지의 재검증
// revalidatePath('(with-searchbar)', 'layout');
// 4. 모든 데이터 재검증
// revalidatePath('/', 'layout');
// 5. 태그 기준, 데이터 캐시 재검증
// - revalidateTag('review-${bookId}', 'max'): stale-while-revalidate (오래된 데이터 제공하면서 백그라운드 갱신)
// - updateTag('review-${bookId}'): 즉시 캐시 만료 (Server Action 전용, read-your-own-writes)
