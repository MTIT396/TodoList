import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SelectProvider } from "./contexts/SelectContext.tsx";
import AddTodoProvider from "./contexts/AddTodoContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AddTodoProvider>
      <SelectProvider>
        <App />
      </SelectProvider>
    </AddTodoProvider>
  </StrictMode>
);
