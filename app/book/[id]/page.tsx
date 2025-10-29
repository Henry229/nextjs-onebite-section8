import Image from 'next/image';
import { BookData } from '@/app/types/types';
import { notFound } from 'next/navigation';
import { createReviewAction } from '@/app/actions/create-review.action';

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

function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <div className='mx-auto p-4 space-y-4'>
      <h2 className='text-xl font-bold'>Review Editor</h2>
      <form className='space-y-4' action={createReviewAction}>
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
          type='text'
          name='content'
          placeholder='Review....'
          className='w-full p-2 rounded-md border border-gray-300'
        />
        <input
          required
          type='text'
          name='author'
          placeholder='Author...'
          className='w-full p-2 rounded-md border border-gray-300'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded-md whitespace-nowrap'
        >
          Submit
        </button>
      </form>
    </div>
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
    </div>
  );
}
