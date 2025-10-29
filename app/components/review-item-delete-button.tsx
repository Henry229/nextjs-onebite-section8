'use client';

import { deleteReviewAction } from '../actions/delete-review.action';
import { useActionState, useEffect, useRef } from 'react';

export default function ReviewItemDeleteButton({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    undefined
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input type='hidden' name='reviewId' value={reviewId} />
      <input type='hidden' name='bookId' value={bookId} />
      {isPending ? (
        <div>...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>Delete</div>
      )}
    </form>
  );
}
