import React from "react";
import { useQuiz } from "../contexts/QuizContext";

function ProgressTitle() {
  const { index, numQuestions, points, totalPoints, answer } = useQuiz();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      {/* Progress Bar - max=15 value = index + (1/0) */}
      <p>
        Question {index + 1}/{numQuestions}
      </p>
      <p>
        {points}/{totalPoints} points
      </p>
    </header>
  );
}

export default ProgressTitle;
