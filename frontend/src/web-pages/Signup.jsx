import { autofillInput } from "../utils/css-chakra"
import {
  Alert,
  Field,
  Input,
  Checkbox,
  Button,
  Stack,
  Heading,
  Flex,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { Form, useActionData, useNavigation, useNavigate } from "react-router"
import { useTranslation, withTranslation } from "react-i18next"

const Register = () => {
  const { t } = useTranslation(["common", "profile"])
  const actionData = useActionData()
  const navigation = useNavigation()
  const navigate = useNavigate()
  const pending = navigation.state === "submitting"

  useEffect(() => {
    if (actionData?.ok && actionData?.email) {
      sessionStorage.setItem("pending_signup_email", actionData.email)
      navigate("/signup-success", { replace: true })
    }
  }, [actionData, navigate])

  const formSubmitError = actionData?.errors?.form
  const companyNameError = actionData?.errors?.companyName
  const firstNameError = actionData?.errors?.firstName
  const lastNameError = actionData?.errors?.lastName
  const emailError = actionData?.errors?.email
  const passwordError = actionData?.errors?.password?.password
  const confirmPasswordError = actionData?.errors?.password?.confirmPassword
  const acceptTermsError = actionData?.errors?.acceptTerms

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
        <Heading>{t("signup").toUpperCase()}</Heading>

        <Form method="POST" style={{ width: "100%" }}>
          <Stack>
            <Alert.Root
              status="info"
              title={t("single-admin-registry-per-comp")}
            >
              <Alert.Indicator />
              <Alert.Title>{t("please-note-that-you-can-regis")}</Alert.Title>
            </Alert.Root>

            <Field.Root required invalid={!!companyNameError}>
              <Field.Label>
                {t("company-name", { ns: "profile" })}
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                name="companyName"
                _autofill={autofillInput}
                placeholder={t("company-name-0", { ns: "profile" })}
              />
              {companyNameError && (
                <Field.ErrorText>{companyNameError}</Field.ErrorText>
              )}
            </Field.Root>
            <Field.Root required invalid={!!firstNameError}>
              <Field.Label>
                {t("first-name", { ns: "profile" })}
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                name="firstName"
                _autofill={autofillInput}
                placeholder={t("first-name-0", { ns: "profile" })}
              />
              {firstNameError && (
                <Field.ErrorText>{firstNameError}</Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root required invalid={!!lastNameError}>
              <Field.Label>
                {t("last-name", { ns: "profile" })}
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                name="lastName"
                _autofill={autofillInput}
                placeholder={t("last-name-0", { ns: "profile" })}
              />
              {lastNameError && (
                <Field.ErrorText>{lastNameError}</Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root required invalid={!!emailError}>
              <Field.Label>
                Email <Field.RequiredIndicator />
              </Field.Label>
              <Input
                name="email"
                placeholder={t("e-g-example-example-com")}
                _autofill={autofillInput}
              />
              {emailError && <Field.ErrorText>{emailError}</Field.ErrorText>}
            </Field.Root>

            <Field.Root required invalid={!!passwordError}>
              <Field.Label>
                {t("password")}
                <Field.RequiredIndicator />
              </Field.Label>
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

            <Field.Root required invalid={!!confirmPasswordError}>
              <Field.Label>
                {t("confirm-password")}
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                type="password"
                name="confirmPassword"
                _autofill={autofillInput}
                placeholder={t("e-g-mystrongpass_95")}
              />
              {confirmPasswordError && (
                <Field.ErrorText>{confirmPasswordError}</Field.ErrorText>
              )}
            </Field.Root>
            <Field.Root required invalid={!!acceptTermsError}>
              <Field.Label>
                {t("accept-terms")} <Field.RequiredIndicator />
              </Field.Label>
              <Checkbox.Root mt="2" name="acceptTerms" value="acceptTerms">
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>
                  {t("i-have-read-and-agree-to-the-t")}
                </Checkbox.Label>
              </Checkbox.Root>
              {acceptTermsError && (
                <Field.ErrorText>{acceptTermsError}</Field.ErrorText>
              )}
            </Field.Root>

            <Checkbox.Root mt="2" name="newsletter" value="newsletter">
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>
                {t("subscribe-to-our-newsletter-fo", { ns: "profile" })}
              </Checkbox.Label>
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
      </Stack>
    </Flex>
  )
}

export default Register
