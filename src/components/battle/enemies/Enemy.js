import { useEffect, useState } from 'react';
import { PHASE_QUIZ, PHASE_WAIT_ENEMY_JUMP } from '../../../util/consts';
import classes from './Enemy.module.css';

const Enemy = (props) => {
  const { isJump, name } = props.data;
  const { onJumpFinish, phase } = props;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isJump && phase === PHASE_WAIT_ENEMY_JUMP && count === 0) {
      setCount(1);
      setTimeout(() => {
        console.log('enemy jump finish');
        onJumpFinish();
      }, 2000);
    }

    if (phase === PHASE_QUIZ) {
      setCount(0);
    }
  }, [isJump, onJumpFinish, phase, count]);

  return (
    <div className={`${classes['enemy']} ${isJump && classes['jump']}`}>
      {name}
    </div>
  );
};

export default Enemy;
