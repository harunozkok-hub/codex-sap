import { Box, Flex, HStack, Heading, Button, Image } from "@chakra-ui/react"
import { NavLink, Outlet } from "react-router"
import logo from "../assets/hoops-icon.png"

const MAX_W = "1600px"
const HEADER_H = "70px"

function LayoutWeb() {
  return (
    <Flex bg="gray.50" justifyContent="center" minH="100vh">
      {/* ✅ Shell must have width */}
      <Box w="100%" maxW={MAX_W} mx="auto" shadow="md" bg="white">
        <Box
          bg="blue.700"
          as="header"
          position="fixed"
          top={0}
          left="50%"
          transform="translateX(-50%)"
          px={{ base: 3, md: 5 }}
          maxW={MAX_W}
          w="100%"
          color="white"
          boxShadow="sm"
          zIndex={1000}
          h={HEADER_H}
        >
          <HStack alignItems="center" justify="space-between" h="100%">
            <Box as={NavLink} to="" cursor="pointer">
              <Image
                src={logo}
                alt="hoops-logo"
                fit="cover"
                aspectRatio={2 / 1}
                width="140px"
              />
            </Box>
            <HStack gap={3}>
              <Button
                as={NavLink}
                to="login"
                colorPalette="blue"
                variant="solid"
              >
                Login
              </Button>
              <Button
                colorPalette="blackAlpha"
                variant="surface"
                as={NavLink}
                to="register"
              >
                Register
              </Button>
            </HStack>
          </HStack>
        </Box>

        <Box as="main" pt={HEADER_H}>
          {/* ✅ Make main content stretch inside shell */}
          <Box w="100%" px={{ base: 3, md: 4 }} py={{ base: 3, md: 4 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export default LayoutWeb
