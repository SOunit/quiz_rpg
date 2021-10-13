import classes from './Enemy.module.css';

const Enemy = (props) => {
  return <div className={classes['enemy']}>{props.data.name}</div>;
};

export default Enemy;
