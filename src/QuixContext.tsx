import { createContext, useContext, useReducer } from "react";

export interface Question {
  type: "multiple" | "boolean";
  difficulty: "easy" | "medium" | "hard";
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizResponse {
  response_code: number;
  results: Question[];
}

interface QuizUseContext {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

interface QuizState {
  question: Question | null;
  gameStatus: Status;
}

type Status = "idle" | "fetching" | "ready" | "error";

type QuizAction =
  | { type: "setStatus"; payload: Status }
  | { type: "setQuestion"; payload: Question };

const initialState: QuizState = {
  gameStatus: "idle",
  question: null,
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
    case "setQuestion":
      return { ...state, question: action.payload };
    case "setStatus":
      return { ...state, gameStatus: action.payload };
    default:
      throw new Error("Unknown action");
  }
}
