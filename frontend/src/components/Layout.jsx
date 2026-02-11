import {
  Box,
  Drawer,
  Flex,
  HStack,
  IconButton,
  Portal,
  Text,
  useMediaQuery,
  Image,
} from "@chakra-ui/react"
import { FiMenu, FiX } from "react-icons/fi"
import { Outlet, NavLink } from "react-router"
import { useTranslation } from "react-i18next"
import { useSuspenseQuery } from "@tanstack/react-query"
import { sessionQuery } from "../queries/profile-queries"
import { useState } from "react"
import Sidebar from "./Sidebar"
import logo from "../assets/hoops-icon-trans.png"

function Layout() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: profile } = useSuspenseQuery(sessionQuery())
  const [isDesktop] = useMediaQuery("(min-width: 1024px)")
  const { t } = useTranslation("common")

  const title = profile.company
    ? t("profile-company-dashboard", { company: profile.company.name })
    : profile.role === "admin"
      ? t("admin-dashboard")
      : t("user-dashboard")

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
          onOpenChange={(e) => setIsOpen(e.open)}
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
                  aria-label={t("open-menu")}
                  variant="surface"
                  color="blue.700"
                  _hover={{ bg: "gray.100" }}
                  bg="white"
                  mx={3}
                >
                  <FiMenu />
                </IconButton>
              </Drawer.Trigger>
            ) : null}
            <Text fontWeight="bold" fontSize="lg" color="gray.800">
              {title}
            </Text>
            <Box as={NavLink} to="/" cursor="pointer" hidden={!isDesktop}>
              <Image
                src={logo}
                alt="hoops-logo"
                fit="cover"
                aspectRatio={4 / 1}
                width="120px"
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
                    >
                      <FiX />
                    </IconButton>
                  </Drawer.CloseTrigger>
                  <Drawer.Header bg="teal.50" borderBottomWidth="1px">
                    <Box as={NavLink} to="/" cursor="pointer">
                      <Image
                        src={logo}
                        alt="hoops-logo"
                        fit="cover"
                        aspectRatio={4 / 1}
                        width="120px"
                      />
                    </Box>
                  </Drawer.Header>
                  <Drawer.Body p={0}>
                    <Sidebar onNavigate={() => setIsOpen(false)} />
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
