import { useEffect } from 'react';
import classes from './Friend.module.css';

const Friend = (props) => {
  useEffect(() => {
    if (props.data.isJump) {
      setTimeout(() => {
        props.onJumpFinish();
      }, 2000);
    }
  }, [props.data.isJump]);

  return (
    <div
      className={`${classes['friend']} ${props.data.isJump && classes['jump']}`}
    >
      {props.data.name}
    </div>
  );
};

export default Friend;
