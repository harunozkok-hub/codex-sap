import { VStack, Heading, Text, Button } from "@chakra-ui/react"
import { Navigate, NavLink, useParams } from "react-router"
import { useTranslation } from "react-i18next"
import PageTitle from "../components/generic/PageTitle"

function SignupSuccess() {
  const { t } = useTranslation("common")
  const email = sessionStorage.getItem("pending_signup_email")
  const params = useParams()

  if (!email) return <Navigate to={`/${params.lang}/register`} replace />
  return (
    <VStack padding={5} m={5} shadow="xs" rounded="md">
      <PageTitle ns="common" titleKey="thanks-for-signing-up-to-hoops" />
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
        to={`/${params.lang}/resend-email`}
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
