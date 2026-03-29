import { VStack, Heading, Text, Button, Alert } from "@chakra-ui/react"
import {
  Form,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router"
import { useTranslation } from "react-i18next"
import PageTitle from "../components/generic/PageTitle"
import FormInput from "../components/form/FormInput"
import { resM } from "../utils/css-chakra"

function ResendEmail() {
  const { t } = useTranslation("common")
  const [params] = useSearchParams()

  const emailFromQuery = params.get("email") || ""
  const emailFromSession = sessionStorage.getItem("pending_signup_email") || ""
  const defaultEmail = emailFromQuery || emailFromSession

  const actionData = useActionData()
  const navigation = useNavigation()
  const emailError = actionData?.errors?.email
  const formSubmitError = actionData?.errors?.form
  const pending = navigation.state === "submitting"

  return (
    <VStack padding={5} m={5} shadow="xs" rounded="md">
      <PageTitle ns="common" titleKey="resend-verification-email" />
      <Form method="post">
        <Heading size="md" mb={3}>
          {t("resend-verification-email").toUpperCase()}:
        </Heading>
        <Text mb={resM}>{t("please-enter-your-email-that-y")}</Text>
        <FormInput
          inputName="email"
          label="Email"
          placeholder={t("e-g-example-example-com")}
          error={emailError}
          value={actionData?.email ?? defaultEmail}
          required
        />
        {formSubmitError && (
          <Alert.Root status="error" title={formSubmitError}>
            <Alert.Indicator />
            <Alert.Title>{formSubmitError}</Alert.Title>
          </Alert.Root>
        )}
        <Button
          type="submit"
          colorPalette="green"
          variant="surface"
          w="100%"
          loading={pending}
          my={resM}
        >
          {t("resend-verification-email")}
        </Button>
      </Form>
    </VStack>
  )
}

export default ResendEmail
