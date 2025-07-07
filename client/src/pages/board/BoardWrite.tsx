import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { saveBoardPosts, getBoardPosts } from '@/utils/boardStorage';

import { useNavigate } from 'react-router';
import BoardActions from '@/components/board/BoardActions';
import { Navigation } from '@/components/ui/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// ✅ 스키마 정의
const FormSchema = z.object({
  category: z.enum(['전체보기', '공지사항', '자유게시판'], {
    required_error: '카테고리를 선택해주세요',
  }),
  title: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
  author: z.string().optional(), // 작성자 필드는 선택사항으로 설정
});

export default function BoardWrite() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: undefined,
      title: '',
      content: '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 포맷

    // ID 생성 로직 (가장 마지막 게시글의 ID + 1)
    const maxId = Math.max(...getBoardPosts().map((post) => post.id), 0);
    const newId = maxId + 1;

    const newPostData = {
      id: newId,
      title: data.title,
      category: data.category,
      content: data.content,
      author: data.author || '테스트',
      date: today,
    };

    saveBoardPosts(newPostData); // 게시글 저장
    form.reset(); // 폼 초기화

    navigate(`/board/detail/${newId}`); // 글 작성 후 바로 작성한 글로 이동
  };

  return (
    <>
      <Navigation />
      <div className="m-auto mt-6 w-full max-w-8/10">
        <h2 className="mb-4 text-2xl font-bold">글쓰기</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="말머리 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="전체보기">전체보기</SelectItem>
                            <SelectItem value="공지사항">공지사항</SelectItem>
                            <SelectItem value="자유게시판">자유게시판</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="제목을 입력해 주세요." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea placeholder="내용을 입력해 주세요." className="min-h-80 resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
      <BoardActions className="primary mt-10" onWrite={form.handleSubmit(onSubmit)} />
    </>
  );
}
