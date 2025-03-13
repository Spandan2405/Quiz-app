import React from "react";
import { useQuiz } from "../contexts/QuizContext.jsx";

function Option({ question }) {
  const { dispatch, answer } = useQuiz();
  // console.log(answer);
  const hasAnswered = answer !== null;

  // className = btn btn-option wrong - orange
  // className = btn btn-option correct - blue
  // marked option - btn btn-option answer wrong/correct
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={answer !== null}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
