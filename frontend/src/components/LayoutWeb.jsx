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
  useDisclosure,
} from "@chakra-ui/react"
import { FiX } from "react-icons/fi"
import { NavLink, Outlet, useRouteLoaderData } from "react-router"
import logo from "../assets/hoops-icon-trans.png"
import SidebarHome from "./SidebarHome"
import { useTranslation } from "react-i18next"
import LanguageSelector from "./LanguageSelector"

const MAX_W = "1600px"
const HEADER_H = "70px"

function LayoutWeb() {
  const { t } = useTranslation("common")
  const { profile } = useRouteLoaderData("home-page")
  const [isDesktop] = useMediaQuery("(min-width: 1024px)")
  const { isOpen, onOpen, onClose } = useDisclosure()

  let avatarName
  if (profile) {
    avatarName = profile.first_name + " " + profile.last_name
  }

  let userBox = profile ? (
    <HStack>
      {isDesktop ? (
        <LanguageSelector dark size="lg" />
      ) : (
        <LanguageSelector dark />
      )}
      {isDesktop && (
        <VStack
          align="center"
          mx={5}
          borderRightWidth="1px"
          borderLeftWidth="1px"
          borderColor="blackAlpha.400"
          w="10%"
          minWidth="8rem"
        >
          <Text textStyle="sm">{t("welcome")}</Text>
          <Text textStyle="xs" fontWeight="bold">
            {avatarName}
          </Text>
        </VStack>
      )}
      <Drawer.Root
        open={!isDesktop && isOpen}
        onOpenChange={(open) => (open ? onOpen() : onClose())}
        placement="end"
        size="sm"
      >
        {isDesktop ? (
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
                <Avatar.Fallback name={avatarName} color="blackAlpha.600" />
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
          <Drawer.Trigger asChild>
            <Avatar.Root variant="outline" shape="rounded">
              <Avatar.Fallback name={avatarName} color="blackAlpha.600" />
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
                    onClick={onOpen}
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
                  <VStack align="flex-start" mx={5} pl={5}>
                    <Text textStyle="md" color="whiteAlpha.800">
                      {t("welcome")}
                    </Text>
                    <Text textStyle="sm" fontWeight="bold" color="white">
                      {avatarName}
                    </Text>
                  </VStack>
                </Drawer.Header>
                <Drawer.Body p={0}>
                  <SidebarHome onNavigate={onClose} />
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        ) : null}
      </Drawer.Root>
    </HStack>
  ) : (
    <HStack
      gap={3}
      mx={5}
      pl={5}
      borderLeftWidth="1px"
      borderColor="whiteAlpha.300"
    >
      {isDesktop ? (
        <LanguageSelector dark size="lg" />
      ) : (
        <LanguageSelector dark />
      )}
      <Button
        as={NavLink}
        to="login"
        colorPalette="blackAlpha"
        color="green.500"
        variant="outline"
      >
        {t("login")}
      </Button>
      <Button colorPalette="green" variant="surface" as={NavLink} to="register">
        {t("signup")}
      </Button>
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
