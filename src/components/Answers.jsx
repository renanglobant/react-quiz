import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];

    // Shuffle the answers using a random sorting algorithm
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        const cssClass =
          answerState === "answered" && isSelected
            ? "selected"
            : ["correct", "wrong"].includes(answerState) && isSelected
              ? answerState
              : "";
        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={!!answerState}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
