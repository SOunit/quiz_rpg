import classes from './HpBar.module.css';

const HpBar = (props) => {
  const test = ((props.currentHp / props.maxHp) * 100).toFixed(0);

  return (
    <div className={classes['hp-bar']}>
      <p className={classes['hp-bar__text']}>
        {props.currentHp} / {props.maxHp}
      </p>
      <div
        style={{ width: test + '%' }}
        className={classes['hp-bar__fill']}
      ></div>
    </div>
  );
};

export default HpBar;
