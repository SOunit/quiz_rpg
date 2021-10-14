import classes from './Congrats.module.css';

const Congrats = () => {
  return (
    <div className={classes['congrats']}>
      <div className={classes['congrats__text']}>CLEAR!</div>
    </div>
  );
};

export default Congrats;
