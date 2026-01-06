import { Box, Container, Heading } from "@chakra-ui/react"

function Home() {
  return (
    <Box pt="60px">
      {" "}
      {/* Add padding top equal to header height */}
      <Container maxW="container.xl" py={8}>
        <Heading mb={4}>Page Content</Heading>
        <Box h="150vh">
          {" "}
          {/* Long content to demonstrate scrolling */}
          Scroll down to see the header stick!
          {/* ... lots of content ... */}
        </Box>
      </Container>
    </Box>
  )
}

export default Home
