import { Flex, Heading, Text, Stack } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { useLoaderData, useParams } from "react-router"

import FormAlert from "@/components/form/FormAlert"
import PrimaryButton from "@/components/form/PrimaryButton"
import GlassEffectContainer from "@/components/containers/GlassEffectContainer"
import PageTitle from "@/components/generic/PageTitle"

function ConfirmEmail() {
  const { t } = useTranslation("common")
  const params = useParams()
  const data = useLoaderData()

  let alertStatus =
    data.ok || (!data.ok && data.status === 409) ? "success" : "error"
  let alertTitle = data.ok
    ? t("email-verification-success")
    : t("email-verification-failed")
  let alertMessage = data.message
  let resendVerificationActive = !data.ok && data.status === 410

  return (
    <Flex
      minH="calc(100vh - 60px)"
      flexDirection="column"
      align="center"
      justify="center"
    >
      <GlassEffectContainer>
        <PageTitle ns="common" titleKey="email-confirmation" />
        <Heading>{t("email-confirmation")}</Heading>
        <FormAlert
          status={alertStatus}
          title={alertTitle}
          description={alertMessage}
        />
        {resendVerificationActive && (
          <Stack w="100%">
            <Text mt={4} alignSelf="center">
              {t("didnt-receive-the-email")}
            </Text>
            <PrimaryButton
              type="submit"
              to={`/${params.lang}/resend-email`}
              label={t("resend-verification-email")}
            />
          </Stack>
        )}
      </GlassEffectContainer>
    </Flex>
  )
}

export default ConfirmEmail
