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
  PHASE_BATTLE_START,
  PHASE_DAMAGE_ENEMY,
  PHASE_QUIZ,
  PHASE_WAIT_JUMP,
} from '../util/consts';

const MORAL_UP_NUM = 0.0;

const Battle = () => {
  // battle data
  const [morale, setMorale] = useState(1);
  const [friends, setFriends] = useState([]);
  const [enemies, setEnemies] = useState([]);

  // phases
  const [isOnBattle, setIsOnBattle] = useState(false);
  const [friendIndexOnAttack, setFriendIndexOnAttack] = useState(0);
  const [isOnDamageEnemy, setIsOnDamageEnemy] = useState(false);
  const [phase, setPhase] = useState(PHASE_QUIZ);

  // result
  const [isClear, setIsClear] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(true);

  const addTotalHp = (friends) => {
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

    addTotalHp(newFriends);

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
    setPhase(PHASE_BATTLE_START);
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

  const initBattle = useCallback(() => {
    setIsOnBattle(false);
    setIsOnDamageEnemy(false);

    const newFriends = friends.map((friend) => {
      friend.isJump = false;
      return friend;
    });
    addTotalHp(newFriends);

    setFriends(newFriends);
  }, [friends]);

  const damageEnemy = (enemies, friend) => {
    let newEnemies = enemies;

    if (newEnemies.length > 0) {
      const targetId = getRandomTargetIndex(newEnemies);

      const damage = Math.ceil(friend.attack * morale);

      newEnemies[targetId].currentHp -= damage;

      newEnemies = enemies.filter((enemy) => enemy.currentHp > 0);
    }

    return newEnemies;
  };

  // PHASE_BATTLE_START
  useEffect(() => {
    if (phase === PHASE_BATTLE_START) {
      console.log('phase', phase);
      setIsQuizActive(false);
      setPhase(PHASE_WAIT_JUMP);
    }

    if (friends[friendIndexOnAttack]) {
      friends[friendIndexOnAttack].isJump = true;
    }
  }, [phase, friends, friendIndexOnAttack]);

  // PHASE_DAMAGE_ENEMY
  useEffect(() => {
    if (phase === PHASE_DAMAGE_ENEMY) {
      console.log('phase', phase);
      const newEnemies = damageEnemy(enemies, friends[friendIndexOnAttack]);
      setEnemies(newEnemies);

      setPhase('test');
      initBattle();
      setIsQuizActive(true);
    }
  }, [phase, damageEnemy, initBattle, enemies, friendIndexOnAttack, friends]);

  const takeActionsHandler = () => {
    // process data
    // const damagedEnemies = damageEnemy(enemies, friends);
    // const minusCountedEnemies = minusEnemyCount(damagedEnemies);
    // const { newEnemies, newFriends } = damageFriends(minusCountedEnemies);
    // if (newEnemies.length === 0) {
    //   setIsClear(true);
    //   setIsQuizActive(false);
    // } else if (newFriends.currentTotalHp <= 0) {
    //   setIsGameOver(true);
    //   setEnemies([]);
    //   setIsQuizActive(false);
    // }
    // update screen
    // setEnemies(newEnemies);
    // setFriends(newFriends);
  };

  const damageFriends = (enemies) => {
    let newFriends = friends;

    // each enemies take actions
    const newEnemies = enemies.map((enemy) => {
      if (enemy.currentCount > 0) {
        return enemy;
      }

      newFriends.currentTotalHp -= enemy.attack;

      enemy.currentCount = enemy.maxCount;
      return enemy;
    });

    return { newEnemies, newFriends };
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

  const friendJumpFinishHandler = () => {
    setPhase(PHASE_DAMAGE_ENEMY);
  };

  return (
    <div>
      <div className={classes['morale']}>{morale}</div>
      {!isGameOver && <Enemies data={enemies} />}
      {isClear && <Result text='CLEAR!' />}
      {isGameOver && <Result text='GAME OVER!' />}
      <Friends
        data={friends}
        onJumpFinish={friendJumpFinishHandler}
        phase={phase}
      />
      <Quiz
        data={QUIZZES}
        onTakeActions={takeActionsHandler}
        onMoraleUp={moraleUpHandler}
        onMoraleDown={moraleDownHandler}
        isActive={isQuizActive}
        onStartBattle={startBattleHandler}
      />
    </div>
  );
};

export default Battle;
