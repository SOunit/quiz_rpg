import Enemies from '../components/battle/enemies/Enemies';
import Quiz from '../components/battle/quiz/Quiz';
import Friends from '../components/battle/friends/Friends';
import classes from './Battle.module.css';

const ENEMIES = [
  {
    id: 1,
    name: 'enemy 1',
    maxHp: 10,
    maxCount: 3,
  },
  {
    id: 2,
    name: 'enemy 2',
    maxHp: 20,
    maxCount: 5,
  },
  {
    id: 3,
    name: 'enemy 3',
    maxHp: 30,
    maxCount: 4,
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
    maxHp: 40,
  },
  {
    id: 2,
    name: 'friends 2',
    maxHp: 30,
  },
];

const Battle = () => {
  return (
    <div>
      <div className={classes['morale']}>1.25</div>
      <Enemies data={ENEMIES} />
      <Quiz data={QUIZZES} />
      <Friends data={FRIENDS} />
    </div>
  );
};

export default Battle;
