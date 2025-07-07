import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import BoardActions from '@/components/board/BoardActions';
import { getBoardPosts, type BoardPost } from '@/utils/boardStorage';

import { Navigation } from '@/components/ui/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function BoardList() {
  const [posts, setPosts] = useState<BoardPost[]>([]);

  console.log('BoardList posts:', posts);

  useEffect(() => {
    setPosts(getBoardPosts());
  }, []);

  return (
    <>
      <Navigation />
      <div className="m-auto mt-6 min-h-140 w-full max-w-8/10">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead className="w-2/12 text-center">카테고리</TableHead>
              <TableHead className="w-6/12 text-center">글제목</TableHead>
              <TableHead className="w-2/12 text-center">작성자</TableHead>
              <TableHead className="w-2/12 text-center">작성일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length ? (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="p-3 text-sm">{post.id}</TableCell>
                  <TableCell className="w-2/12 text-center">{post.category}</TableCell>
                  <TableCell>
                    <Link to={`/board/detail/${post.id}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell className="w-2/12 text-center">{post.author}</TableCell>
                  <TableCell className="w-2/12 text-center">{post.date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-120 border-b-1 border-b-gray-200 text-center align-middle text-xs text-gray-500">
                  조회된 게시글이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <BoardActions />
    </>
  );
}
