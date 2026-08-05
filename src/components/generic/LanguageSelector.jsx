import { NativeSelect, Box, Field, HStack } from "@chakra-ui/react"
import { useParams, useNavigate, useLocation } from "react-router"
import { useTranslation } from "react-i18next"
import { glassSelectStyles } from "@/utils/css-chakra"
import { LANGUAGES } from "@/utils/languages"
import GenericToggleTip from "@/components/generic/GenericToggleTip"

function LanguageSelector({
  size,
  label,
  tooltipInfo = null,
  readOnly = false,
  required = false,
  disabled = false,
  error,
}) {
  const { t } = useTranslation("common")
  const { lang } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const handleChangeLanguage = (e) => {
    const newLang = e.target.value

    // replace current /:lang in pathname
    const newPath = location.pathname.replace(/^\/[^/]+/, `/${newLang}`)

    navigate(newPath + location.search, { replace: true })
  }
  return (
    <Box rounded="sm" display="flex">
      <Field.Root
        justifyContent="flex-start"
        invalid={!!error}
        readOnly={readOnly}
        disabled={readOnly || disabled}
        required={required}
      >
        {label && (
          <HStack mb="0.5" gap="1" minH="24px">
            <Field.Label m="0" fontSize="sm" fontWeight="600" color="gray.700">
              {label}
            </Field.Label>
            {required && <Field.RequiredIndicator />}
            {tooltipInfo && <GenericToggleTip content={tooltipInfo} />}
          </HStack>
        )}
        <NativeSelect.Root size={size === "lg" ? "sm" : "xs"}>
          <NativeSelect.Field
            value={lang}
            onChange={handleChangeLanguage}
            {...glassSelectStyles}
          >
            {LANGUAGES(t).map((item) => (
              <option key={item.code} value={item.code}>
                {size === "lg"
                  ? `${item.flag} - ${item.label}`
                  : `${item.flag} - ${item.code.toUpperCase()}`}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>
    </Box>
  )
}

export default LanguageSelector
