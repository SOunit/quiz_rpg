import classes from './HpBar.module.css';

const HpBar = (props) => {
  return (
    <div className={classes['hp-bar']}>
      {props.currentHp} / {props.maxHp}
    </div>
  );
};

export default HpBar;
