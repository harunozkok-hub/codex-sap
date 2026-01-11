import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { Provider } from "./components/ui/provider"
import "./index.css"
import { Theme } from "@chakra-ui/react"
import App from "./App"
import { Toaster } from "./components/ui/toaster"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <Toaster />
      <Theme appearance="light">
        <App />
      </Theme>
    </Provider>
  </StrictMode>
)
