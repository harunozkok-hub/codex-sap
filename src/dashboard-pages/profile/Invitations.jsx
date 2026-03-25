import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { FiUsers } from "react-icons/fi"

function Invitations() {
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
            Invite Users
          </Text>
          <Text fontWeight="medium" fontSize="sm">
            - Invite the users by email
          </Text>
        </HStack>
      </HStack>
      <Stack>
        <Text fontSize="sm" color="gray.600">
          You can send invitations to users to join the dashboard
        </Text>
      </Stack>
    </Box>
  )
}

export default Invitations
