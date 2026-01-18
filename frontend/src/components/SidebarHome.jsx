import { Box, VStack, For, Flex, Button } from "@chakra-ui/react"
import { NavLink, Form } from "react-router"

const homeMenuItems = [
  {
    id: "my-dashboard",
    label: "Go to Dashboard",
    path: "dashboard",
  },
  {
    id: "manage-profile",
    label: "My profile",
    path: "dashboard/profile/profile-settings",
  },
  {
    id: "invite-users",
    label: "Invite Users to Dashboard",
    path: "dashboard/profile/invitations",
  },
  {
    id: "logout",
    label: "Logout",
    actionPath: "/logout",
  },
]

function SidebarHome() {
  return (
    <Box bg="blue.600" color="white" h="100%" px={4} py={5}>
      <VStack alignItems="stretch" spacing={1} p={3}>
        <For each={homeMenuItems}>
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
                      bg: "whiteAlpha.200",
                    }}
                    {...(isActive // <-- conditional application
                      ? {
                          letterSpacing: "widest",
                          color: "red.300",
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
              <Form method="post" action={item.actionPath} key={item.id}>
                <Button
                  type="submit"
                  colorPalette="blue"
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
