import classes from './HpBar.module.css';

const HpBar = (props) => {
  const ratio = ((props.currentHp / props.maxHp) * 100).toFixed(0);
  const showNum = props.showNum || false;

  let disp = '';
  if (props.currentHp && props.maxHp) {
    disp = `${props.currentHp} / ${props.maxHp}`;
  }

  return (
    <div className={classes['hp-bar']}>
      {showNum && <p className={classes['hp-bar__text']}>{disp}</p>}
      <div
        style={{ width: ratio + '%' }}
        className={classes['hp-bar__fill']}
      ></div>
    </div>
  );
};

export default HpBar;
