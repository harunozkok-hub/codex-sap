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

function ResendEmail() {
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
          Resend Email Verification:
        </Heading>
        <Text>
          Please enter your email that you have registered to the Hoops Systems!
        </Text>
        <Field.Root required my={5} invalid={!!emailError}>
          <Input name="email" placeholder="Email" defaultValue={defaultEmail} />
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
          colorPalette="blue"
          variant="surface"
          w="100%"
          loading={pending}
        >
          Resend Email Verification
        </Button>
      </Form>
    </VStack>
  )
}

export default ResendEmail
