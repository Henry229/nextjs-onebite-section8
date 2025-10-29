import Link from 'next/link';
import { BookData } from '../types/types';
import Image from 'next/image';

type BookItemProps = Pick<
  BookData,
  'id' | 'title' | 'subTitle' | 'author' | 'publisher' | 'coverImgUrl'
>;

export default function BookItem({
  id,
  title,
  subTitle,
  author,
  publisher,
  coverImgUrl,
}: BookItemProps) {
  return (
    <Link
      href={`/book/${id}`}
      className='flex items-center gap-4 border-b border-gray-800 p-4'
    >
      <div className='relative w-24 h-32 shrink-0'>
        <Image
          src={coverImgUrl}
          alt={title}
          fill
          className='object-cover rounded-md'
          loading='eager'
          sizes='96px'
        />
      </div>
      <div>
        <h3 className='text-lg font-bold'>{title}</h3>
        <p className='text-md text-gray-300 line-clamp-2 mb-4'>{subTitle}</p>
        <p className='text-sm text-gray-500'>
          {author} | {publisher}
        </p>
      </div>
    </Link>
  );
}
