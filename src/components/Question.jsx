import { useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import QUESTIONS from "../questions";

const TIMEOUT = 15000;
const SELECTED_ANSWER_TIME = 1000;
const CORRECT_ANSWER_TIME = 2000;

export default function Question({ index, onSelect, onSkip }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = TIMEOUT;
  if (answer.selectedAnswer) {
    timer = SELECTED_ANSWER_TIME;
  }
  if (answer.isCorrect !== null) {
    timer = CORRECT_ANSWER_TIME;
  }

  const { text, answers } = QUESTIONS[index];

  const handleSelectAnswer = (answer) => {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelect(answer);
      }, CORRECT_ANSWER_TIME);
    }, SELECTED_ANSWER_TIME);
  };

  const answerState =
    answer.selectedAnswer && answer.isCorrect !== null
      ? answer.isCorrect
        ? "correct"
        : "wrong"
      : answer.selectedAnswer
        ? "answered"
        : "";

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkip : null}
        mode={answerState}
      />
      <h2>{text}</h2>
      <Answers
        answers={answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
