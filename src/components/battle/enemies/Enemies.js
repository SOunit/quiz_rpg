import Enemy from './Enemy';
import classes from './Enemies.module.css';
import { SHOW_HP_BAR_NUM } from '../../../util/consts';
import HpBar from '../hpBar/HpBar';

const Enemies = (props) => {
  const enemies = props.enemies.map((enemy, i) => {
    return (
      <div key={`${enemy.id}_${i}`}>
        <div className={classes['count']}>{enemy.currentCount}</div>
        <Enemy
          enemy={enemy}
          phase={props.phase}
          onJumpFinish={props.onJumpFinish}
        />
        <HpBar
          currentHp={enemy.currentHp}
          maxHp={enemy.maxHp}
          showNum={SHOW_HP_BAR_NUM}
        />
      </div>
    );
  });

  return <div className={classes['enemies']}>{enemies}</div>;
};

export default Enemies;
