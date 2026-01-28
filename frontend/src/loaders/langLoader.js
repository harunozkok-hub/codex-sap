import { redirect } from "react-router"
import i18n from "../utils/i18n"

const SUPPORTED = ["en", "it", "pt", "es"]
const DEFAULT_LANG = "en"

function fromStorage() {
  return localStorage.getItem("i18nextLng") || DEFAULT_LANG
}

export async function langLoader({ params, request }) {
  const url = new URL(request.url)
  const raw = (params.lang || "").toLowerCase()

  // raw is the first segment. If it's not a real lang, treat it as missing lang.
  const isValid = SUPPORTED.includes(raw)
  const lang = isValid ? raw : fromStorage()

  if (!isValid) {
    // ✅ prefix the full original path (keep /dashboard, /login, etc.)
    throw redirect(`/${lang}${url.pathname}${url.search}`)
  }

  if (i18n.resolvedLanguage !== lang) {
    await i18n.changeLanguage(lang)
  }

  return { lang }
}
