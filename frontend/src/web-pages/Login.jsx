import {
  Field,
  Input,
  Checkbox,
  Button,
  Text,
  Stack,
  Heading,
  Flex,
  Alert,
} from "@chakra-ui/react"
import { autofillInput } from "../utils/css-chakra"
import { Form, useNavigation, useActionData, NavLink } from "react-router"
import { useTranslation, withTranslation } from "react-i18next"

function Login() {
  const { t } = useTranslation("common")
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
        py={{ base: 3, md: 5 }}
        px={{ base: 3, md: 6 }}
      >
        <Heading>{t("login").toUpperCase()}</Heading>
        <Form method="POST" style={{ width: "100%" }}>
          <Stack>
            <Field.Root invalid={!!emailError}>
              <Field.Label>Email:</Field.Label>
              <Input
                name="email"
                _autofill={autofillInput}
                placeholder={t("e-g-example-example-com")}
              />
              {emailError && <Field.ErrorText>{emailError}</Field.ErrorText>}
            </Field.Root>
            <Field.Root invalid={passwordError}>
              <Field.Label>{t("password")}</Field.Label>
              <Input
                type="password"
                name="password"
                _autofill={autofillInput}
                placeholder={t("e-g-mystrongpass_95")}
              />
              {passwordError && (
                <Field.ErrorText>{passwordError}</Field.ErrorText>
              )}
            </Field.Root>

            <Checkbox.Root mt="2" value="remember me" name="rememberme">
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>{t("remember-me")}</Checkbox.Label>
            </Checkbox.Root>

            {formSubmitError && (
              <Alert.Root status="error" title={formSubmitError}>
                <Alert.Indicator />
                <Alert.Title>{formSubmitError}</Alert.Title>
              </Alert.Root>
            )}
            <Button
              type="submit"
              variant="surface"
              colorPalette="green"
              mt={10}
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
              as={NavLink}
              to={`/resend-email${email ? `?email=${encodeURIComponent(email)}` : ""}`}
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
