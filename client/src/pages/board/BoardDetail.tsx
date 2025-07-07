import { useParams } from 'react-router';
import BoardActions from '@/components/board/BoardActions';
import { getBoardPosts } from '@/utils/boardStorage';
import { Navigation } from '@/components/ui/navigation';

export default function BoardDetail() {
  const { postId } = useParams();
  const postData = getBoardPosts().find((post) => post.id === Number(postId)) ?? null;

  return (
    <>
      <Navigation />
      <div className="m-auto mt-6 w-full max-w-8/10">
        <h2 className="flex items-center gap-1 text-2xl font-bold">
          <span className="align-middle text-lg font-normal">[{postData?.category}]</span>
          {postData?.title}
        </h2>
        <div className="align-center mt-2 flex gap-2 border-b-1 border-b-gray-300 pb-4 text-sm text-gray-500">
          <span>{postData?.author}</span>
          <span>{postData?.date}</span>
        </div>
        <div className="mt-8 min-h-120 text-sm">{postData?.content}</div>
      </div>
      <BoardActions />
    </>
  );
}
