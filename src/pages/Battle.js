import Enemies from '../components/battle/enemies/Enemies';
import Quiz from '../components/battle/quiz/Quiz';
import Friends from '../components/battle/friends/Friends';
import Congrats from '../components/battle/congrats/Congrats';
import classes from './Battle.module.css';
import { useEffect, useState } from 'react';
import { getRandomTargetIndex } from '../util/util';

const ENEMIES = [
  {
    id: 1,
    name: 'enemy 1',
    maxHp: 10000,
    maxCount: 3,
    attack: 30,
  },
  // {
  //   id: 2,
  //   name: 'enemy 2',
  //   maxHp: 200,
  //   maxCount: 5,
  //   attack: 60,
  // },
  // {
  //   id: 3,
  //   name: 'enemy 3',
  //   maxHp: 300,
  //   maxCount: 4,
  //   attack: 90,
  // },
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
  {
    quiz: '15 + 5 = ?',
    options: [
      {
        id: 1,
        text: '20',
      },
      {
        id: 3,
        text: '10',
      },
      {
        id: 2,
        text: '15',
      },
      {
        id: 4,
        text: '25',
      },
    ],
  },
  {
    quiz: '15 + 10 = ?',
    options: [
      {
        id: 1,
        text: '25',
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
        text: '10',
      },
    ],
  },
];

const FRIENDS = [
  {
    id: 1,
    name: 'friends 1',
    maxHp: 400,
    attack: 5,
  },
  {
    id: 2,
    name: 'friends 2',
    maxHp: 300,
    attack: 10,
  },
  {
    id: 3,
    name: 'friends 3',
    maxHp: 200,
    attack: 40,
  },
  {
    id: 4,
    name: 'friends 4',
    maxHp: 200,
    attack: 40,
  },
  {
    id: 5,
    name: 'friends 5',
    maxHp: 200,
    attack: 40,
  },
  {
    id: 6,
    name: 'friends 6',
    maxHp: 200,
    attack: 40,
  },
];

const MORAL_UP_NUM = 0.05;

const Battle = () => {
  const [morale, setMorale] = useState(1);
  const [friends, setFriends] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [isClear, setIsClear] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(true);

  useEffect(() => {
    const friends = FRIENDS.map((friend) => {
      friend.currentHp = friend.maxHp;
      return friend;
    });
    setFriends(friends);

    const enemies = ENEMIES.map((enemy) => {
      enemy.currentHp = enemy.maxHp;
      enemy.currentCount = enemy.maxCount;
      return enemy;
    });
    setEnemies(enemies);
  }, []);

  const takeActionsHandler = () => {
    // process data
    const damagedEnemies = damageEnemies(enemies, friends);
    const minusCountedEnemies = minusEnemyCount(damagedEnemies);
    const { newEnemies, newFriends } = damageFriends(minusCountedEnemies);

    if (newEnemies.length === 0) {
      setIsClear(true);
      setIsQuizActive(false);
    }

    // update screen
    setEnemies(newEnemies);
    setFriends(newFriends);
  };

  const damageFriends = (enemies) => {
    let newFriends = friends;

    // each enemies take actions
    const newEnemies = enemies.map((enemy) => {
      if (enemy.currentCount > 0) {
        return enemy;
      }

      const damagedFriends = friends.map((friend) => {
        friend.currentHp -= enemy.attack;
        return friend;
      });

      newFriends = damagedFriends.filter((friend) => friend.currentHp > 0);

      enemy.currentCount = enemy.maxCount;
      return enemy;
    });

    return { newEnemies, newFriends };
  };

  const damageEnemies = (enemies, friends) => {
    let newEnemies = enemies;

    friends.forEach((friend) => {
      const targetId = getRandomTargetIndex(newEnemies);

      const damage = Math.ceil(friend.attack * morale);

      enemies[targetId].currentHp -= damage;

      newEnemies = enemies.filter((enemy) => enemy.currentHp > 0);
    });

    return newEnemies;
  };

  const minusEnemyCount = (enemies) => {
    const newEnemies = enemies.map((enemy) => {
      enemy.currentCount--;
      return enemy;
    });

    return newEnemies;
  };

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
      {enemies.length > 0 && <Enemies data={enemies} />}
      {isClear && <Congrats />}
      <Friends data={friends} />
      <Quiz
        data={QUIZZES}
        onTakeActions={takeActionsHandler}
        onMoraleUp={moraleUpHandler}
        onMoraleDown={moraleDownHandler}
        isActive={isQuizActive}
      />
    </div>
  );
};

export default Battle;
