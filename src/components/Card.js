import { useQuiz } from "../contexts/QuizContext";

function Card({ title, logo }) {
  const { dispatch } = useQuiz();
  return (
    <div className="card">
      <img src={logo} alt="logo" className="logo" />
      <button
        className="btn"
        onClick={() => dispatch({ type: "picked", payload: title })}
      >
        {title}
      </button>
    </div>
  );
}

export default Card;
