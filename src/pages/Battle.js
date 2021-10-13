import Enemies from '../components/battle/enemies/Enemies';
import Quiz from '../components/battle/quiz/Quiz';
import Friends from '../components/battle/friends/Friends';
import classes from './Battle.module.css';
import { useEffect, useState } from 'react';

const ENEMIES = [
  {
    id: 1,
    name: 'enemy 1',
    maxHp: 100,
    maxCount: 3,
    attack: 3,
  },
  {
    id: 2,
    name: 'enemy 2',
    maxHp: 200,
    maxCount: 5,
    attack: 6,
  },
  {
    id: 3,
    name: 'enemy 3',
    maxHp: 30000,
    maxCount: 4,
    attack: 9,
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
];

const MORAL_UP_NUM = 0.05;

const Battle = () => {
  const [morale, setMorale] = useState(1);
  const [friends, setFriends] = useState([]);
  const [enemies, setEnemies] = useState([]);

  useEffect(() => {
    console.log('initial');
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
    console.log('damagedEnemies', damagedEnemies);

    const minusCountedEnemies = minusEnemyCount(damagedEnemies);

    const { newEnemies, newFriends } = damageFriends(minusCountedEnemies);
    console.log(newEnemies);
    console.log(newFriends);

    // update screen
    setEnemies(newEnemies);
    setFriends(newFriends);
  };

  const damageFriends = (enemies) => {
    let newFriends = friends;

    // each enemies take actions
    const newEnemies = enemies.map((enemy) => {
      console.log('enemy.currentCount', enemy.currentCount);
      if (enemy.currentCount > 0) {
        console.log('no action!');
        return enemy;
      }

      console.log('damage friends!');
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

  const getRandomTargetIndex = (enemies) => {
    const targetId = Math.floor(Math.random() * enemies.length);
    return targetId;
  };

  const damageEnemies = (enemies, friends) => {
    let newEnemies = enemies;

    friends.forEach((friend) => {
      console.log('friend.attack', friend.attack);

      const targetId = getRandomTargetIndex(newEnemies);

      const damage = Math.ceil(friend.attack * morale);
      enemies[targetId].currentHp -= damage;

      newEnemies = enemies.filter((enemy) => enemy.currentHp > 0);
    });

    return newEnemies;
  };

  const minusEnemyCount = (enemies) => {
    console.log('minusEnemyCountHandler');
    console.log(enemies);
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
      <Enemies data={enemies} />
      <Quiz
        data={QUIZZES}
        onTakeActions={takeActionsHandler}
        onMoraleUp={moraleUpHandler}
        onMoraleDown={moraleDownHandler}
      />
      <Friends data={friends} />
    </div>
  );
};

export default Battle;
