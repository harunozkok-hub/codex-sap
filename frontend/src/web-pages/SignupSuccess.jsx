import { VStack, Heading, Text, Button } from "@chakra-ui/react"
import { Navigate, NavLink } from "react-router"
import { useTranslation } from "react-i18next"

function SignupSuccess() {
  const { t } = useTranslation("common")
  const email = sessionStorage.getItem("pending_signup_email")

  if (!email) return <Navigate to="/register" replace />
  return (
    <VStack padding={5} m={5} shadow="xs" rounded="md">
      <Heading size="md" mb={3}>
        {t("thanks-for-signing-up-to-hoops")}
      </Heading>
      <Text>
        {t("we-sent-a-confirmation-email-t")} <b>{email}</b>
      </Text>
      <Text my={3}>{t("if-you-didnt-receive-it-click-")}</Text>

      <Button
        type="submit"
        as={NavLink}
        to="/resend-email"
        colorPalette="green"
        variant="surface"
        w={{ base: "100%", md: "50%" }}
      >
        {t("resend-verification-email")}
      </Button>
    </VStack>
  )
}

export default SignupSuccess
