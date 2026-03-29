import { resPX, resPY } from "../utils/css-chakra"
import { Container, Heading, Box, Flex } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

function Home() {
  const { t } = useTranslation("homepage")

  return (
    <Container fluid>
      <Flex
        rounded="md"
        shadow="xs"
        py={resPY}
        px={resPX}
        direction="column" // ✅ ensures Heading + Box stack nicely
        align="center"
      >
        <Heading mb={4}>Webpage Title</Heading>
        <Box h="150vh">Scroll down to test the sticky header!</Box>
      </Flex>
    </Container>
  )
}

export default Home
