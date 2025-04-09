import "./App.scss";
import Score from "./components/Score.tsx";
import Game from "./components/Game.tsx";
import { useQuixContext } from "./QuixContext.tsx";

function App() {
  const state = useQuixContext();
  console.log(state);

  return (
    <>
      <Score />
      <Game />
    </>
  );
}

export default App;
