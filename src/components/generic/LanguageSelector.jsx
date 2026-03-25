import { NativeSelect } from "@chakra-ui/react"
import { useParams, useNavigate, useLocation } from "react-router"

import { useTranslation } from "react-i18next"

function LanguageSelector({ size, dark }) {
  const { t } = useTranslation("common")
  const { lang } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const LANGUAGES = [
    { code: "en", label: t("english"), flag: "🇬🇧" },
    { code: "es", label: t("spanish"), flag: "🇪🇸" },
    { code: "it", label: t("italian"), flag: "🇮🇹" },
    { code: "pt", label: t("portuguese"), flag: "🇧🇷" },
    // { code: "de", label: t("german"), flag: "🇩🇪" },
    // { code: "fr", label: t("french"), flag: "🇫🇷" },
  ]
  const handleChangeLanguage = (e) => {
    const newLang = e.target.value

    // replace current /:lang in pathname
    const newPath = location.pathname.replace(/^\/[^/]+/, `/${newLang}`)

    navigate(newPath + location.search, { replace: true })
  }
  return (
    <NativeSelect.Root size={size === "lg" ? "sm" : "xs"}>
      <NativeSelect.Field
        value={lang}
        onChange={handleChangeLanguage}
        borderColor={dark ? "blackAlpha.600" : "whiteAlpha.300"}
      >
        {LANGUAGES.map((item) => (
          <option key={item.code} value={item.code}>
            {size === "lg"
              ? `${item.flag} - ${item.label}`
              : `${item.flag} - ${item.code.toUpperCase()}`}
          </option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  )
}

export default LanguageSelector
