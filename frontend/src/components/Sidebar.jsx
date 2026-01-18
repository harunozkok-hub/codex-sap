import { useMemo, useState } from "react"
import {
  Box,
  Flex,
  Icon,
  Stack,
  Text,
  VStack,
  Avatar,
  For,
} from "@chakra-ui/react"
import { NavLink, useRouteLoaderData } from "react-router"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import { menuItems } from "./menuItems"

function Sidebar({ onNavigate }) {
  const { profile } = useRouteLoaderData("dashboard")

  const avatarName = profile.first_name + " " + profile.last_name
  const userRole = profile.role.charAt(0).toUpperCase() + profile.role.slice(1)
  const initialOpenState = useMemo(
    () =>
      menuItems.reduce((acc, item) => {
        acc[item.id] = false
        return acc
      }, {}),
    []
  )
  const [openSections, setOpenSections] = useState(initialOpenState)

  const handleToggle = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate()
    }
  }

  return (
    <Box bg="blue.800" color="white" h="100%" px={4} py={5}>
      <Stack spacing={1} mb={6}>
        <Flex align="center" gap={3}>
          <Avatar.Root variant="outline" shape="rounded">
            <Avatar.Fallback name={avatarName} color="white" />
          </Avatar.Root>
          <Text fontWeight="bold" fontSize="lg" px={4}>
            {userRole}
          </Text>
        </Flex>
      </Stack>

      <VStack align="stretch" spacing={2}>
        <For each={menuItems}>
          {(item) => {
            return (
              <Box key={item.id}>
                {item.children ? (
                  <Flex
                    align="center"
                    justify="space-between"
                    px={3}
                    py={1}
                    borderRadius="md"
                    _hover={{ bg: "whiteAlpha.200" }}
                    onClick={() => handleToggle(item.id)}
                    cursor="pointer"
                  >
                    <Flex align="center" gap={3}>
                      <Icon as={item.icon} boxSize={5} />
                      <Text fontSize="md" fontWeight="medium">
                        {item.label}
                      </Text>
                    </Flex>
                    <Icon
                      as={openSections[item.id] ? FiChevronUp : FiChevronDown}
                      boxSize={4}
                    />
                  </Flex>
                ) : (
                  <NavLink to={item.path} end>
                    {({ isActive }) => (
                      <Flex
                        key={item.id}
                        align="center"
                        justify="flex-start"
                        onClick={handleNavigate}
                        gap={3}
                        px={3}
                        py={2}
                        borderRadius="md"
                        fontSize="md"
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
                        <Icon as={item.icon} boxSize={5} />
                        <Text>{item.label}</Text>
                      </Flex>
                    )}
                  </NavLink>
                )}
                {openSections[item.id] ? (
                  <VStack align="stretch" spacing={1} shadow="xs" py={2} mt={1}>
                    <For each={item.children}>
                      {(child, index) => {
                        return (
                          <NavLink to={child.path} key={index}>
                            {({ isActive }) => (
                              <Flex
                                to={child.path}
                                onClick={handleNavigate}
                                pl={5}
                                py={2}
                                borderRadius="md"
                                fontSize="xs"
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
                                {child.label}
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
    </Box>
  )
}

export default Sidebar
