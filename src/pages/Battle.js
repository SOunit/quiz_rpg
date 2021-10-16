import Enemies from '../components/battle/enemies/Enemies';
import Quiz from '../components/battle/quiz/Quiz';
import Friends from '../components/battle/friends/Friends';
import Result from '../components/battle/result/Result';
import classes from './Battle.module.css';
import { useCallback, useEffect, useState } from 'react';
import { getRandomTargetIndex } from '../util/util';
// import { firebase } from '../firebase/initFirebase';
import { FRIENDS, ENEMIES, QUIZZES } from '../util/data';
import {
  PHASE_QUIZ,
  PHASE_FRIEND_ATTACK,
  PHASE_WAIT_FRIEND_JUMP,
  PHASE_DAMAGE_ENEMY,
  PHASE_CHECK_NEXT_FRIEND,
  PHASE_ENEMY_ATTACK,
  PHASE_WAIT_ENEMY_JUMP,
  PHASE_DAMAGE_FRIEND,
  PHASE_CHECK_NEXT_ENEMY,
  PHASE_LOST,
  PHASE_WIN,
  PHASE_MINUS_ENEMY_COUNT,
} from '../util/consts';

// for production
// const MORAL_UP_NUM = 0.05;
// for test
const MORAL_UP_NUM = 0.0;

const Battle = () => {
  // battle data
  const [morale, setMorale] = useState(1);
  const [friends, setFriends] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [friendIndexOnAttack, setFriendIndexOnAttack] = useState(0);
  const [enemyIndexOnAttack, setEnemyIndexOnAttack] = useState(0);

  // phase
  const [phase, setPhase] = useState(PHASE_QUIZ);

  // result
  const [isQuizActive, setIsQuizActive] = useState(true);

  const initTotalHp = (friends) => {
    friends.currentTotalHp = friends.reduce((hp, friend) => {
      hp += friend.maxHp;
      return hp;
    }, 0);
    friends.maxTotalHp = friends.currentTotalHp;
  };

  const initFriends = useCallback((friends) => {
    const newFriends = friends.map((friend) => {
      friend.currentHp = friend.maxHp;
      return friend;
    });

    initTotalHp(newFriends);

    return newFriends;
  }, []);

  const initEnemies = (enemies) => {
    const newEnemies = enemies.map((enemy) => {
      enemy.currentHp = enemy.maxHp;
      enemy.currentCount = enemy.maxCount;
      return enemy;
    });

    return newEnemies;
  };

  const startBattleHandler = () => {
    setPhase(PHASE_FRIEND_ATTACK);
  };

  const endBattlePhase = useCallback(() => {
    setFriendIndexOnAttack(0);
    setEnemyIndexOnAttack(0);
    setPhase(PHASE_QUIZ);

    const newFriends = friends.map((friend) => {
      friend.isJump = false;
      return friend;
    });
    newFriends.currentTotalHp = friends.currentTotalHp;
    newFriends.maxTotalHp = friends.maxTotalHp;

    setFriends(newFriends);

    const newEnemies = enemies.map((enemy) => {
      enemy.isJump = false;
      return enemy;
    });
    newEnemies.currentTotalHp = enemies.currentTotalHp;
    newEnemies.maxTotalHp = enemies.maxTotalHp;

    setEnemies(newEnemies);
  }, [friends, enemies]);

  const damageEnemy = useCallback(
    (enemies, friend) => {
      let newEnemies = enemies;

      if (newEnemies.length > 0) {
        const targetId = getRandomTargetIndex(newEnemies);

        const damage = Math.ceil(friend.attack * morale);

        newEnemies[targetId].currentHp -= damage;

        newEnemies = enemies.filter((enemy) => enemy.currentHp > 0);
      }

      return newEnemies;
    },
    [morale]
  );

  const damageFriends = useCallback(
    (enemy) => {
      const newEnemies = enemies;
      let newFriends = friends;

      // FIXME
      if (newEnemies[enemyIndexOnAttack].currentCount > 0) {
        return { newEnemies, newFriends };
      }

      newEnemies[enemyIndexOnAttack].currentCount =
        newEnemies[enemyIndexOnAttack].maxCount;

      newFriends.currentTotalHp -= newEnemies[enemyIndexOnAttack].attack;
      if (newFriends.currentTotalHp <= 0) {
        newFriends.currentTotalHp = 0;
      }

      return { newEnemies, newFriends };
    },
    [friends, enemies, enemyIndexOnAttack]
  );

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

  const friendJumpFinishHandler = () => {
    setPhase(PHASE_DAMAGE_ENEMY);
  };

  const enemyJumpFinishHandler = () => {
    setPhase(PHASE_DAMAGE_FRIEND);
  };

  // initialize data
  useEffect(() => {
    const friends = initFriends(FRIENDS);
    setFriends(friends);

    const enemies = initEnemies(ENEMIES);
    setEnemies(enemies);

    // firebase insert test
    // const todoRef = firebase.database().ref('Todo');
    // const todo = { title: 'test title', complete: false };
    // todoRef.push(todo);
  }, [initFriends]);

  // PHASE_FRIEND_ATTACK
  useEffect(() => {
    if (phase === PHASE_FRIEND_ATTACK) {
      console.log('phase', phase);
      setIsQuizActive(false);
      setPhase(PHASE_WAIT_FRIEND_JUMP);

      if (friends[friendIndexOnAttack]) {
        friends[friendIndexOnAttack].isJump = true;
      }
    }
  }, [phase, friends, friendIndexOnAttack]);

  // PHASE_WAIT_FRIEND_JUMP
  useEffect(() => {
    if (phase === PHASE_WAIT_FRIEND_JUMP) {
      console.log('phase', phase);
    }
  }, [phase]);

  // PHASE_DAMAGE_ENEMY
  useEffect(() => {
    if (phase === PHASE_DAMAGE_ENEMY) {
      console.log('phase', phase);
      const newEnemies = damageEnemy(enemies, friends[friendIndexOnAttack]);
      setEnemies(newEnemies);

      if (newEnemies.length <= 0) {
        setPhase(PHASE_WIN);
      } else {
        setPhase(PHASE_CHECK_NEXT_FRIEND);
      }
    }
  }, [phase, damageEnemy, enemies, friendIndexOnAttack, friends]);

  // PHASE_CHECK_NEXT_FRIEND
  useEffect(() => {
    if (phase === PHASE_CHECK_NEXT_FRIEND) {
      console.log('phase', phase);
      const nextIndex = friendIndexOnAttack + 1;
      if (friends[nextIndex]) {
        setFriendIndexOnAttack(nextIndex);
        setPhase(PHASE_FRIEND_ATTACK);
      } else {
        setPhase(PHASE_MINUS_ENEMY_COUNT);
      }
    }
  }, [phase, friendIndexOnAttack, friends]);

  useEffect(() => {
    if (phase === PHASE_MINUS_ENEMY_COUNT) {
      console.log('phase', phase);
      const newEnemy = minusEnemyCount(enemies);
      setEnemies(newEnemy);

      setPhase(PHASE_ENEMY_ATTACK);
    }
  }, [phase, enemies]);

  // PHASE_ENEMY_ATTACK
  useEffect(() => {
    if (phase === PHASE_ENEMY_ATTACK) {
      console.log('phase', phase);
      setPhase(PHASE_WAIT_ENEMY_JUMP);

      const enemy = enemies[enemyIndexOnAttack];
      if (enemy && enemy.currentCount <= 0) {
        enemy.isJump = true;
      }
    }
  }, [phase, enemies, enemyIndexOnAttack]);

  // PHASE_WAIT_ENEMY_JUMP
  useEffect(() => {
    if (phase === PHASE_WAIT_ENEMY_JUMP) {
      console.log('phase', phase);
      if (enemies[enemyIndexOnAttack].currentCount > 0) {
        console.log('skip to next phase');
        setPhase(PHASE_CHECK_NEXT_ENEMY);
      }
    }
  }, [phase]);

  // PHASE_DAMAGE_FRIEND
  useEffect(() => {
    if (phase === PHASE_DAMAGE_FRIEND) {
      console.log('phase', phase);

      const { newEnemies, newFriends } = damageFriends(
        enemies[enemyIndexOnAttack]
      );

      setEnemies(newEnemies);
      setFriends(newFriends);

      if (newFriends.currentTotalHp <= 0) {
        setPhase(PHASE_LOST);
      } else {
        setPhase(PHASE_CHECK_NEXT_ENEMY);
      }
    }
  }, [phase, damageFriends, enemies, enemyIndexOnAttack]);

  // PHASE_CHECK_NEXT_ENEMY
  useEffect(() => {
    if (phase === PHASE_CHECK_NEXT_ENEMY) {
      console.log('phase', phase);

      const nextIndex = enemyIndexOnAttack + 1;
      if (enemies[nextIndex]) {
        setEnemyIndexOnAttack(nextIndex);
        setPhase(PHASE_ENEMY_ATTACK);
      } else {
        endBattlePhase();
      }
    }
  }, [phase, endBattlePhase, enemies, enemyIndexOnAttack]);

  // PHASE_WIN
  useEffect(() => {
    if (phase === PHASE_WIN) {
      console.log('phase', phase);
      setIsQuizActive(false);
    }
  }, [phase]);

  // PHASE_LOST
  useEffect(() => {
    if (phase === PHASE_LOST) {
      console.log('phase', phase);
      setIsQuizActive(false);
    }
  }, [phase]);

  // PHASE_QUIZ
  useEffect(() => {
    if (phase === PHASE_QUIZ) {
      console.log('phase', phase);
      setIsQuizActive(true);
    }
  }, [phase]);

  return (
    <div>
      <div className={classes['morale']}>{morale}</div>
      {phase !== PHASE_WIN && phase !== PHASE_LOST && (
        <Enemies
          enemies={enemies}
          onJumpFinish={enemyJumpFinishHandler}
          phase={phase}
        />
      )}
      {phase === PHASE_WIN && <Result text='CLEAR!' />}
      {phase === PHASE_LOST && <Result text='GAME OVER!' />}
      <Friends
        data={friends}
        onJumpFinish={friendJumpFinishHandler}
        phase={phase}
      />
      <Quiz
        data={QUIZZES}
        onTakeActions={() => {}}
        onMoraleUp={moraleUpHandler}
        onMoraleDown={moraleDownHandler}
        isActive={isQuizActive}
        onStartBattle={startBattleHandler}
      />
    </div>
  );
};

export default Battle;
