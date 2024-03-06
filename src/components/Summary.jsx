import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

const calculatePercentage = (part, whole) =>
  whole === 0 ? 0 : Math.round((part / whole) * 100);

export default function Summary({ userAnswers, onReset }) {
  const skippedAnswersCount = userAnswers.filter(
    (answer) => answer === null
  ).length;
  const correctAnswersCount = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  ).length;

  const skippedAnswersPercentage = calculatePercentage(
    skippedAnswersCount,
    userAnswers.length
  );
  const correctAnswersPercentage = calculatePercentage(
    correctAnswersCount,
    userAnswers.length
  );
  const wronAnswersPercentage =
    100 - skippedAnswersPercentage - correctAnswersPercentage;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersPercentage}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersPercentage}%</span>
          <span className="text">Correct</span>
        </p>
        <p>
          <span className="number">{wronAnswersPercentage}%</span>
          <span className="text">Incorrect</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          const { id, text, answers } = QUESTIONS[index];
          const status =
            answer === null
              ? "skipped"
              : answer === answers[0]
                ? "correct"
                : "wrong";
          return (
            <li key={id}>
              <h3>{index + 1}</h3>
              <p className="question">{text}</p>
              <p className={`user-answer ${status}`}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
      <button onClick={onReset}>Reset Quiz</button>
    </div>
  );
}
