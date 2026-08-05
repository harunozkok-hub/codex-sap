import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { FiUsers } from "react-icons/fi"

function DashboardPermissions() {
  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="gray.100"
      borderRadius="lg"
      p={4}
      boxShadow="sm"
    >
      <HStack spacing={3} align="center">
        <FiUsers size={24} color="#2b6cb0" />
        <HStack>
          <Text fontWeight="bold" fontSize="lg">
            Dashboard Permissions
          </Text>
          <Text fontWeight="medium" fontSize="sm">
            - Organize the roles of dashboard users
          </Text>
        </HStack>
      </HStack>
      <Stack>
        <Text fontSize="sm" color="gray.600">
          You can assign certain accessibility and roles to your dashboard users
        </Text>
      </Stack>
    </Box>
  )
}

export default DashboardPermissions
