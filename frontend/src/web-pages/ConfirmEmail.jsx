import { NavLink, useLoaderData } from "react-router"
import { Flex, Stack, Heading, Alert, Text, Button } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

function ConfirmEmail() {
  const { t } = useTranslation("common")
  const data = useLoaderData()

  let alertStatus =
    data.ok || (!data.ok && data.status === 409) ? "success" : "error"
  let alertTitle = data.ok
    ? t("email-verification-success")
    : t("email-verification-failed")
  let alertMessage = data.message
  let resendVerificationActive = !data.ok && data.status === 401

  return (
    <Flex
      minH="calc(100vh - 60px)"
      flexDirection="column"
      align="center"
      justify="center"
    >
      <Stack
        maxW={{ base: "sm", md: "lg" }}
        width="100%"
        gap="4"
        align="center"
        rounded="md"
        shadow="xs"
        py={{ base: 3, md: 5 }}
        px={{ base: 3, md: 6 }}
      >
        <Heading>{t("email-confirmation")}</Heading>
        <Alert.Root status={alertStatus} title={alertTitle}>
          <Alert.Indicator />
          <Alert.Title>{alertMessage}</Alert.Title>
        </Alert.Root>
        {resendVerificationActive && (
          <>
            <Text mt={4}>{t("didnt-receive-the-email")}</Text>
            <Button
              as={NavLink}
              to="/resend-email"
              variant="surface"
              colorPalette="green"
              mb={3}
            >
              {t("resend-verification-email")}
            </Button>
          </>
        )}
      </Stack>
    </Flex>
  )
}

export default ConfirmEmail
