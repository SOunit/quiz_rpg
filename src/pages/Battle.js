import Enemies from '../components/enemies/Enemies';
import Quiz from '../components/quiz/Quiz';
import Friends from '../components/friends/Friends';

const ENEMIES = [
  {
    id: 1,
    name: 'enemy 1',
  },
  {
    id: 2,
    name: 'enemy 2',
  },
  {
    id: 3,
    name: 'enemy 3',
  },
];

const QUIZZES = [
  {
    quiz: '5 + 5 = ?',
    options: [
      {
        id: 1,
        text: '10',
      },
      {
        id: 2,
        text: '15',
      },
      {
        id: 3,
        text: '20',
      },
      {
        id: 4,
        text: '25',
      },
    ],
  },
];

const FRIENDS = [
  {
    id: 1,
    name: 'friends 1',
  },
  {
    id: 2,
    name: 'friends 2',
  },
];

const Battle = () => {
  return (
    <div>
      <Enemies data={ENEMIES} />
      <Quiz data={QUIZZES} />
      <Friends data={FRIENDS} />
    </div>
  );
};

export default Battle;
