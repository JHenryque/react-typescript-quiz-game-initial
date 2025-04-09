import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { QuizProvider } from "./QuixContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QuizProvider>
    <App />
  </QuizProvider>
);
