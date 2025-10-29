import { ReviewData } from '../types/types';
import ReviewItemDeleteButton from './review-item-delete-button';

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  bookId,
}: ReviewData) {
  return (
    <div className='flex flex-col px-2 space-y-2 mb-6'>
      <div className='text-sm text-gray-500'>{author}</div>
      <div className='text-md text-gray-300 whitespace-pre-line bg-gray-900/50 p-2 rounded-md'>
        {content}
      </div>
      <div className='flex items-center justify-between'>
        <div className='text-sm text-gray-500'>
          {new Date(createdAt).toLocaleString()}
        </div>
        <div className='text-sm text-gray-500 cursor-pointer'>
          <ReviewItemDeleteButton reviewId={id} bookId={Number(bookId)} />
        </div>
      </div>
    </div>
  );
}
