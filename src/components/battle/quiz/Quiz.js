import classes from './Quiz.module.css';

const Quiz = (props) => {
  const optionClickHandler = (event) => {
    const id = event.target.id;
    console.log(id);

    const CORRECT_ANS_INDEX = '1';
    if (id === CORRECT_ANS_INDEX) {
      props.onMoraleUp();
    } else {
      props.onMoraleDown();
    }
  };

  const options = props.data[0].options.map((option) => (
    <div
      id={option.id}
      className={classes['quiz__option']}
      key={option.id}
      onClick={(e) => optionClickHandler(e)}
    >
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
