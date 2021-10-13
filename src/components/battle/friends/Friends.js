import Friend from './Friend';
import HpBar from '../hpBar/HpBar';
import classes from './Friends.module.css';
import { Fragment } from 'react';

const Friends = (props) => {
  const friends = props.data.map((friend, i) => (
    <Friend key={i} data={friend} />
  ));

  const maxHp = props.data.reduce((sum, friend) => {
    sum += friend.maxHp;
    return sum;
  }, 0);

  const currentHp = props.data.reduce((sum, friend) => {
    sum += friend.currentHp;
    return sum;
  }, 0);

  return (
    <Fragment>
      <div className={classes['friends']}>{friends}</div>
      <div className={classes['hp-bar-wrapper']}>
        <HpBar maxHp={maxHp} currentHp={currentHp} />
      </div>
    </Fragment>
  );
};

export default Friends;
