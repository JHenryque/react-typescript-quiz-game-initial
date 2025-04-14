/* eslint-disable prefer-const */
import "./App.scss";
import FullPageLoader from "./components/FullPageLoader.tsx";
import Score from "./components/Score.tsx";
import Game from "./components/Game.tsx";
import { useQuixContext, Question, QuizResponse } from "./QuixContext.tsx";
import { useEffect } from "react";

function App() {
  const { state, dispatch } = useQuixContext();

  async function fetchQuestion() {
    try {
      dispatch({ type: "setStatus", payload: "fetching" });
      dispatch({ type: "setUserAnswer", payload: null });
      const response = await fetch(
        "https://opentdb.com/api.php?amount=20&category=18"
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: QuizResponse = await response.json();

      if (data.response_code === 0) {
        const question: Question = data.results[0];

        let randomIndex = Math.round(
          Math.random() * question.incorrect_answers.length
        );
        question.incorrect_answers.splice(
          randomIndex,
          0,
          question.correct_answer
        );

        dispatch({ type: "setStatus", payload: "ready" });
        dispatch({ type: "setQuestion", payload: question });
      } else {
        dispatch({ type: "setStatus", payload: "error" });
      }
    } catch (error) {
      console.log("error: ", error);
      dispatch({ type: "setStatus", payload: "error" });
    }
  }

  useEffect(() => {
    if (state.gameStatus === "idle") {
      fetchQuestion().catch((err) => console.log(err));
    }
  });

  return (
    <>
      {state.gameStatus === "fetching" ? (
        <FullPageLoader />
      ) : state.gameStatus === "error" ? (
        <p>Something went wrong</p>
      ) : (
        <>
          <Score />
          <Game />
        </>
      )}
    </>
  );
}

export default App;
