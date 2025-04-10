import "./Game.scss";
import AnswerOption from "./AnswerOption.tsx";
import Result from "./Result.tsx";
import { useQuixContext } from "../QuixContext.tsx";

const question = {
  category: "Science: Gadgets",
  type: "multiple",
  difficulty: "easy",
  question:
    "Which buzzword did Apple Inc. use to describe their removal of the headphone jack?",
  correct_answer: "Courage",
  incorrect_answers: ["Innovation", "Revolution", "Courage", "Bravery"],
};

function Game() {
  const { state } = useQuixContext();

  console.log(state);

  return (
    <>
      <div className="container game-screen">
        <h2>Question</h2>
        <h4>{state.question?.question}</h4>
        <div className="options">
          {state.question?.incorrect_answers.map((answer) => {
            return <AnswerOption key={answer} answer={answer} />;
          })}
        </div>

        <button>Submit</button>

        <Result />
      </div>
    </>
  );
}

export default Game;
