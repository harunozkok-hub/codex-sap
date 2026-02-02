import { Suspense, useMemo, useState } from "react"
import {
  Box,
  Flex,
  Icon,
  Stack,
  Text,
  VStack,
  ScrollArea,
  Button,
  For,
} from "@chakra-ui/react"
import { sidebarMask } from "../utils/css-chakra"
import { NavLink, useRouteLoaderData, Form } from "react-router"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import { menuItems } from "./menuItems"
import { useTranslation } from "react-i18next"
import FullpageSpinner from "./FullpageSpinner"

function Sidebar({ onNavigate }) {
  const { profile } = useRouteLoaderData("dashboard")
  const { t, i18n } = useTranslation("dashboard-sidebar")

  const resolvedLang = i18n.resolvedLanguage
  const avatarName = profile.first_name + " " + profile.last_name
  //const userRole = profile.role.charAt(0).toUpperCase() + profile.role.slice(1)
  const initialOpenState = useMemo(
    () =>
      menuItems(t).reduce((acc, item) => {
        acc[item.id] = false
        return acc
      }, {}),
    [t],
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
    <Suspense fallback={<FullpageSpinner />}>
      <Box
        bg="green.950"
        color="white"
        h="100%"
        pl={5}
        pr={2}
        py={5}
        flexDirection="column"
        display="flex"
        justifyContent="space-evenly"
      >
        <Stack maxH="20%">
          <Stack align="flex-start" mb={3} mx={3}>
            <Text fontSize="sm">{t("welcome")}</Text>
            <Text fontWeight="bold" fontSize="md">
              {avatarName}
            </Text>
          </Stack>
          <Stack
            px={3}
            pb={4}
            borderBottomWidth={1}
            borderColor="whiteAlpha.300"
          >
            <Form method="post" action={`/${resolvedLang}/logout`}>
              <Button
                type="submit"
                size="xs"
                colorPalette="green"
                color="green.500"
                variant="outline"
                w="100%"
              >
                {t("logout")}
              </Button>
            </Form>
          </Stack>
        </Stack>

        <ScrollArea.Root variant="hover" h="75%" spacing={2} mt={5}>
          <ScrollArea.Viewport css={sidebarMask}>
            <ScrollArea.Content paddingEnd="3" py="4" textStyle="sm">
              <VStack alignItems="flex-start">
                <For each={menuItems(t)}>
                  {(item) => {
                    return (
                      <Box key={item.id} width="100%">
                        {item.children ? (
                          <Flex
                            align="center"
                            justify="space-between"
                            px={3}
                            py={2}
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
                              as={
                                openSections[item.id]
                                  ? FiChevronUp
                                  : FiChevronDown
                              }
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
                                      color: "green.400",
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
                          <VStack
                            align="stretch"
                            spacing={1}
                            borderLeftWidth="1px"
                            borderColor="whiteAlpha.300"
                            py={2}
                            mt={1}
                          >
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
                                        fontSize="sm"
                                        _hover={{
                                          bg: "whiteAlpha.200",
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
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar bg="whiteAlpha.300">
            <ScrollArea.Thumb bg="whiteAlpha.600" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Box>
    </Suspense>
  )
}

export default Sidebar
