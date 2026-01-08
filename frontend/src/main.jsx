import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "./components/ui/provider";
import "./index.css";
import App from "./App.jsx";
import { Theme } from "@chakra-ui/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <Theme appearance="light">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Theme>
    </Provider>
  </StrictMode>
);
