import React, { useEffect, useState } from "react";
import { useQuiz } from "../contexts/QuizContext";

function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const [text, setText] = useState("");
  // useEffect to re-render after every 1 second
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div>
      <button
        className="timer"
        onClick={() => dispatch({ type: "exit" })}
        onMouseEnter={() => setText("Exit")}
        onMouseLeave={() => setText("")}
      >
        {text !== "" ? (
          text
        ) : (
          <>
            {mins < 10 ? "0" : ""}
            {mins}:{secs < 10 ? "0" : ""}
            {secs}
          </>
        )}
      </button>
    </div>
  );
}

export default Timer;
