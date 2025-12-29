import { useMemo } from 'react'
import {
  Box,
  Drawer,
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
      ) : null}

      <Box flex="1" minW={0}>
        {isDesktop ? (
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
            <Text fontWeight="bold" fontSize="lg" color="gray.800">
              Admin Dashboard
            </Text>
          </HStack>
        ) : (
          <Drawer.Root
            open={isOpen}
            onOpenChange={(open) => {
              if (open) onOpen()
              else onClose()
            }}
            placement="start"
          >
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
              <Drawer.Trigger asChild>
                <IconButton aria-label="Open menu" icon={<FiMenu />} variant="ghost" />
              </Drawer.Trigger>
              <Text fontWeight="bold" fontSize="lg" color="gray.800">
                Admin Dashboard
              </Text>
            </HStack>

            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.CloseTrigger />
                <Drawer.Header borderBottomWidth="1px">Menu</Drawer.Header>
                <Drawer.Body p={0}>{sidebarContent}</Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Drawer.Root>
        )}

        <Box as="main" px={{ base: 4, md: 6 }} py={{ base: 4, md: 6 }}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  )
}

export default Layout
