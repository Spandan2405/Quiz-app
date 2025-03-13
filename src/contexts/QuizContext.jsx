import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  data: {}, //object
  status: "loading", //useReducer -> state (property)
  title: null, //title
  questions: [], //questions
  index: 0, // array[index]
  answer: null, // question[] -> answer(index)
  points: 0, // score for each correct answer
  highScore: 0, // highest score
  secondsRemaining: null, // time left
};
function reducer(state, action) {
  //current state , what type & payload of action to take
  switch (action.type) {
    case "dataRecieved": //fetch
      return {
        ...state, //initialState +
        data: action.payload, //changes
        status: "choose",
      };
    case "dataFailed": //error
      return {
        ...state,
        status: "error",
      };
    case "picked":
      return {
        ...state,
        status: "ready",
        title: action.payload,
      };
    case "start":
      return {
        ...state,
        status: "active",
        questions: state.data[state.title], // questions
        secondsRemaining: 15 * 30, // timer starts
      };
    case "newAnswer":
      const question = state.questions[state.index]; // current question
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore, //new highScore
      };
    case "restart":
      return {
        ...state, // reset to initialState + changes
        highScore: state.highScore,
        index: 0,
        answer: null,
        points: 0,
        status: "ready",
        secondsRemaining: 10,
        totalPoints: state.totalPoints,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "exit":
      return {
        ...initialState,
        data: state.data,
        status: "choose",
      };
    default:
      throw new Error("Unknown action");
  }
}

// created context ... context - a common context api which has all the state values and eliminates prop drilling
const QuizContext = createContext();

//Providing context
function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highScore,
      secondsRemaining,
      title,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  console.log(questions);
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function () {
    fetch("https://spandan2405.github.io/Udemy_Projects/data/questions.json")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        title,
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        numQuestions,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("QuizContext was used outside of the QuizProvider");
  }
  return context;
}

export { QuizProvider, useQuiz };
