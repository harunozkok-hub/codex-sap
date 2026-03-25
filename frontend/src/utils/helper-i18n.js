import i18n, { initPromise } from "./i18n"

export const loadNamespaces = async (ns) => await i18n.loadNamespaces(ns)
export const t = (key, options = {}) => i18n.t(key, options)
export const getCurrentLanguage = () => {
  if (typeof window !== "undefined") {
    const storedLang = window.localStorage.getItem("i18nextLng")
    if (storedLang) return storedLang
  }

  return i18n.resolvedLanguage || i18n.language || "en"
}

export const getResolvedLanguage = async () => {
  await initPromise
  return i18n.resolvedLanguage
}
