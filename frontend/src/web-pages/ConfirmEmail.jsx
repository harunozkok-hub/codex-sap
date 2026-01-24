import { NavLink, useLoaderData } from "react-router"
import { Flex, Stack, Heading, Alert, Text, Button } from "@chakra-ui/react"

function ConfirmEmail() {
  const data = useLoaderData()

  let alertStatus =
    data.ok || (!data.ok && data.status === 409) ? "success" : "error"
  let alertTitle = data.ok
    ? "Email Verification Success"
    : "Email Verification Failed"
  let alertMessage = data.message
  let resendVerificationActive = !data.ok && data.status === 401

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
        <Heading>EMAIL CONFIRMATION</Heading>
        <Alert.Root status={alertStatus} title={alertTitle}>
          <Alert.Indicator />
          <Alert.Title>{alertMessage}</Alert.Title>
        </Alert.Root>
        {resendVerificationActive && (
          <>
            <Text mt={4}>Didn't receive any email?</Text>
            <Button as={NavLink} to="/resend-email" variant="outline" mb={3}>
              Resend Email Verification
            </Button>
          </>
        )}
      </Stack>
    </Flex>
  )
}

export default ConfirmEmail
