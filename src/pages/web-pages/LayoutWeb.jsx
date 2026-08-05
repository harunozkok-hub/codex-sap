import {
  Box,
  Flex,
  HStack,
  Avatar,
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
import logo from "@/assets/Hoops-icon-final-v1.png"
import SidebarHome from "@/pages/web-pages/SidebarHome"
import { sessionQuery } from "@/queries/profile-queries"
import LanguageSelector from "@/components/generic/LanguageSelector"
import {
  backgroundGradient,
  resPY,
  sidebarSecondaryButton,
} from "@/utils/css-chakra"
import {
  logoWidth,
  headerHeight,
  maxPageWidth,
  glassIconButtonSecondary,
} from "@/utils/css-chakra"
import PrimaryButton from "@/components/form/PrimaryButton"
import SecondaryButton from "@/components/form/SecondaryButton"
import { useCountry } from "@/utils/hooks/useGeolocationCountry"

function LayoutWeb() {
  const { t } = useTranslation("common")
  const { data: profile } = useSuspenseQuery(sessionQuery())
  const [isDesktop] = useMediaQuery("(min-width: 1024px)")
  const [isOpen, setIsOpen] = useState(false)
  const { country, loading, refresh } = useCountry()

  let avatarShort, avatarFull
  if (profile) {
    avatarFull = profile.first_name + " " + profile.last_name
    avatarShort = profile.first_name + " " + profile.last_name
    if (avatarFull.length > 15) {
      avatarFull = profile.first_name
    }
  }
  let authButtons = (
    <>
      <SecondaryButton
        to="login"
        onClick={() => setIsOpen(false)}
        label={t("login")}
      />
      <PrimaryButton
        mt={isDesktop ? 0 : 2}
        to="register"
        onClick={() => setIsOpen(false)}
        label={t("signup")}
      />
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
      <Text textStyle="md" fontWeight="bold" color="white">
        HoOps Systems
      </Text>
      <Text textStyle="md" color="whiteAlpha.800">
        {t("one-platform-to-connect-contro")}
      </Text>
    </VStack>
  )

  let userBox = (
    <HStack>
      <LanguageSelector />
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
                  aria-label={t("open-menu")}
                  {...glassIconButtonSecondary}
                >
                  <Avatar.Fallback name={avatarShort} />
                </Avatar.Root>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content roundedBottomLeft="3xl" my="2" mx={-5}>
                    <SidebarHome />
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          ) : null
        ) : (
          <Drawer.Trigger asChild>
            <Avatar.Root
              aria-label={t("open-menu")}
              {...glassIconButtonSecondary}
            >
              {profile ? (
                <Avatar.Fallback name={avatarShort} />
              ) : (
                <Avatar.Fallback />
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
                    aria-label={t("close-menu")}
                    {...sidebarSecondaryButton}
                    mx={3}
                    my={3}
                  >
                    <FiX />
                  </IconButton>
                </Drawer.CloseTrigger>
                <Drawer.Header
                  px={0}
                  bg="purple.950"
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
                    <Box
                      bg="whiteAlpha.900"
                      color="black"
                      h="100%"
                      px={4}
                      py={5}
                    >
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
    <Flex bg="gray.100" justifyContent="center" minH="100vh">
      {/* ✅ Shell must have width */}
      <Box w="100%" maxW={maxPageWidth} mx="auto" shadow="md">
        <Box
          bg="whiteAlpha.900"
          as="header"
          position="fixed"
          top={0}
          left="50%"
          transform="translateX(-50%)"
          px={{ base: 3, md: 5 }}
          maxW={maxPageWidth}
          w="100%"
          boxShadow="sm"
          zIndex={1000}
          h={headerHeight}
        >
          <HStack alignItems="center" justify="space-between" h="100%">
            <Box as={NavLink} to="" cursor="pointer">
              <Image
                src={logo}
                alt="hoops-logo"
                fit="cover"
                aspectRatio={3 / 2}
                width={logoWidth}
              />
            </Box>
            {userBox}
          </HStack>
        </Box>

        <Box
          as="main"
          pt={headerHeight}
          position="relative"
          overflow="hidden"
          css={backgroundGradient}
        >
          {/* ✅ Make main content stretch inside shell */}
          <Box w="100%" py={resPY}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export default LayoutWeb
