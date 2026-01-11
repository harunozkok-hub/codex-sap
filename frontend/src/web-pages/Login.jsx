import {
  Field,
  Input,
  Checkbox,
  Button,
  Stack,
  Heading,
  Flex,
  Alert,
} from "@chakra-ui/react"

import { Form, useNavigation, useActionData } from "react-router"

function Login() {
  const actionData = useActionData()
  const navigation = useNavigation()
  const pending = navigation.state === "submitting"

  const emailError = actionData?.errors?.email
  const passwordError = actionData?.errors?.password
  const formSubmitError = actionData?.errors?.form

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
        <Heading>LOGIN</Heading>
        <Form method="POST" style={{ width: "100%" }}>
          <Stack>
            <Field.Root invalid={!!emailError}>
              <Field.Label>Email</Field.Label>
              <Input name="email" placeholder="username" />
              {emailError && <Field.ErrorText>{emailError}</Field.ErrorText>}
            </Field.Root>
            <Field.Root invalid={passwordError}>
              <Field.Label>Password</Field.Label>
              <Input type="password" name="password" placeholder="password" />
              {passwordError && (
                <Field.ErrorText>{passwordError}</Field.ErrorText>
              )}
            </Field.Root>

            <Checkbox.Root mt="2" value="remember me" name="rememberme">
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Remember me</Checkbox.Label>
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

export default Login
