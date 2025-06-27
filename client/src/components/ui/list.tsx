import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type SubjectAlertProps = {
  subject: string;
};

function SubjectAlert({ subject }: SubjectAlertProps) {
  return (
    <Alert className="mb-4">
      <AlertTitle>{subject}</AlertTitle>
      <AlertDescription>날짜날짜</AlertDescription>
    </Alert>
  );
}

function List() {
  let [subjects, setSubject] = useState(['남자 코트 추천', '강남 우동맛집', '파이썬독학', 'asdbsdf', '글이 여러개입니다']);
  let [likes, setLikes] = useState([0, 0, 0, 0, 0]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const changeSubject = () => {
    const newSubjects = [...subjects];

    newSubjects[0] = '제목 변경';
    setSubject(newSubjects);
  };

  const sortSubject = () => {
    const newSubjects = [...subjects].sort();

    setSubject(newSubjects);
  };

  const onLike = (idx: number) => {
    const newLikes = [...likes];
    newLikes[idx] = newLikes[idx] + 1;
    setLikes(newLikes);
  };

  return (
    <>
      <ul className="mt-4 mb-4">
        {subjects.map((subject, idx) => (
          <li key={idx} className="flex justify-between items-center border-b-1 border-b-gray-200 p-2">
            <p
              onClick={() => {
                setSelectedIndex(idx);
              }}>
              {subject}
            </p>
            <span
              className="cursor-pointer"
              onClick={() => {
                onLike(idx);
              }}>
              ✋🏻 {likes[idx]}
            </span>
            <p className="ml-auto">2월 17일 발행</p>
          </li>
        ))}
      </ul>

      {selectedIndex !== null && <SubjectAlert subject={subjects[selectedIndex]} />}

      <div className="flex gap-2">
        <Button onClick={changeSubject}>Click me</Button>
        <Button onClick={sortSubject}>가나다순정렬</Button>
      </div>
    </>
  );
}

export { List };
