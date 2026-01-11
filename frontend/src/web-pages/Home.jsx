import { Container, Heading, Box, Flex } from "@chakra-ui/react"

function Home() {
  return (
    <Container fluid>
      <Flex
        rounded="md"
        shadow="xs"
        py={{ base: 3, md: 5 }}
        px={{ base: 3, md: 6 }}
        direction="column" // ✅ ensures Heading + Box stack nicely
        align="center"
      >
        <Heading mb={4}>Page Content</Heading>
        <Box h="150vh">Scroll down to see the header stick!</Box>
      </Flex>
    </Container>
  )
}

export default Home
