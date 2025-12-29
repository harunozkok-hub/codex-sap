import { useMemo } from 'react'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const drawerWidth = 260

function Layout() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isDesktop] = useMediaQuery('(min-width: 1024px)')

  const sidebarContent = useMemo(() => <Sidebar onNavigate={onClose} />, [onClose])

  return (
    <Flex bg="gray.50" minH="100vh">
      {isDesktop ? (
        <Box
          w={drawerWidth}
          bg="white"
          borderRightWidth="1px"
          borderColor="gray.100"
          position="sticky"
          top={0}
          h="100vh"
        >
          <Sidebar />
        </Box>
      ) : (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody p={0}>{sidebarContent}</DrawerBody>
          </DrawerContent>
        </Drawer>
      )}

      <Box flex="1" minW={0}>
        <HStack
          as="header"
          spacing={3}
          px={4}
          py={3}
          borderBottomWidth="1px"
          borderColor="gray.100"
          bg="white"
          position="sticky"
          top={0}
          zIndex={1}
        >
          {!isDesktop ? (
            <IconButton
              aria-label="Open menu"
              icon={<FiMenu />}
              variant="ghost"
              onClick={onOpen}
            />
          ) : null}
          <Text fontWeight="bold" fontSize="lg" color="gray.800">
            Admin Dashboard
          </Text>
        </HStack>

        <Box as="main" px={{ base: 4, md: 6 }} py={{ base: 4, md: 6 }}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  )
}

export default Layout
