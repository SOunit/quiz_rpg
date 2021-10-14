import classes from './HpBar.module.css';

const HpBar = (props) => {
  const test = ((props.currentHp / props.maxHp) * 100).toFixed(0);

  let disp = '';
  if (props.currentHp && props.maxHp) {
    disp = `${props.currentHp} / ${props.maxHp}`;
  }

  return (
    <div className={classes['hp-bar']}>
      <p className={classes['hp-bar__text']}>{disp}</p>
      <div
        style={{ width: test + '%' }}
        className={classes['hp-bar__fill']}
      ></div>
    </div>
  );
};

export default HpBar;
