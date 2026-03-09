import { Flex, Heading } from "@chakra-ui/react"

function RedirectPage({ message }) {
  let content = message ?? "Redirecting"
  return (
    <Flex
      minH="calc(100vh - 60px)"
      flexDirection="column"
      align="center"
      justify="center"
    >
      <Heading>{content}</Heading>
    </Flex>
  )
}

export default RedirectPage
