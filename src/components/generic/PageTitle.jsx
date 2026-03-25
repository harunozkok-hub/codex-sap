import { useEffect } from "react"
import { useTranslation } from "react-i18next"

export default function PageTitle({
  ns,
  titleKey = "page-title",
  appName = "HoOps Systems",
}) {
  const { t, i18n } = useTranslation(ns)
  useEffect(() => {
    document.title = `${t(titleKey)} | ${appName}`
  }, [i18n.resolvedLanguage, t, titleKey, appName])
  return null
}
