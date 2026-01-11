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
} from "@chakra-ui/react"
import { FiMenu, FiX } from "react-icons/fi"
import { Outlet } from "react-router"
import Sidebar from "./Sidebar"

function Layout() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isDesktop] = useMediaQuery("(min-width: 1024px)")

  return (
    <Flex bg="gray.50" minH="100vh">
      {isDesktop ? (
        <Box
          w={{ sm: "260px", xl: "320px" }}
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
          open={!isDesktop && isOpen}
          onOpenChange={(open) => (open ? onOpen() : onClose())}
          placement="start"
        >
          <HStack
            as="header"
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
              Admin Dashboard
            </Text>
          </HStack>

          {!isDesktop ? (
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content>
                  <Drawer.CloseTrigger asChild>
                    <IconButton
                      variant="subtle"
                      color="blue.700"
                      _hover={{ bg: "gray.400" }}
                      bg="gray.200"
                      mx={3}
                      onClick={onOpen}
                    >
                      <FiX />
                    </IconButton>
                  </Drawer.CloseTrigger>
                  <Drawer.Header bg="gray.200" borderBottomWidth="1px">
                    <Text fontWeight="bold" fontSize="lg">
                      Menu
                    </Text>
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
