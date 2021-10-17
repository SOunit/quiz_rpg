import { useState } from 'react';
import { getRandomTargetIndex } from '../../../util/util';
import { COUNT_TO_ACTION } from '../../../util/consts';
import classes from './Quiz.module.css';

const Quiz = (props) => {
  const [count, setCount] = useState(0);

  const optionClickHandler = (event) => {
    if (!props.isActive) {
      return;
    }

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
    if (count >= COUNT_TO_ACTION) {
      setCount(0);

      props.onStartBattle();
    }
  };

  const quizIndex = getRandomTargetIndex(props.quizzes);

  let options = props.quizzes[quizIndex].options.map((option) => (
    <div
      id={option.id}
      className={classes['quiz__option']}
      key={option.id}
      onClick={(e) => optionClickHandler(e)}
    >
      {option.text}
    </div>
  ));

  const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  options = shuffle(options);

  const counts = [
    <div
      className={`${classes['quiz__count']} ${classes['quiz__count--morale']}`}
    >
      Morale: {props.morale}
    </div>,
  ];

  for (let i = 0; i < count; i++) {
    counts.push(<div key={i} className={classes['quiz__count']}></div>);
  }

  return (
    <div
      className={`${classes['quiz']} ${
        props.isActive ? '' : classes['quiz--disabled']
      }`}
    >
      <div className={classes['quiz__counts']}>{counts}</div>
      <div className={classes['quiz__text']}>
        {props.quizzes[quizIndex].quiz}
      </div>
      <div className={classes['quiz__options']}>{options}</div>
    </div>
  );
};

export default Quiz;
