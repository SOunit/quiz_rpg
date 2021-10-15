import { useEffect } from 'react';
import { PHASE_WAIT_JUMP } from '../../../util/consts';
import classes from './Friend.module.css';

const Friend = (props) => {
  const { isJump, name } = props.data;
  const { onJumpFinish, phase } = props;

  useEffect(() => {
    if (isJump && phase === PHASE_WAIT_JUMP) {
      setTimeout(() => {
        console.log('friend jump finish');
        onJumpFinish();
      }, 2000);
    }
  }, [isJump, onJumpFinish, phase]);

  return (
    <div className={`${classes['friend']} ${isJump && classes['jump']}`}>
      {name}
    </div>
  );
};

export default Friend;
