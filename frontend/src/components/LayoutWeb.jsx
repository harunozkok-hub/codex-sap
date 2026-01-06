import { Box, Flex, HStack, Heading } from "@chakra-ui/react"

import { Outlet } from "react-router"

function LayoutWeb() {
  return (
    <Flex bg="gray.50" minH="100vh">
      <Box
        bg="blue.700"
        as="header"
        position="fixed"
        top={0}
        width="100%"
        color="white"
        boxShadow="sm"
        zIndex={1000}
        h="60px"
      >
        <HStack
          display="flex"
          alignItems="center"
          justify="space-between"
          h="100%"
          padding={5}
        >
          <Heading size="md">Hopps Systems</Heading>
          <Heading size="md">My Sticky Nav</Heading>
        </HStack>
      </Box>
      <Box as="main" px={{ base: 4, md: 6 }} py={{ base: 4, md: 6 }}>
        <Outlet />
      </Box>
    </Flex>
  )
}

export default LayoutWeb
