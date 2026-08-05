import {
  Box,
  HStack,
  Image,
  Flex,
  useMediaQuery,
  VStack,
  Text,
  Drawer,
  Portal,
  IconButton,
} from "@chakra-ui/react"
import { useCallback, useMemo, useState } from "react"
import { NavLink, Outlet, useParams } from "react-router"
import { LuHouse, LuMenu, LuX } from "react-icons/lu"
import { useTranslation } from "react-i18next"
import { useSuspenseQuery } from "@tanstack/react-query"
import {
  maxPageWidth,
  logoWidth,
  headerHeight,
  resPY,
  backgroundGradient,
  sidebarSecondaryButton,
  glassIconButtonSecondary,
} from "@/utils/css-chakra"
import { sessionQuery } from "@/queries/profile-queries"
import logo from "@/assets/Hoops-icon-final-v1.png"
import SecondaryButton from "@/components/form/SecondaryButton"
import PrimaryButton from "@/components/form/PrimaryButton"
import UnsavedChangesBlocker from "@/components/generic/UnsavedChangesBlocker"

function LayoutDashboardOnboarding() {
  const { t } = useTranslation(["dashboard", "common"])
  const { data: profile } = useSuspenseQuery(sessionQuery())
  const [isOpen, setIsOpen] = useState(false)
  const [blockerOwnerId, setBlockerOwnerId] = useState(null)
  const params = useParams()
  const [isDesktop] = useMediaQuery("(min-width: 1024px)")

  const setBlockerState = useCallback((ownerId, isDirty) => {
    setBlockerOwnerId((currentOwnerId) => {
      if (isDirty) return ownerId
      if (currentOwnerId === ownerId) return null
      return currentOwnerId
    })
  }, [])

  const blockerContext = useMemo(() => ({ setBlockerState }), [setBlockerState])

  let avatarShort
  if (profile) {
    avatarShort = profile.first_name + " " + profile.last_name
  }

  let actionButtons = (
    <>
      <SecondaryButton
        neutral
        to={`/${params.lang}/logout`}
        label={t("common:logout")}
        //onClick={() => setIsOpen(false)}
      />
      <PrimaryButton
        mt={isDesktop ? 0 : 2}
        to={`/${params.lang}`}
        label={t("onboarding-access-required-cta")}
        iconLeft={<LuHouse />}
        //onClick={() => setIsOpen(false)}
      />
    </>
  )

  let drawerHeader = (
    <VStack align="flex-start" mx={5} pl={5}>
      <Text textStyle="md" color="whiteAlpha.800">
        {t("common:welcome")}
      </Text>
      <Text textStyle="sm" fontWeight="bold" color="white">
        {avatarShort}
      </Text>
    </VStack>
  )

  let content = (
    <HStack gap={3} mx={2} pl={5}>
      {isDesktop && actionButtons}
      <Drawer.Root
        open={!isDesktop && isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        placement="end"
        size="sm"
      >
        {!isDesktop && (
          <>
            <Drawer.Trigger asChild>
              <IconButton
                aria-label={t("common:open-menu")}
                {...glassIconButtonSecondary}
              >
                <LuMenu />
              </IconButton>
            </Drawer.Trigger>
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content>
                  <Drawer.CloseTrigger asChild>
                    <IconButton
                      aria-label={t("common:close-menu")}
                      {...sidebarSecondaryButton}
                      mx={3}
                      my={3}
                    >
                      <LuX />
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
                    <Box
                      bg="whiteAlpha.900"
                      color="black"
                      h="100%"
                      px={4}
                      py={5}
                    >
                      <VStack alignItems="stretch" spacing={1} p={3}>
                        {actionButtons}
                      </VStack>
                    </Box>
                  </Drawer.Body>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </>
        )}
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
            <Box as={NavLink} to="/" cursor="pointer">
              <Image
                src={logo}
                alt="hoops-logo"
                fit="cover"
                aspectRatio={3 / 2}
                width={logoWidth}
              />
            </Box>
            {content}
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
            {blockerOwnerId ? (
              <UnsavedChangesBlocker key={blockerOwnerId} when />
            ) : null}
            <Outlet context={blockerContext} />
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export default LayoutDashboardOnboarding
