import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { FiTruck } from "react-icons/fi"

function Warehouses() {
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
        <FiTruck size={24} color="#2b6cb0" />
        <HStack>
          <Text fontWeight="bold" fontSize="lg">
            Warehouses
          </Text>
          <Text fontWeight="medium" fontSize="sm">
            - Manage your storage locations
          </Text>
        </HStack>
      </HStack>
      <Stack>
        <Text fontSize="sm" color="gray.600">
          Create and configure warehouses, fulfillment centers, or storage
          locations used for inventory tracking.
        </Text>
      </Stack>
    </Box>
  )
}

export default Warehouses
