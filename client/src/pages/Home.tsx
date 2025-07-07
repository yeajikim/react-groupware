import { useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type SubjectAlertProps = {
  subject: string;
  className?: string;
  date: string;
  onSubject?: () => void;
};

function SubjectAlert({ subject, className, date, onSubject }: SubjectAlertProps) {
  return (
    <Alert className={`mb-6 ${className || ''}`}>
      <AlertTitle>{subject}</AlertTitle>
      <AlertDescription>{date}</AlertDescription>
      <Button variant="secondary" size="sm" onClick={onSubject}>
        글수정
      </Button>
    </Alert>
  );
}

function Home() {
  let [modalVisible, setModalVisible] = useState(false);
  let [subjects, setSubject] = useState(['남자 코트 추천', '강남 우동맛집', '파이썬독학', 'asdbsdf', '글이 여러개입니다']);
  let [likes, setLikes] = useState([0, 0, 0, 0, 0]);

  let [title, setTitle] = useState(0);

  const changeSubject = () => {
    const newSubjects = [...subjects];

    newSubjects[0] = '제목 변경';
    setSubject(newSubjects);
  };

  const sortSubject = () => {
    const newSubjects = [...subjects].sort();

    setSubject(newSubjects);
  };

  const toggleModal = (idx: number) => {
    setTitle(idx);
    idx === title ? setModalVisible((prevVisible) => !prevVisible) : setModalVisible(true);
  };

  const onLike = (idx: number) => {
    const newLikes = [...likes];
    newLikes[idx] = newLikes[idx] + 1;
    setLikes(newLikes);
  };

  return (
    <div className="m-auto mt-4 mb-4 max-w-8/10">
      <Navigation />
      <ul className="mt-6 mb-6">
        {subjects.map((subject, idx) => (
          <li key={idx} className="flex items-center justify-between border-b-1 border-b-gray-200 p-2 text-sm">
            <p
              onClick={() => {
                toggleModal(idx);
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

      {modalVisible ? (
        <SubjectAlert className="bg-amber-50" subject={subjects[title]} date={'2025-06-27'} onSubject={changeSubject} />
      ) : null}

      <div className="flex gap-2">
        <Button onClick={changeSubject}>Click me</Button>
        <Button onClick={sortSubject}>가나다순정렬</Button>
      </div>
    </div>
  );
}

export default Home;
