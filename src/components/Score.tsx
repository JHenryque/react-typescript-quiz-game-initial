import "./Score.scss";
import { useQuixContext } from "../QuixContext.tsx";

function Score() {
  const { state } = useQuixContext();

  return (
    <>
      <div className="score">
        <div>
          <small>Correct</small>
          <span className="point">{state.score.correct}</span>
          <span>X</span>
          <span className="point">{state.score.incorrect}</span>
          <small>Incorrect</small>
        </div>
      </div>
    </>
  );
}

export default Score;
