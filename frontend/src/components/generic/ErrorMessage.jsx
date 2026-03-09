import { Alert } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

const ErrorMessage = ({ title, description }) => {
  const { t } = useTranslation("common")
  return (
    <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>{title || t("something-went-wrong")}</Alert.Title>
        {description && <Alert.Description>{description}</Alert.Description>}
      </Alert.Content>
    </Alert.Root>
  )
}

export default ErrorMessage
