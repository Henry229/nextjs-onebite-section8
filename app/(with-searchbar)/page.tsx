import BookItem from '../components/book-item';
import { BookData } from '../types/types';
import delay from '../util/delay';
import { Suspense } from 'react';
import BookListSkeleton from '../components/skeleton/book-list-skeleton';

//export const dynamic = '******';
//특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto: 기본값, 아무것도 강제하지 않음
// 2. force-dynamic: 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static: 페이지를 강제로 정적으로 렌더링
// 4. error: 페이지를 강제로 Static 페이지 설정 (설정하면 안되는 이유 -> 빌드 오류)

async function AllBooks() {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: 'force-cache' }
  );
  if (!response.ok) {
    return <div>Error in All Books: {response.statusText}</div>;
  }
  const allBooks: BookData[] = await response.json();
  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
  );
  if (!response.ok) {
    return <div>Error in Recommendation Books: {response.statusText}</div>;
  }
  const recoBooks: BookData[] = await response.json();
  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <div className='flex flex-col gap-4 min-h-screen space-y-8 p-4'>
      <section>
        <h3 className='text-2xl font-bold'>Featured Books</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3 className='text-2xl font-bold'>All Books</h3>
        <Suspense fallback={<BookListSkeleton count={10} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
