import Enemies from '../components/battle/enemies/Enemies';
import Quiz from '../components/battle/quiz/Quiz';
import Friends from '../components/battle/friends/Friends';
import classes from './Battle.module.css';
import { useEffect, useState } from 'react';

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

const MORAL_UP_NUM = 0.05;

const Battle = () => {
  const [morale, setMorale] = useState(1);
  const [friends, setFriends] = useState([]);
  const [enemies, setEnemies] = useState([]);

  useEffect(() => {
    const friends = FRIENDS.map((friend) => {
      friend.currentHp = friend.maxHp;
      return friend;
    });
    setFriends(friends);

    const enemies = ENEMIES.map((enemy) => {
      enemy.currentHp = enemy.maxHp;
      return enemy;
    });
    setEnemies(enemies);
  }, []);

  const moraleUpHandler = () => {
    setMorale((prevState) => parseFloat((prevState + MORAL_UP_NUM).toFixed(2)));
  };

  const moraleDownHandler = () => {
    setMorale((prevState) => {
      const result = parseFloat((prevState - MORAL_UP_NUM * 2).toFixed(2));

      if (result <= 0.5) {
        return 0.5;
      }

      return result;
    });
  };

  return (
    <div>
      <div className={classes['morale']}>{morale}</div>
      <Enemies data={enemies} />
      <Quiz
        data={QUIZZES}
        onMoraleUp={moraleUpHandler}
        onMoraleDown={moraleDownHandler}
      />
      <Friends data={friends} />
    </div>
  );
};

export default Battle;
