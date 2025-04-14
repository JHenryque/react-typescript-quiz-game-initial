/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
import "./Game.scss";
import AnswerOption from "./AnswerOption.tsx";
import Result from "./Result.tsx";
import { useQuixContext } from "../QuixContext.tsx";
import { decode } from "html-entities";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import canvasConfetti from "https://cdn.skypack.dev/canvas-confetti";

// const question = {
//   category: "Science: Gadgets",
//   type: "multiple",
//   difficulty: "easy",
//   question:
//     "Which buzzword did Apple Inc. use to describe their removal of the headphone jack?",
//   correct_answer: "Courage",
//   incorrect_answers: ["Innovation", "Revolution", "Courage", "Bravery"],
// };

function Game() {
  const { state, dispatch } = useQuixContext();

  const wonAudio = new Audio("../../public/sounds/won.wav");
  const lostAudio = new Audio("../../public/sounds/lost.wav");

  function handleSubmit() {
    dispatch({ type: "setStatus", payload: "answered" });
    if (state.userAnswer == state.question?.correct_answer) {
      dispatch({ type: "setScore", payload: "correct" });
      wonAudio.play();
      canvasConfetti();
    } else {
      dispatch({ type: "setScore", payload: "incorrect" });
      lostAudio.play();
    }
  }
  //console.log(state.question);
  return (
    <>
      <div className="container game-screen">
        <h2>Question</h2>
        <h4>{decode(state.question?.question)}</h4>
        <div className="options">
          {state.question?.incorrect_answers.map((answer) => {
            return <AnswerOption key={answer} answer={answer} />;
          })}
        </div>

        {state.userAnswer && state.gameStatus != "answered" && (
          <button onClick={handleSubmit}>Submit</button>
        )}

        {state.gameStatus == "answered" && (
          <>
            <Result />
            <button
              onClick={() => dispatch({ type: "setStatus", payload: "idle" })}
            >
              Proxima questão
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Game;
