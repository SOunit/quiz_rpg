import Enemy from './Enemy';
import classes from './Enemies.module.css';
import HpBar from '../hpBar/HpBar';

const Enemies = (props) => {
  const enemies = props.data.map((enemy, i) => {
    return (
      <div key={`${enemy.id}_${i}`}>
        <div className={classes['count']}>{enemy.currentCount}</div>
        <Enemy data={enemy} />
        <HpBar />
      </div>
    );
  });

  return <div className={classes['enemies']}>{enemies}</div>;
};

export default Enemies;
