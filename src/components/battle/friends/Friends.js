import Friend from './Friend';
import HpBar from '../hpBar/HpBar';
import classes from './Friends.module.css';
import { Fragment } from 'react';

const Friends = (props) => {
  const friends = props.data.map((friend, i) => (
    <Friend key={i} data={friend} />
  ));

  return (
    <Fragment>
      <div className={classes['friends']}>{friends}</div>
      <div className={classes['hp-bar-wrapper']}>
        <HpBar />
      </div>
    </Fragment>
  );
};

export default Friends;
