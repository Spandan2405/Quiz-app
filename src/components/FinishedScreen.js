import React from "react";
import { useQuiz } from "../contexts/QuizContext";

function FinishedScreen() {
  const { points, totalPoints, highScore, dispatch } = useQuiz();
  const percent = (points / totalPoints) * 100;

  let emoji;
  if (percent === 100) emoji = "🥇";
  if (percent >= 80 && percent < 100) emoji = "😍";
  if (percent >= 50 && percent < 80) emoji = "😊";
  if (percent >= 0 && percent < 50) emoji = "👀";
  if (percent === 0) emoji = "🤦🏼‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored {points} out of {totalPoints} (
        {Math.ceil(percent)})%
      </p>
      <p className="highscore">Highscore : {highScore} points</p>
      <div className="btn-container">
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "exit" })}
        >
          Exit
        </button>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart Quiz
        </button>
      </div>
    </>
  );
}

export default FinishedScreen;
