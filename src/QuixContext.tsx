import { createContext, useContext, useReducer } from "react";

interface QuizUseContext {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

interface QuizState {
  gameStatus: Status;
}

type Status = "idle" | "fetching" | "ready";

type QuizAction = { type: "reset" } | { type: "setStatus"; payload: Status };

const initialState: QuizState = {
  gameStatus: "idle",
};

const QuizContext = createContext<QuizUseContext>({
  state: initialState,
  dispatch: () => null,
});

export function QuizProvider({ children }: { children: React.ReactElement }) {
  const [state, dispatch] = useReducer(QuizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export const useQuixContext = () => useContext(QuizContext);

function QuizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "setStatus":
      return { ...state, gameStatus: action.payload };
    default:
      throw new Error("Unknown action");
  }
}
