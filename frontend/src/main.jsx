import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"

import { Provider } from "./components/ui/provider"
import "./index.css"

import App from "./App"
import { Toaster } from "./components/ui/toaster"
import "./utils/i18n"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <Toaster />
      <App />
    </Provider>
  </StrictMode>,
)
