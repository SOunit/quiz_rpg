import Friend from './Friend';
import HpBar from '../hpBar/HpBar';
import classes from './Friends.module.css';
import { Fragment } from 'react';

const Friends = (props) => {
  const friends = props.data.map((friend, i) => (
    <Friend
      key={i}
      data={friend}
      onJumpFinish={props.onJumpFinish}
      phase={props.phase}
    />
  ));

  return (
    <Fragment>
      <div className={classes['friends']}>{friends}</div>
      <div className={classes['hp-bar-wrapper']}>
        <HpBar
          maxHp={props.data.maxTotalHp}
          currentHp={props.data.currentTotalHp}
          showNum={true}
        />
      </div>
    </Fragment>
  );
};

export default Friends;
