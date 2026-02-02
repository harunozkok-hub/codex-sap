import i18n, { initPromise } from "./i18n"

export const loadNamespaces = async (ns) => await i18n.loadNamespaces(ns)
export const t = (key, options = {}) => i18n.t(key, options)
export const getResolvedLanguage = async () => {
  await initPromise
  return i18n.resolvedLanguage
}
