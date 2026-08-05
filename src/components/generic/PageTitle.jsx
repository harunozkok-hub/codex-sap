import { useEffect } from "react"
import { useTranslation } from "react-i18next"

export default function PageTitle({
  ns,
  title,
  titleKey = "page-title",
  appName = "HoOps Systems",
}) {
  const { t, i18n } = useTranslation(ns)

  useEffect(() => {
    const resolvedTitle = title || t(titleKey)
    document.title = `${resolvedTitle} | ${appName}`
  }, [i18n.resolvedLanguage, t, title, titleKey, appName])

  return null
}
