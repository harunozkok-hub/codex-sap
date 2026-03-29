import { Button, Text, Stack, Heading, Flex, Alert } from "@chakra-ui/react"

import {
  Form,
  useNavigation,
  useActionData,
  NavLink,
  useParams,
} from "react-router"
import { useTranslation } from "react-i18next"

import PageTitle from "../components/generic/PageTitle"
import FormInput from "../components/form/FormInput"
import FormCheckbox from "../components/form/FormCheckbox"
import { resM, resPX, resPY } from "../utils/css-chakra"

function Login() {
  const { t } = useTranslation("common")
  const params = useParams()
  const actionData = useActionData()
  const navigation = useNavigation()
  const pending = navigation.state === "submitting"

  const emailError = actionData?.errors?.email
  const passwordError = actionData?.errors?.password
  const formSubmitError = actionData?.errors?.form
  const showResend = actionData?.needsVerification
  const email = actionData?.email

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
        py={resPY}
        px={resPX}
      >
        <PageTitle ns="common" titleKey="login" />
        <Heading>{t("login").toUpperCase()}</Heading>
        <Form method="POST" style={{ width: "100%" }}>
          <Stack>
            <FormInput
              inputName="email"
              error={emailError}
              label="Email:"
              placeholder={t("e-g-example-example-com")}
              required
            />
            <FormInput
              inputName="password"
              error={passwordError}
              label={t("password")}
              type="password"
              placeholder={t("e-g-mystrongpass_95")}
              required
            />
            <FormCheckbox
              rightControlled
              mt={2}
              inputName="rememberme"
              text={t("remember-me")}
            />

            {formSubmitError && (
              <Alert.Root mt={resM} status="error" title={formSubmitError}>
                <Alert.Indicator />
                <Alert.Title>{formSubmitError}</Alert.Title>
              </Alert.Root>
            )}
            <Button
              type="submit"
              variant="surface"
              colorPalette="green"
              mt={10}
              disabled={showResend}
              loading={pending}
            >
              {t("submit")}
            </Button>
          </Stack>
        </Form>
        {showResend && (
          <>
            <Text fontSize="sm" mt={2}>
              {t("didnt-receive-the-email")}
            </Text>
            <Button
              type="button"
              as={NavLink}
              to={`/${params.lang}/resend-email${email ? `?email=${encodeURIComponent(email)}` : ""}`}
              variant="outline"
              colorPalette="blackAlpha"
              color="green.500"
              w="100%"
              mt={2}
            >
              {t("resend-verification-email")}
            </Button>
          </>
        )}
      </Stack>
    </Flex>
  )
}

export default Login
