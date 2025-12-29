import { useMemo, useState } from 'react'
import { Box, Flex, Icon, Link, Stack, Text, VStack } from '@chakra-ui/react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  FiBarChart2,
  FiBox,
  FiChevronDown,
  FiChevronUp,
  FiDollarSign,
  FiHome,
  FiShoppingCart,
  FiTruck,
} from 'react-icons/fi'

const menuItems = [
  {
    id: 'home',
    label: 'Home',
    icon: FiHome,
    children: [{ label: 'Dashboard', path: '/' }],
  },
  {
    id: 'products',
    label: 'Products',
    icon: FiBox,
    children: [{ label: 'View Products', path: '/products' }],
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: FiShoppingCart,
    children: [{ label: 'Manage Orders', path: '/orders' }],
  },
  {
    id: 'logistics',
    label: 'Logistics',
    icon: FiTruck,
    children: [{ label: 'Logistics Overview', path: '/logistics' }],
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: FiDollarSign,
    children: [{ label: 'Finance Summary', path: '/finance' }],
  },
  {
    id: 'sales',
    label: 'Sales Stats',
    icon: FiBarChart2,
    children: [{ label: 'Sales Performance', path: '/sales-stats' }],
  },
]

function Sidebar({ onNavigate }) {
  const location = useLocation()
  const initialOpenState = useMemo(
    () =>
      menuItems.reduce((acc, item) => {
        acc[item.id] = true
        return acc
      }, {}),
    [],
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
        <Text fontWeight="bold" fontSize="lg">
          Admin
        </Text>
        <Text fontSize="sm" color="blue.100">
          Operations
        </Text>
      </Stack>

      <VStack align="stretch" spacing={2}>
        {menuItems.map((item) => (
          <Box key={item.id}>
            <Flex
              align="center"
              justify="space-between"
              px={3}
              py={2}
              borderRadius="md"
              _hover={{ bg: 'whiteAlpha.200' }}
              onClick={() => handleToggle(item.id)}
              cursor="pointer"
            >
              <Flex align="center" gap={3}>
                <Icon as={item.icon} boxSize={5} />
                <Text fontWeight="medium">{item.label}</Text>
              </Flex>
              <Icon as={openSections[item.id] ? FiChevronUp : FiChevronDown} boxSize={4} />
            </Flex>
            {openSections[item.id] ? (
              <VStack align="stretch" spacing={1} mt={1}>
                {item.children.map((child) => {
                  const selected = location.pathname === child.path
                  return (
                    <Link
                      as={NavLink}
                      key={child.label}
                      to={child.path}
                      onClick={handleNavigate}
                      px={11}
                      py={2}
                      borderRadius="md"
                      fontSize="sm"
                      fontWeight={selected ? 'bold' : 'normal'}
                      bg={selected ? 'whiteAlpha.200' : 'transparent'}
                      _hover={{ textDecoration: 'none', bg: 'whiteAlpha.200' }}
                    >
                      {child.label}
                    </Link>
                  )
                })}
              </VStack>
            ) : null}
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

export default Sidebar
