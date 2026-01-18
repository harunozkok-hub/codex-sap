import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { FiUser } from "react-icons/fi"

function ManageProfile() {
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
        <FiUser size={24} color="#2b6cb0" />
        <HStack>
          <Text fontWeight="bold" fontSize="lg">
            Manage Profile
          </Text>
          <Text fontWeight="medium" fontSize="sm">
            - Modify company and user info
          </Text>
        </HStack>
      </HStack>
      <Stack>
        <Text fontSize="sm" color="gray.600">
          You can modify the company & user information provided by you
        </Text>
      </Stack>
    </Box>
  )
}

export default ManageProfile
