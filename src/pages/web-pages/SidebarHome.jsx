import { Box, VStack, For, Flex } from "@chakra-ui/react"

import { useTranslation } from "react-i18next"
import { NavLink, Form, useParams } from "react-router"

import PrimaryButton from "@/components/form/PrimaryButton"
import SecondaryButton from "@/components/form/SecondaryButton"
import { resPX, resPY } from "@/utils/css-chakra"

function homeMenuItems(t) {
  return [
    {
      id: "my-dashboard",
      label: t("home-sidebar:go-to-dashboard"),
      path: "dashboard",
    },
    {
      id: "manage-profile",
      label: t("home-sidebar:my-profile"),
      path: "dashboard/profile/profile-settings",
    },
    {
      id: "invite-users",
      label: t("home-sidebar:invite-users-to-dashboard"),
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
  const { t } = useTranslation(["common", "home-sidebar"])
  const params = useParams()
  const resolvedLang = params.lang
  return (
    <Box bg="whiteAlpha.900" color="black" h="100%" px={6} py={3}>
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
                      bg: "purple.50",
                    }}
                    {...(isActive // <-- conditional application
                      ? {
                          letterSpacing: "widest",
                          color: "purple.400",
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
                <SecondaryButton
                  neutral
                  type="submit"
                  w="100%"
                  label={item.label}
                />
              </Form>
            )
          }}
        </For>
      </VStack>
    </Box>
  )
}

export default SidebarHome
