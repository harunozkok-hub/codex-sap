import {
  Box,
  Drawer,
  Flex,
  HStack,
  IconButton,
  Portal,
  Text,
  useDisclosure,
  useMediaQuery,
  Image,
} from "@chakra-ui/react"
import { FiMenu, FiX } from "react-icons/fi"
import { Outlet, NavLink, useRouteLoaderData } from "react-router"
import Sidebar from "./Sidebar"
import logo from "../assets/hoops-icon.png"

function Layout() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { profile } = useRouteLoaderData("dashboard")
  const [isDesktop] = useMediaQuery("(min-width: 1024px)")

  return (
    <Flex bg="gray.50" minH="100vh">
      {isDesktop ? (
        <Box
          w={{ sm: "280px", xl: "320px" }}
          bg="gray.100"
          borderRightWidth="1px"
          borderColor="gray.100"
          position="sticky"
          top={0}
          h="100vh"
        >
          <Sidebar />
        </Box>
      ) : null}

      <Box flex="1" minW={0}>
        <Drawer.Root
          size="sm"
          open={!isDesktop && isOpen}
          onOpenChange={(open) => (open ? onOpen() : onClose())}
          placement="start"
        >
          <HStack
            as="header"
            align="center"
            justify="space-between"
            spacing={3}
            px={4}
            py={3}
            borderBottomWidth="1px"
            borderColor="gray.100"
            bg="white"
            position="sticky"
            top={0}
            zIndex={1}
          >
            {!isDesktop ? (
              <Drawer.Trigger asChild>
                <IconButton
                  aria-label="Open menu"
                  variant="surface"
                  color="blue.700"
                  _hover={{ bg: "gray.100" }}
                  bg="white"
                  mx={3}
                  onClick={onOpen}
                >
                  <FiMenu />
                </IconButton>
              </Drawer.Trigger>
            ) : null}
            <Text fontWeight="bold" fontSize="lg" color="gray.800">
              {profile.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
            </Text>
            <Box as={NavLink} to="/" cursor="pointer" hidden={!isDesktop}>
              <Image
                src={logo}
                alt="hoops-logo"
                fit="cover"
                aspectRatio={3 / 1}
                width="90px"
              />
            </Box>
          </HStack>

          {!isDesktop ? (
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content className="light">
                  <Drawer.CloseTrigger asChild>
                    <IconButton
                      variant="outline"
                      color="blue.700"
                      _hover={{ bg: "gray.200" }}
                      bg="gray.50"
                      mx={2}
                      my={2}
                      onClick={onOpen}
                    >
                      <FiX />
                    </IconButton>
                  </Drawer.CloseTrigger>
                  <Drawer.Header bg="white" borderBottomWidth="1px">
                    <Box as={NavLink} to="/" cursor="pointer">
                      <Image
                        src={logo}
                        alt="hoops-logo"
                        fit="cover"
                        aspectRatio={3 / 1}
                        width="90px"
                      />
                    </Box>
                  </Drawer.Header>
                  <Drawer.Body p={0}>
                    <Sidebar onNavigate={onClose} />
                  </Drawer.Body>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          ) : null}
        </Drawer.Root>

        <Box as="main" px={{ base: 2, md: 3 }} py={{ base: 2, md: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  )
}

export default Layout
