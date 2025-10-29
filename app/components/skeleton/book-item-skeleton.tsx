export default function BookItemSkeleton() {
  return (
    <div className='flex gap-2 p-4 border-b border-gray-800'>
      <div className='w-[80px] h-[105px] rounded-md bg-gray-800 animate-pulse'></div>
      <div className='flex flex-col space-y-2 flex-1'>
        <div className='h-4 w-3/4 bg-gray-800 animate-pulse'></div>
        <div className='h-4 w-1/2 bg-gray-800 animate-pulse'></div>
        <br />
        <div className='h-4 w-1/4 bg-gray-800 animate-pulse'></div>
      </div>
    </div>
  );
}
