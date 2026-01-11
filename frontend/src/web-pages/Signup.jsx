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
import { Form, useActionData, useNavigation } from "react-router"

const Register = () => {
  const actionData = useActionData()
  const navigation = useNavigation()
  const pending = navigation.state === "submitting"

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
        <Heading>REGISTER</Heading>

        <Form method="POST" style={{ width: "100%" }}>
          <Stack>
            <Alert.Root status="info" title="Single admin registry per company">
              <Alert.Indicator />
              <Alert.Title>
                Please note that you can register with your company name only
                once. This will make you admin account for the account
                automatically. The other users can join to your company
                dashboard with registry code
              </Alert.Title>
            </Alert.Root>

            <Field.Root required invalid={!!companyNameError}>
              <Field.Label>
                Company name
                <Field.RequiredIndicator />
              </Field.Label>
              <Input name="companyName" placeholder="Company name" />
              {companyNameError && (
                <Field.ErrorText>{companyNameError}</Field.ErrorText>
              )}
            </Field.Root>
            <Field.Root required invalid={!!firstNameError}>
              <Field.Label>
                First name
                <Field.RequiredIndicator />
              </Field.Label>
              <Input name="firstName" placeholder="First name" />
              {firstNameError && (
                <Field.ErrorText>{firstNameError}</Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root required invalid={!!lastNameError}>
              <Field.Label>
                Last name
                <Field.RequiredIndicator />
              </Field.Label>
              <Input name="lastName" placeholder="Last name" />
              {lastNameError && (
                <Field.ErrorText>{lastNameError}</Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root required invalid={!!emailError}>
              <Field.Label>
                Email <Field.RequiredIndicator />
              </Field.Label>
              <Input name="email" placeholder="Email" />
              {emailError && <Field.ErrorText>{emailError}</Field.ErrorText>}
            </Field.Root>

            <Field.Root required invalid={!!passwordError}>
              <Field.Label>
                Password
                <Field.RequiredIndicator />
              </Field.Label>
              <Input type="password" name="password" placeholder="Password" />
              {passwordError && (
                <Field.ErrorText>{passwordError}</Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root required invalid={!!confirmPasswordError}>
              <Field.Label>
                Confirm Password
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
              />
              {confirmPasswordError && (
                <Field.ErrorText>{confirmPasswordError}</Field.ErrorText>
              )}
            </Field.Root>
            <Field.Root required invalid={!!acceptTermsError}>
              <Field.Label>
                Accept terms <Field.RequiredIndicator />
              </Field.Label>
              <Checkbox.Root mt="2" name="acceptTerms" value="acceptTerms">
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>
                  I have read and agree to the Terms and Conditions
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
                Subscribe to our newsletter for news & offers
              </Checkbox.Label>
            </Checkbox.Root>
            {formSubmitError && (
              <Alert.Root status="error" title={formSubmitError}>
                <Alert.Indicator />
                <Alert.Title>{formSubmitError}</Alert.Title>
              </Alert.Root>
            )}

            <Button type="submit" variant="solid" mt={10} loading={pending}>
              Submit
            </Button>
          </Stack>
        </Form>
      </Stack>
    </Flex>
  )
}

export default Register
