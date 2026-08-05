import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"

import "@/index.css"
import "@/utils/i18n"

import App from "@/App"
import FullpageSpinner from "@/components/generic/FullpageSpinner"
import { Provider } from "@/components/ui/provider"
import { Toaster } from "@/components/ui/toaster"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <Suspense fallback={<FullpageSpinner />}>
        <Toaster />
        <App />
      </Suspense>
    </Provider>
  </StrictMode>,
)
