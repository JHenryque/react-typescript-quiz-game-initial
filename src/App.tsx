import "./App.scss";
import Score from "./components/Score.tsx";
import Game from "./components/Game.tsx";
import { useQuixContext } from "./QuixContext.tsx";

function App() {
  const { state, dispatch } = useQuixContext();
  console.log(state);

  return (
    <>
      <Score />
      <Game />
      <h2>Status: {state.gameStatus} </h2>
      <button
        onClick={() => dispatch({ type: "setStatus", payload: "fetching" })}
      >
        Ser Loading
      </button>
    </>
  );
}

export default App;
