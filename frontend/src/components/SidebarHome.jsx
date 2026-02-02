import { Box, VStack, For, Flex, Button } from "@chakra-ui/react"

import { useTranslation } from "react-i18next"
import { NavLink, Form } from "react-router"

function homeMenuItems(t) {
  return [
    {
      id: "my-dashboard",
      label: t("go-to-dashboard", { ns: "home-sidebar" }),
      path: "dashboard",
    },
    {
      id: "manage-profile",
      label: t("my-profile", { ns: "home-sidebar" }),
      path: "dashboard/profile/profile-settings",
    },
    {
      id: "invite-users",
      label: t("invite-users-to-dashboard", { ns: "home-sidebar" }),
      path: "dashboard/profile/invitations",
    },
    {
      id: "logout",
      label: t("logout", { ns: "common" }),
      actionPath: "/logout",
    },
  ]
}

function SidebarHome() {
  const { t, i18n } = useTranslation(["common", "home-sidebar"])
  const resolvedLang = i18n.resolvedLanguage
  return (
    <Box bg="teal.50" color="black" h="100%" px={4} py={5}>
      <VStack alignItems="stretch" spacing={1} p={3}>
        <For each={homeMenuItems(t)}>
          {(item) => {
            return item.path ? (
              <NavLink to={item.path} key={item.id}>
                {({ isActive }) => (
                  <Flex
                    to={item.path}
                    px={2}
                    py={2}
                    borderRadius="md"
                    fontSize="sm"
                    _hover={{
                      bg: "blackAlpha.200",
                    }}
                    {...(isActive // <-- conditional application
                      ? {
                          letterSpacing: "widest",
                          color: "green.400",
                          fontWeight: "bold",
                        }
                      : {
                          bg: "transparent",
                          fontWeight: "medium",
                        })}
                  >
                    {item.label}
                  </Flex>
                )}
              </NavLink>
            ) : (
              <Form
                method="post"
                action={`/${resolvedLang}${item.actionPath}`}
                key={item.id}
              >
                <Button
                  type="submit"
                  colorPalette="green"
                  variant="surface"
                  w="100%"
                >
                  {item.label}
                </Button>
              </Form>
            )
          }}
        </For>
      </VStack>
    </Box>
  )
}

export default SidebarHome
