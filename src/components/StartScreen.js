import React from "react";
import { useQuiz } from "../contexts/QuizContext";

function StartScreen() {
  const { dispatch, title } = useQuiz();
  return (
    <div className="start">
      <h2 className="start-heading">
        Ready to Test Your{" "}
        <strong
          style={{
            padding: "5px",
            fontFamily: "Tribuchet MS",
            fontSize: "inherit",
            color: "#ffcc00",
          }}
        >
          {title}
        </strong>{" "}
        Skills
      </h2>
      <h3 style={{ fontWeight: "400" }}>
        15 questions to test your {title} mastery
      </h3>
      <button className="btn" onClick={() => dispatch({ type: "start" })}>
        Lets Start!
      </button>
    </div>
  );
}

export default StartScreen;
