import "./AnswerOption.scss";
import { useQuixContext } from "../QuixContext.tsx";
import { decode } from "html-entities";

function AnswerOption({ answer }: { answer: string }) {
  const { state, dispatch } = useQuixContext();

  return (
    <>
      {answer && (
        <div className="answer-option">
          <p
            className={`${answer === state.userAnswer ? "selected" : ""} 
            ${
              state.gameStatus === "answered" && answer === state.userAnswer
                ? "correct"
                : ""
            }`}
            onClick={() => dispatch({ type: "setUserAnswer", payload: answer })}
          >
            {decode(answer)}
          </p>
        </div>
      )}
    </>
  );
}

export default AnswerOption;
