import { useState } from 'react';
import classes from './Quiz.module.css';

const Quiz = (props) => {
  const [count, setCount] = useState(0);

  const optionClickHandler = (event) => {
    setCount((prevState) => prevState + 1);

    // answer check
    const id = event.target.id;
    const CORRECT_ANS_INDEX = '1';
    const isCorrect = id === CORRECT_ANS_INDEX;

    // moral change
    if (isCorrect) {
      props.onMoraleUp();
    } else {
      props.onMoraleDown();
    }

    // friends attack
    // enemies attack
    if (count >= 2) {
      setCount(0);

      props.onTakeActions();
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
