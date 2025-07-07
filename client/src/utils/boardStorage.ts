const STORAGE_KEY = 'boardPosts';

export type BoardPost = {
  id: number;
  title: string;
  category: string;
  content: string;
  author: string;
  date: string;
};

export const getBoardPosts = (): BoardPost[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveBoardPosts = (post: BoardPost) => {
  const posts = getBoardPosts();
  posts.push(post);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};
