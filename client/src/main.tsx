import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home';
import BoardList from './pages/board/BoardList';
import BoardDetail from './pages/board/BoardDetail';
import BoardWrite from './pages/board/BoardWrite';
import '@/index.css';

// 라우터 설정
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />, // 기본 경로
  },
  {
    path: '/board/list',
    element: <BoardList />, // 게시판 리스트
  },
  {
    path: '/board/detail/:postId',
    element: <BoardDetail />, // 게시판 상세페이지
  },
  {
    path: '/board/write',
    element: <BoardWrite />, // 게시판 글쓰기페이지
  },
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
