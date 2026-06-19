import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { OutingsProvider } from "./context/OutingsContext.tsx";
import { LoadingProvider } from "./context/LoadingContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      <UserProvider>
        <OutingsProvider>
          <App />
        </OutingsProvider>
      </UserProvider>
    </LoadingProvider>
  </StrictMode>
);
