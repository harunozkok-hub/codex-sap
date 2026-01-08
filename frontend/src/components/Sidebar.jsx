import { useMemo, useState } from "react"
import {
  Box,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  VStack,
  Avatar,
} from "@chakra-ui/react"
import { NavLink } from "react-router"
import {
  FiBarChart2,
  FiBox,
  FiChevronDown,
  FiChevronUp,
  FiDollarSign,
  FiHome,
  FiShoppingCart,
  FiTruck,
  FiSettings,
} from "react-icons/fi"

const menuItems = [
  {
    id: "home",
    label: "Home",
    icon: FiHome,
    path: "",
  },
  {
    id: "products",
    label: "Products",
    icon: FiBox,
    children: [{ label: "View Products", path: "products" }],
  },
  {
    id: "orders",
    label: "Orders",
    icon: FiShoppingCart,
    children: [{ label: "Manage Orders", path: "orders" }],
  },
  {
    id: "logistics",
    label: "Logistics",
    icon: FiTruck,
    children: [{ label: "Logistics Overview", path: "logistics" }],
  },
  {
    id: "finance",
    label: "Finance",
    icon: FiDollarSign,
    children: [{ label: "Finance Summary", path: "finance" }],
  },
  {
    id: "sales",
    label: "Sales Stats",
    icon: FiBarChart2,
    children: [{ label: "Sales Performance", path: "sales-stats" }],
  },
  {
    id: "settings",
    label: "Settings",
    icon: FiSettings,
    children: [{ label: "UI Settings", path: "ui-settings" }],
  },
]

function Sidebar({ onNavigate }) {
  //const location = useLocation()
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
            <Avatar.Fallback name="Segun Adebayo" color="white" />
          </Avatar.Root>
          <Text fontWeight="bold" fontSize="lg" px={4}>
            Admin
          </Text>
        </Flex>
      </Stack>

      <VStack align="stretch" spacing={2}>
        {menuItems.map((item) => {
          return (
            <Box key={item.id}>
              {item.children ? (
                <Flex
                  align="center"
                  justify="space-between"
                  px={3}
                  py={2}
                  borderRadius="md"
                  //bg={sectionActive ? "whiteAlpha.200" : "transparent"}
                  _hover={{ bg: "whiteAlpha.200" }}
                  onClick={() => handleToggle(item.id)}
                  cursor="pointer"
                >
                  <Flex align="center" gap={3}>
                    <Icon as={item.icon} boxSize={5} />
                    <Text fontWeight="medium">{item.label}</Text>
                  </Flex>
                  <Icon
                    as={openSections[item.id] ? FiChevronUp : FiChevronDown}
                    boxSize={4}
                  />
                </Flex>
              ) : (
                <Flex
                  align="center"
                  justify="flex-start"
                  as={NavLink}
                  key={item.label}
                  to={item.path}
                  end
                  onClick={handleNavigate}
                  gap={3}
                  px={3}
                  py={2}
                  borderRadius="md"
                  color="white"
                  fontSize="sm"
                  style={({ isActive }) => ({
                    background: isActive ? "whiteAlpha.300" : "transparent",
                  })}
                  _hover={{ textDecoration: "none", bg: "whiteAlpha.200" }}
                >
                  <Icon as={item.icon} boxSize={5} />
                  <Text>{item.label}</Text>
                </Flex>
              )}
              {openSections[item.id] ? (
                <VStack align="stretch" spacing={1} mt={1}>
                  {item.children.map((child) => {
                    return (
                      <Link
                        as={NavLink}
                        key={child.label}
                        to={child.path}
                        onClick={handleNavigate}
                        px={11}
                        py={2}
                        borderRadius="md"
                        color="white"
                        fontSize="sm"
                        style={({ isActive }) => ({
                          fontWeight: isActive ? "bold" : "normal",
                          background: isActive
                            ? "rgba(255,255,255,0.18)"
                            : "transparent",
                          _hover: {
                            textDecoration: "none",
                            background: "whiteAlpha.200",
                          },
                        })}
                      >
                        {child.label}
                      </Link>
                    )
                  })}
                </VStack>
              ) : null}
            </Box>
          )
        })}
      </VStack>
    </Box>
  )
}

export default Sidebar
