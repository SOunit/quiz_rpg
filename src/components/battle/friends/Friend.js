import classes from './Friend.module.css';

const Friend = (props) => {
  return <div className={classes['friend']}>{props.data.name}</div>;
};

export default Friend;
