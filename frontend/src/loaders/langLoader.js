import { redirect } from "react-router"
import i18n from "../utils/i18n"
import { getResolvedLanguage } from "../utils/helper-i18n"

const SUPPORTED = ["en", "it", "pt", "es"]

export async function langLoader({ params, request }) {
  await i18n.loadNamespaces("common")
  const url = new URL(request.url)
  const raw = (params.lang || "").toLowerCase()

  // raw is the first segment. If it's not a real lang, treat it as missing lang.
  const isValid = SUPPORTED.includes(raw)
  //const clientLang = await getResolvedLanguage()
  const lang = isValid ? raw : await getResolvedLanguage()

  if (!isValid) {
    // ✅ prefix the full original path (keep /dashboard, /login, etc.)
    throw redirect(`/${lang}${url.pathname}${url.search}`)
  }

  if (i18n.resolvedLanguage !== lang) {
    await i18n.changeLanguage(lang)
  }

  return { lang }
}
