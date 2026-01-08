import { useMemo, useState } from "react"
import { Box, Flex, Icon, Stack, Text, VStack, Avatar } from "@chakra-ui/react"
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
    label: "Dashboard",
    icon: FiHome,
    path: "",
  },

  // ✅ CATALOG (what you sell / sync to Wix)
  {
    id: "catalog",
    label: "Catalog",
    icon: FiBox,
    children: [
      { label: "Product List", path: "catalog/products" },
      { label: "Categories", path: "catalog/categories" },
      { label: "Bundles & Kits", path: "catalog/bundles" },
    ],
  },

  // ✅ INVENTORY (what you stock/manage)
  {
    id: "inventory",
    label: "Inventory",
    icon: FiTruck,
    children: [
      { label: "Warehouses", path: "inventory/warehouses" },
      { label: "Stock Levels", path: "inventory/stock" },
      { label: "Packaging Materials", path: "inventory/packaging" },
      { label: "Samples & Gifts", path: "inventory/samples" },
      { label: "Raw Materials", path: "inventory/raw-materials" },
    ],
  },

  // ✅ ORDERS
  {
    id: "orders",
    label: "Orders",
    icon: FiShoppingCart,
    children: [{ label: "Manage Orders", path: "orders" }],
  },

  // ✅ PRODUCTION
  {
    id: "production",
    label: "Production",
    icon: FiTruck,
    children: [
      { label: "Production Orders", path: "production/production-orders" },
      { label: "Timeline", path: "production/production-timeline" },
    ],
  },

  // ✅ FINANCE
  {
    id: "finance",
    label: "Finance",
    icon: FiDollarSign,
    children: [{ label: "Finance Summary", path: "finance" }],
  },

  // ✅ SALES
  {
    id: "sales",
    label: "Sales Stats",
    icon: FiBarChart2,
    children: [{ label: "Sales Performance", path: "sales-stats" }],
  },

  // ✅ SETTINGS
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
                      key={item.label}
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
                            color: "red.emphasized",
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
                  boxShadow="lg"
                  borderLeftWidth={5}
                  py={2}
                  mt={1}
                >
                  {item.children.map((child) => {
                    return (
                      <NavLink to={child.path}>
                        {({ isActive }) => (
                          <Flex
                            key={child.label}
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
                                  color: "red.emphasized",
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
