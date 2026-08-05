import { Alert, VisuallyHidden } from "@chakra-ui/react"
import { alertStatusStyles } from "@/utils/css-chakra"

const FormAlert = ({
  status = "info",
  title,
  hiddenTitle,
  description,
  borderRadius = "16px",
  ...props
}) => {
  const current = alertStatusStyles[status] || alertStatusStyles.info

  return (
    <Alert.Root
      status={status === "neutral" ? undefined : status}
      borderRadius={borderRadius}
      bg={current.bg}
      border="1px solid"
      borderColor={current.borderColor}
      backdropFilter="blur(10px)"
      boxShadow="inset 0 1px 0 rgba(255,255,255,0.18)"
      {...props}
    >
      <Alert.Indicator color={current.indicatorColor} />

      <Alert.Content gap="1">
        {(hiddenTitle || title) && (
          <VisuallyHidden>{hiddenTitle || title}</VisuallyHidden>
        )}
        {title && (
          <Alert.Title
            fontWeight="700"
            fontSize="sm"
            color={current.titleColor}
            lineHeight="1.6"
            whiteSpace="pre-line"
          >
            {title}
          </Alert.Title>
        )}

        {description && (
          <Alert.Description
            fontSize="sm"
            lineHeight="1.55"
            color={current.descriptionColor}
          >
            {description}
          </Alert.Description>
        )}
      </Alert.Content>
    </Alert.Root>
  )
}

export default FormAlert
