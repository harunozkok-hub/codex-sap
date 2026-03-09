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
  Drawer,
  IconButton,
} from "@chakra-ui/react"
import { FiX } from "react-icons/fi"
import { useState } from "react"
import { NavLink, Outlet } from "react-router"
import { useTranslation } from "react-i18next"
import { useSuspenseQuery } from "@tanstack/react-query"
import logo from "../assets/hoops-icon-trans.png"
import SidebarHome from "./SidebarHome"
import { sessionQuery } from "../queries/profile-queries"
import LanguageSelector from "./generic/LanguageSelector"

const MAX_W = "1600px"
const HEADER_H = "70px"

function LayoutWeb() {
  const { t } = useTranslation("common")
  const { data: profile } = useSuspenseQuery(sessionQuery())
  const [isDesktop] = useMediaQuery("(min-width: 1024px)")
  const [isOpen, setIsOpen] = useState(false)

  let avatarShort, avatarFull
  if (profile) {
    avatarShort = profile.first_name + " " + profile.last_name
    if (avatarShort.length > 15) {
      avatarFull = profile.first_name
    }
  }
  let authButtons = (
    <>
      <Button
        as={NavLink}
        to="login"
        onClick={() => setIsOpen(false)}
        colorPalette="blackAlpha"
        color="green.500"
        variant="outline"
        //_hover={{ bg: "white" }}
      >
        {t("login")}
      </Button>
      <Button
        colorPalette="green"
        variant="surface"
        onClick={() => setIsOpen(false)}
        as={NavLink}
        to="register"
      >
        {t("signup")}
      </Button>
    </>
  )

  let drawerHeader = profile ? (
    <VStack align="flex-start" mx={5} pl={5}>
      <Text textStyle="md" color="whiteAlpha.800">
        {t("welcome")}
      </Text>
      <Text textStyle="sm" fontWeight="bold" color="white">
        {avatarShort}
      </Text>
    </VStack>
  ) : (
    <VStack align="flex-start" mx={5} pl={5} maxWidth="80%">
      <Text textStyle="sm" fontWeight="bold" color="white">
        HoOps Systems
      </Text>
      <Text textStyle="md" color="whiteAlpha.800">
        {t("one-platform-to-connect-contro")}
      </Text>
    </VStack>
  )

  let userBox = (
    <HStack>
      {isDesktop ? (
        <LanguageSelector dark size="lg" />
      ) : (
        <LanguageSelector dark />
      )}
      {isDesktop &&
        (profile ? (
          <VStack
            align="center"
            textAlign="center"
            mx={3}
            px={3}
            borderRightWidth="1px"
            borderLeftWidth="1px"
            borderColor="blackAlpha.400"
            w="10%"
            minWidth="8rem"
          >
            <Text textStyle="sm" pb={0}>
              {t("welcome")}
            </Text>
            <Text textStyle="xs" fontWeight="bold">
              {avatarFull}
            </Text>
          </VStack>
        ) : (
          <HStack
            gap={3}
            mx={2}
            pl={5}
            borderLeftWidth="1px"
            borderColor="blackAlpha.400"
          >
            {authButtons}
          </HStack>
        ))}
      <Drawer.Root
        open={!isDesktop && isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        placement="end"
        size="sm"
      >
        {isDesktop ? (
          profile ? (
            <Menu.Root
              size={100}
              variant="solid"
              positioning={{ placement: "bottom-end" }}
            >
              <Menu.Trigger focusRing="mixed">
                <Avatar.Root
                  variant="outline"
                  shape="rounded"
                  borderColor="blackAlpha.600"
                >
                  <Avatar.Fallback name={avatarShort} color="blackAlpha.600" />
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
          ) : null
        ) : (
          <Drawer.Trigger asChild>
            <Avatar.Root variant="outline" shape="rounded">
              {profile ? (
                <Avatar.Fallback name={avatarShort} color="blackAlpha.600" />
              ) : (
                <Avatar.Fallback color="blackAlpha.600" />
              )}
            </Avatar.Root>
          </Drawer.Trigger>
        )}
        {!isDesktop ? (
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.CloseTrigger asChild>
                  <IconButton
                    variant="subtle"
                    color="blue.700"
                    _hover={{ bg: "blue.300" }}
                    bg="blue.100"
                    mx={3}
                    my={3}
                  >
                    <FiX />
                  </IconButton>
                </Drawer.CloseTrigger>
                <Drawer.Header
                  px={0}
                  bg="green.950"
                  align="flex-start"
                  borderBottomWidth="1px"
                  borderColor="white"
                >
                  {drawerHeader}
                </Drawer.Header>
                <Drawer.Body p={0}>
                  {profile ? (
                    <SidebarHome onNavigate={() => setIsOpen(false)} />
                  ) : (
                    <Box bg="teal.50" color="black" h="100%" px={4} py={5}>
                      <VStack alignItems="stretch" spacing={1} p={3}>
                        {authButtons}
                      </VStack>
                    </Box>
                  )}
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        ) : null}
      </Drawer.Root>
    </HStack>
  )

  return (
    <Flex bg="gray.50" justifyContent="center" minH="100vh">
      {/* ✅ Shell must have width */}
      <Box w="100%" maxW={MAX_W} mx="auto" shadow="md" bg="white">
        <Box
          bg="teal.50"
          as="header"
          position="fixed"
          top={0}
          left="50%"
          transform="translateX(-50%)"
          px={{ base: 3, md: 5 }}
          maxW={MAX_W}
          w="100%"
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
                aspectRatio={4 / 1}
                width="150px"
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
