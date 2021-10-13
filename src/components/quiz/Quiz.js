import classes from './Quiz.module.css';

const Quiz = (props) => {
  const options = props.data[0].options.map((option) => (
    <div className={classes['quiz__option']} key={option.id}>
      {option.text}
    </div>
  ));

  return (
    <div className={classes['quiz']}>
      <div className={classes['quiz__text']}>{props.data[0].quiz}</div>
      <div className={classes['quiz__options']}>{options}</div>
    </div>
  );
};

export default Quiz;
