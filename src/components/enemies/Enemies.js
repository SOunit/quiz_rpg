import Enemy from './Enemy';
import classes from './Enemies.module.css';

const Enemies = (props) => {
  const enemies = props.data.map((enemy, i) => <Enemy key={i} data={enemy} />);

  return <div className={classes['enemies']}>{enemies}</div>;
};

export default Enemies;
