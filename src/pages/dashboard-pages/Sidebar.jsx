import { Suspense, useMemo, useState, useEffect } from "react"
import { useSuspenseQuery } from "@tanstack/react-query"
import {
  Box,
  Flex,
  Icon,
  Stack,
  Text,
  VStack,
  ScrollArea,
  For,
} from "@chakra-ui/react"
import { sidebarMask } from "@/utils/css-chakra"
import { NavLink, Form, useParams, useLocation } from "react-router"
import { FiChevronDown } from "react-icons/fi"
import { menuItems } from "@/pages/dashboard-pages/menuItems"
import { useTranslation } from "react-i18next"
import SecondaryButton from "@/components/form/SecondaryButton"
import FullpageSpinner from "@/components/generic/FullpageSpinner"
import { sessionQuery } from "@/queries/profile-queries"
import { filterMenuByPermissions } from "@/utils/menu-permissions"
import {
  sidebarShellStyles,
  sidebarUserSectionStyles,
  sidebarUserInfoStyles,
  sidebarLogoutWrapStyles,
  sidebarScrollRootStyles,
  sidebarScrollContentStyles,
  sidebarMenuStackStyles,
  sidebarSectionWrapStyles,
  sidebarParentItemStyles,
  sidebarParentLabelWrapStyles,
  sidebarParentTextStyles,
  sidebarItemHoverStyles,
  sidebarItemOpenStyles,
  sidebarItemActiveStyles,
  sidebarLinkItemStyles,
  sidebarLinkIdleStyles,
  sidebarChildGroupStyles,
  sidebarChildItemBaseStyles,
  sidebarChildItemIdleStyles,
  sidebarChildItemActiveStyles,
  sidebarChevronStyles,
  sidebarScrollbarStyles,
  sidebarScrollbarThumbStyles,
} from "@/utils/css-sidebar"

function Sidebar({ onNavigate }) {
  const { data: profile } = useSuspenseQuery(sessionQuery())
  const { t } = useTranslation("dashboard-sidebar")
  const params = useParams()
  const location = useLocation()

  const resolvedLang = params.lang
  const avatarName = profile
    ? profile.first_name + " " + profile.last_name
    : null

  const rawMenu = useMemo(() => menuItems(t), [t])

  const menu = useMemo(
    () => filterMenuByPermissions(rawMenu, profile),
    [rawMenu, profile],
  )

  const derivedOpenState = useMemo(() => {
    return menu.reduce((acc, item) => {
      if (!item.children) {
        acc[item.id] = false
        return acc
      }

      const isChildActive = item.children.some((child) => {
        if (!child.path) return false

        const normalizedChildPath = child.path.startsWith("/")
          ? child.path
          : `/${resolvedLang}/dashboard/${child.path}`

        return location.pathname.startsWith(normalizedChildPath)
      })

      acc[item.id] = isChildActive
      return acc
    }, {})
  }, [menu, location.pathname, resolvedLang])

  const [openSections, setOpenSections] = useState({})

  useEffect(() => {
    setOpenSections((prev) => {
      const next = { ...derivedOpenState, ...prev }

      Object.entries(derivedOpenState).forEach(([key, value]) => {
        if (value) {
          next[key] = true
        }
      })

      return next
    })
  }, [derivedOpenState])

  const handleToggle = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate()
    }
  }

  return (
    <Suspense fallback={<FullpageSpinner />}>
      <Box {...sidebarShellStyles}>
        <Stack {...sidebarUserSectionStyles}>
          <Stack {...sidebarUserInfoStyles}>
            <Text fontSize="sm">{t("welcome")}</Text>
            <Text fontWeight="bold" fontSize="md">
              {avatarName}
            </Text>
          </Stack>

          <Stack {...sidebarLogoutWrapStyles}>
            <Form method="post" action={`/${resolvedLang}/logout`}>
              <SecondaryButton
                type="submit"
                atSidebar
                w="100%"
                color="red.300"
                _hover={{
                  bg: "rgba(255,120,120,0.12)",
                  color: "red.200",
                }}
                label={t("logout")}
              />
            </Form>
          </Stack>
        </Stack>

        <ScrollArea.Root variant="hover" {...sidebarScrollRootStyles}>
          <ScrollArea.Viewport css={sidebarMask}>
            <ScrollArea.Content {...sidebarScrollContentStyles}>
              <VStack {...sidebarMenuStackStyles}>
                <For each={menu}>
                  {(item) => {
                    return (
                      <Box key={item.id} {...sidebarSectionWrapStyles}>
                        {item.children ? (
                          <Flex
                            {...sidebarParentItemStyles}
                            _hover={sidebarItemHoverStyles}
                            {...(openSections[item.id]
                              ? sidebarItemOpenStyles
                              : {})}
                            onClick={() => handleToggle(item.id)}
                          >
                            <Flex {...sidebarParentLabelWrapStyles}>
                              <Icon as={item.icon} boxSize={5} />
                              <Text {...sidebarParentTextStyles}>
                                {item.label}
                              </Text>
                            </Flex>

                            <Icon
                              as={FiChevronDown}
                              {...sidebarChevronStyles}
                              transform={
                                openSections[item.id]
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)"
                              }
                            />
                          </Flex>
                        ) : (
                          <NavLink to={item.path} end>
                            {({ isActive }) => (
                              <Flex
                                {...sidebarLinkItemStyles}
                                onClick={handleNavigate}
                                _hover={sidebarItemHoverStyles}
                                {...(isActive
                                  ? sidebarItemActiveStyles
                                  : sidebarLinkIdleStyles)}
                              >
                                <Icon as={item.icon} boxSize={5} />
                                <Text>{item.label}</Text>
                              </Flex>
                            )}
                          </NavLink>
                        )}
                        {openSections[item.id] ? (
                          <VStack {...sidebarChildGroupStyles}>
                            <For each={item.children}>
                              {(child, index) => {
                                return (
                                  <NavLink to={child.path} key={index}>
                                    {({ isActive }) => (
                                      <Flex
                                        onClick={handleNavigate}
                                        {...sidebarChildItemBaseStyles}
                                        _hover={sidebarItemHoverStyles}
                                        {...(isActive
                                          ? sidebarChildItemActiveStyles
                                          : sidebarChildItemIdleStyles)}
                                      >
                                        {child.icon && (
                                          <Icon as={child.icon} boxSize={4} />
                                        )}
                                        <Text>{child.label}</Text>
                                      </Flex>
                                    )}
                                  </NavLink>
                                )
                              }}
                            </For>
                          </VStack>
                        ) : null}
                      </Box>
                    )
                  }}
                </For>
              </VStack>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar {...sidebarScrollbarStyles}>
            <ScrollArea.Thumb {...sidebarScrollbarThumbStyles} />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Box>
    </Suspense>
  )
}

export default Sidebar
