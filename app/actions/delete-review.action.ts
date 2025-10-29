'use server';

import { updateTag } from 'next/cache';

export async function deleteReviewAction(_: any, formData: FormData) {
  const reviewId = formData.get('reviewId')?.toString();
  const bookId = formData.get('bookId')?.toString();
  if (!reviewId) {
    return { status: false, error: 'Review ID is required' };
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      { method: 'DELETE' }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete review: ${response.statusText}`);
    }

    updateTag(`reviews-${bookId}`);

    return { status: true, error: '' };
  } catch (error) {
    console.error(error);
    return { status: false, error: `Failed to delete review: ${error}` };
  }
}
