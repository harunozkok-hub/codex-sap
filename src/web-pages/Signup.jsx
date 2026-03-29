import { Alert, Button, Stack, Heading, Flex } from "@chakra-ui/react"
import { useEffect } from "react"
import {
  Form,
  useActionData,
  useNavigation,
  useNavigate,
  useParams,
} from "react-router"
import { useTranslation } from "react-i18next"
import PageTitle from "../components/generic/PageTitle"
import FormInput from "../components/form/FormInput"
import FormCheckbox from "../components/form/FormCheckbox"
import { resM, resPX, resPY } from "../utils/css-chakra"

const Register = () => {
  const { t } = useTranslation(["common", "profile"])
  const params = useParams()
  const actionData = useActionData()
  const navigation = useNavigation()
  const navigate = useNavigate()
  const pending = navigation.state === "submitting"

  useEffect(() => {
    if (actionData?.ok && actionData?.email) {
      sessionStorage.setItem("pending_signup_email", actionData.email)
      navigate(`/${params.lang}/signup-success`, { replace: true })
    }
  }, [actionData, navigate, params])

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
      <PageTitle ns="common" titleKey="signup" />
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

            <FormInput
              inputName="companyName"
              placeholder={t("company-name-0", { ns: "profile" })}
              label={t("company-name", { ns: "profile" })}
              error={companyNameError}
              required
            />
            <FormInput
              inputName="firstName"
              placeholder={t("first-name-0", { ns: "profile" })}
              label={t("first-name", { ns: "profile" })}
              error={firstNameError}
              required
            />
            <FormInput
              inputName="lastName"
              placeholder={t("last-name-0", { ns: "profile" })}
              label={t("last-name", { ns: "profile" })}
              error={lastNameError}
              required
            />
            <FormInput
              inputName="email"
              placeholder={t("e-g-example-example-com")}
              label="Email"
              error={emailError}
              required
            />
            <FormInput
              type="password"
              inputName="password"
              placeholder={t("e-g-mystrongpass_95")}
              label={t("password")}
              error={passwordError}
              required
            />
            <FormInput
              type="password"
              inputName="confirmPassword"
              placeholder={t("e-g-mystrongpass_95")}
              label={t("confirm-password")}
              error={confirmPasswordError}
              required
            />
            <FormCheckbox
              mt="2"
              inputName="acceptTerms"
              value="acceptTerms"
              text={t("i-have-read-and-agree-to-the-t")}
              error={acceptTermsError}
              required
              rightControlled
            />
            <FormCheckbox
              mt="2"
              inputName="newsletter"
              value="newsletter"
              text={t("subscribe-to-our-newsletter-fo", { ns: "profile" })}
              rightControlled
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
