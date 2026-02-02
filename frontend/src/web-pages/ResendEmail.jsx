import {
  VStack,
  Heading,
  Text,
  Field,
  Button,
  Input,
  Alert,
} from "@chakra-ui/react"
import {
  Form,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router"
import { autofillInput } from "../utils/css-chakra"
import { useTranslation, withTranslation } from "react-i18next"

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
      <Form method="post">
        <Heading size="md" mb={3}>
          {t("resend-verification-email").toUpperCase()}:
        </Heading>
        <Text>{t("please-enter-your-email-that-y")}</Text>
        <Field.Root required my={5} invalid={!!emailError}>
          <Input
            name="email"
            placeholder={t("e-g-example-example-com")}
            _autofill={autofillInput}
            defaultValue={defaultEmail}
          />
          {emailError && <Field.ErrorText>{emailError}</Field.ErrorText>}
        </Field.Root>
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
        >
          {t("resend-verification-email")}
        </Button>
      </Form>
    </VStack>
  )
}

const ExtendedResendEmail = withTranslation("validators")(ResendEmail)

export default ExtendedResendEmail
