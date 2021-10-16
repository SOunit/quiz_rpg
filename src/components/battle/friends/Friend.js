import { useEffect, useState } from 'react';
import { PHASE_QUIZ, PHASE_WAIT_FRIEND_JUMP } from '../../../util/consts';
import classes from './Friend.module.css';

const Friend = (props) => {
  const { isJump, name } = props.data;
  const { onJumpFinish, phase } = props;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isJump && phase === PHASE_WAIT_FRIEND_JUMP && count === 0) {
      setCount(1);
      setTimeout(() => {
        console.log('friend jump finish');
        onJumpFinish();
      }, 2000);
    }

    if (phase === PHASE_QUIZ) {
      setCount(0);
    }
  }, [isJump, onJumpFinish, phase, count]);

  return (
    <div className={`${classes['friend']} ${isJump && classes['jump']}`}>
      {name}
    </div>
  );
};

export default Friend;
