import {
  Box,
  Flex,
  HStack,
  Avatar,
  Button,
  Image,
  useMediaQuery,
  Menu,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react"
import { NavLink, Outlet, useRouteLoaderData } from "react-router"
import logo from "../assets/hoops-icon.png"
import SidebarHome from "./SidebarHome"

const MAX_W = "1600px"
const HEADER_H = "70px"

function LayoutWeb() {
  const { profile } = useRouteLoaderData("home-page")
  const [isDesktop] = useMediaQuery("(min-width: 1024px)")

  let avatarName
  if (profile) {
    avatarName = profile.first_name + " " + profile.last_name
  }

  let userBox = profile ? (
    <HStack>
      {isDesktop && (
        <VStack
          align="flex-end"
          mx={5}
          pl={5}
          borderLeftWidth="1px"
          borderColor="whiteAlpha.300"
        >
          <Text textStyle="md">Welcome,</Text>
          <Text textStyle="sm">{avatarName}</Text>
        </VStack>
      )}
      {isDesktop ? (
        <Menu.Root
          size={100}
          variant="solid"
          positioning={{ placement: "bottom-end" }}
        >
          <Menu.Trigger focusRing="mixed">
            <Avatar.Root variant="outline" shape="rounded">
              <Avatar.Fallback name={avatarName} color="white" />
            </Avatar.Root>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content my={2} mx={-5}>
                <SidebarHome />
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      ) : (
        <Avatar.Root variant="outline" shape="rounded">
          <Avatar.Fallback name={avatarName} color="white" />
        </Avatar.Root>
      )}
    </HStack>
  ) : (
    <HStack
      gap={3}
      mx={5}
      pl={5}
      borderLeftWidth="1px"
      borderColor="whiteAlpha.300"
    >
      <Button as={NavLink} to="login" colorPalette="blue" variant="solid">
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
  )

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
            {userBox}
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
