import { useNavigate, useLocation } from 'react-router';
import { Button } from '@/components/ui/button';

// Type 지정
type BoardActionsProps = {
  className?: string;
  onWrite?: () => void;
};

export default function BoardActions({ className, onWrite }: BoardActionsProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isListPage = pathname.includes('/board/list');
  const isWritePage = pathname.includes('/board/write');

  return (
    <div className={`m-auto flex w-full max-w-8/10 justify-between gap-2 ${className || ''}`}>
      {!isListPage && (
        <Button variant="outline" onClick={() => navigate('/board/list')}>
          리스트
        </Button>
      )}

      {!isWritePage && (
        <Button variant="outline" className="ml-auto" onClick={() => navigate('/board/write')}>
          글쓰기
        </Button>
      )}

      {isWritePage && (
        <Button variant="default" className="ml-auto" onClick={onWrite}>
          글작성
        </Button>
      )}
    </div>
  );
}
