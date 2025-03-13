import React from "react";
import Option from "./Option";
import { useQuiz } from "../contexts/QuizContext.jsx";

function Questions() {
  const { questions, index } = useQuiz();
  const question = questions.at(index);
  console.log(question);
  return (
    <div className="question">
      <h4>{question.question}</h4>
      <Option question={question} />
    </div>
  );
}

export default Questions;
