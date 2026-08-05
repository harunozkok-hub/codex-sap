import { Heading, Text, Flex, Stack } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { Navigate, useParams } from "react-router"

import { resM } from "@/utils/css-chakra"
import GlassEffectContainer from "@/components/containers/GlassEffectContainer"
import PrimaryButton from "@/components/form/PrimaryButton"
import PageTitle from "@/components/generic/PageTitle"

function SignupSuccess() {
  const { t } = useTranslation("common")
  const email = sessionStorage.getItem("pending_signup_email")
  const params = useParams()

  if (!email) return <Navigate to={`/${params.lang}/register`} replace />
  return (
    <Flex
      minH="calc(100vh - 60px)"
      flexDirection="column"
      align="center"
      justify="center"
    >
      <GlassEffectContainer>
        <PageTitle ns="common" titleKey="thanks-for-signing-up-to-hoops" />
        <Heading size="lg" mb={3}>
          {t("thanks-for-signing-up-to-hoops")}
        </Heading>
        <Stack>
          <Text>
            {t("we-sent-a-confirmation-email-t")} <b>{email}</b>
          </Text>
          <Text my={3}>{t("if-you-didnt-receive-it-click-")}</Text>

          <PrimaryButton
            type="submit"
            to={`/${params.lang}/resend-email`}
            mt={resM}
            label={t("resend-verification-email")}
          />
        </Stack>
      </GlassEffectContainer>
    </Flex>
  )
}

export default SignupSuccess
