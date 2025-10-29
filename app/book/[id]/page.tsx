import Image from 'next/image';
import { BookData, ReviewData } from '@/app/types/types';
import { notFound } from 'next/navigation';
import ReviewItem from '@/app/components/review-item';
import ReviewEditor from '@/app/components/review-editor';

// 동적페이지가 아래에서 정한 1,2,3 이 아닐경우 모드 notfound 페이지로 이동
// export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>Error in Book Detail: {response.statusText}</div>;
  }
  const book: BookData = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
    <div className='flex flex-col'>
      <div className='relative flex justify-center p-5 overflow-hidden min-h-[400px]'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverImgUrl}
          alt=''
          className='absolute inset-0 w-full h-full object-cover blur-xs scale-110 z-0'
        />
        <div className='absolute inset-0 bg-black/30 z-1' />
        <Image
          src={coverImgUrl}
          alt={title}
          width={300}
          height={350}
          className='relative z-10 max-h-[350px] h-full object-contain'
        />
      </div>
      <div className='p-4 space-y-4'>
        <h1 className='text-2xl font-bold'>{title}</h1>
        <p className='text-md text-gray-300'>{subTitle}</p>
        <p className='text-sm text-gray-500'>
          {author} | {publisher}
        </p>
        <div className='bg-gray-900/50 p-4 rounded-md'>
          <p className='text-sm text-gray-300 whitespace-pre-line'>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    {
      next: { tags: [`reviews-${bookId}`] },
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch reviews: ${response.statusText}`);
  }
  const reviews: ReviewData[] = await response.json();
  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </section>
  );
}

export default async function BookEachPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className='container mx-auto p-4 min-h-screen'>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
