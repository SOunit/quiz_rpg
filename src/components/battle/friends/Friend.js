import { useEffect } from 'react';
import classes from './Friend.module.css';

const Friend = (props) => {
  useEffect(() => {}, []);

  return (
    <div
      className={`${classes['friend']} ${props.data.isJump && classes['jump']}`}
    >
      {props.data.name}
    </div>
  );
};

export default Friend;
