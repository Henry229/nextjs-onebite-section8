import BookItemSkeleton from './book-item-skeleton';

export default function BookListSkeleton({ count }: { count: number }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, idx) => (
        <BookItemSkeleton key={idx} />
      ))}
    </div>
  );
}
