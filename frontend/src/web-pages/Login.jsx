import { Flex, Box } from "@chakra-ui/react"

function Login() {
  return (
    <Flex gap="4" justify="center">
      <Box height="10" width="120px" />
      <Box
        bg="white"
        borderWidth="1px"
        borderColor="gray.100"
        borderRadius="lg"
        p={4}
        h="100%"
        boxShadow="sm"
      >
        center
      </Box>
      <Box height="10" width="120px" />
    </Flex>
  )
}

export default Login
