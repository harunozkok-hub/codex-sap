import { VStack, Heading, Text, Button } from "@chakra-ui/react"
import { Navigate, NavLink } from "react-router"

function SignupSuccess() {
  const email = sessionStorage.getItem("pending_signup_email")

  if (!email) return <Navigate to="/register" replace />
  return (
    <VStack padding={5} m={5} shadow="xs" rounded="md">
      <Heading size="md" mb={3}>
        Thanks for signing up to HoOps Systems!
      </Heading>
      <Text>
        We sent a confirmation email to: <b>{email}</b>
      </Text>
      <Text my={3}>
        If you didn’t receive it, click the button below to resend it:
      </Text>

      <Button
        type="submit"
        as={NavLink}
        to="/resend-email"
        colorPalette="blue"
        variant="surface"
        w={{ base: "100%", md: "50%" }}
      >
        Resend Email Verification
      </Button>
    </VStack>
  )
}

export default SignupSuccess
