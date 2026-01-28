import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import Backend from "i18next-http-backend"

import LanguageDetector from "i18next-browser-languagedetector"
import { cache } from "react"
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  .use(Backend)
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
    detection: {
      lookupCookie: "i18next",
      lookupLocalStorage: "i18nextLng",
      lookupSessionStorage: "i18nextLng",
      order: [
        "localStorage",
        "querystring",
        "cookie",
        "sessionStorage",
        "navigator",
        "htmlTag",
      ],

      caches: ["localStorage", "cookie"],
    },
    fallbackLng: "en",
    ns: ["common", "homepage", "home-sidebar"],
    supportedLngs: ["en", "es", "it", "pt"],
    debug: true,
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18n
