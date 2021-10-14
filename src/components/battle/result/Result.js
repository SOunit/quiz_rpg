import classes from './Result.module.css';

const Result = (props) => {
  return (
    <div className={classes['result']}>
      <div className={classes['result__text']}>{props.text}</div>
    </div>
  );
};

export default Result;
