import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { FiUsers } from "react-icons/fi"

function ManageDashboardUsers() {
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
            Manage Dashboard Users
          </Text>
          <Text fontWeight="medium" fontSize="sm">
            - Manage who can access to the dashboard
          </Text>
        </HStack>
      </HStack>
      <Stack>
        <Text fontSize="sm" color="gray.600">
          Delete users and observe who is accessing to the dashboard
        </Text>
      </Stack>
    </Box>
  )
}

export default ManageDashboardUsers
