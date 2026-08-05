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
import { sessionQuery } from "@/queries/profile-queries"
import { useCallback, useMemo, useState } from "react"
import Sidebar from "@/pages/dashboard-pages/Sidebar"
import logo from "@/assets/Hoops-icon-final-v1.png"
import {
  dashboardCanvasBackground,
  dashboardHeaderShellStyles,
  glassIconButtonSecondary,
  headerHeight,
  logoWidth,
} from "@/utils/css-chakra"
import UnsavedChangesBlocker from "@/components/generic/UnsavedChangesBlocker"

function Layout() {
  const [isOpen, setIsOpen] = useState(false)
  const [blockerOwnerId, setBlockerOwnerId] = useState(null)
  const { data: profile } = useSuspenseQuery(sessionQuery())
  const [isDesktop] = useMediaQuery("(min-width: 1024px)")
  const [isMediumSize] = useMediaQuery("(min-width: 768px)")
  const { t } = useTranslation("common")

  const setBlockerState = useCallback((ownerId, isDirty) => {
    setBlockerOwnerId((currentOwnerId) => {
      if (isDirty) return ownerId
      if (currentOwnerId === ownerId) return null
      return currentOwnerId
    })
  }, [])

  const blockerContext = useMemo(() => ({ setBlockerState }), [setBlockerState])

  const title = profile
    ? isMediumSize
      ? t("profile-company-dashboard", {
          company: profile.company.display_name ?? profile.company.name,
        })
      : (profile.company.display_name ?? profile.company.name)
    : null

  return (
    <Flex {...dashboardCanvasBackground} minH="100vh">
      {isDesktop ? (
        <Box
          w={{ sm: "320px", xl: "400px" }}
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
            {...dashboardHeaderShellStyles}
            align="center"
            justify={isMediumSize ? "space-between" : "flex-start"}
            spacing={3}
            minH={headerHeight}
            px={4}
            py={3}
            position="sticky"
            top={0}
            zIndex={2}
          >
            {!isDesktop ? (
              <Drawer.Trigger asChild>
                <IconButton
                  aria-label={t("open-menu")}
                  {...glassIconButtonSecondary}
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
                aspectRatio={3 / 2}
                width="80px"
              />
            </Box>
          </HStack>

          {!isDesktop ? (
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content
                  className="light"
                  bg="rgba(246,248,255,0.86)"
                  backdropFilter="blur(18px)"
                  borderRightWidth="1px"
                  borderColor="rgba(202, 213, 240, 0.72)"
                >
                  <Drawer.CloseTrigger asChild>
                    <IconButton
                      aria-label={t("close-menu")}
                      {...glassIconButtonSecondary}
                      mx={2}
                      my={2}
                    >
                      <FiX />
                    </IconButton>
                  </Drawer.CloseTrigger>
                  <Drawer.Header
                    bg="rgba(255,255,255,0.56)"
                    borderBottomWidth="1px"
                    borderColor="rgba(202, 213, 240, 0.62)"
                  >
                    <Box as={NavLink} to="/" cursor="pointer">
                      <Image
                        src={logo}
                        alt="hoops-logo"
                        fit="cover"
                        aspectRatio={3 / 2}
                        width={logoWidth}
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

        <Box as="main" w="full" px={{ base: 2, md: 3 }} py={{ base: 2, md: 3 }}>
          {/* Single route-level blocker owner. In StrictMode, React may remount/effect twice in dev,
              so transient blocker warnings can still appear even when runtime navigation works correctly. */}
          {blockerOwnerId ? (
            <UnsavedChangesBlocker key={blockerOwnerId} when />
          ) : null}
          <Outlet context={blockerContext} />
        </Box>
      </Box>
    </Flex>
  )
}

export default Layout
