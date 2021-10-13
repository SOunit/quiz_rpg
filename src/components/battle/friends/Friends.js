import Friend from './Friend';
import classes from './Friends.module.css';

const Friends = (props) => {
  const friends = props.data.map((friend, i) => (
    <Friend key={i} data={friend} />
  ));

  return <div className={classes['friends']}>{friends}</div>;
};

export default Friends;
