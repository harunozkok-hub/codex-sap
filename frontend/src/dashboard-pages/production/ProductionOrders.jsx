import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { FiTruck } from "react-icons/fi"

function ProductionOrders() {
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
            Production Orders
          </Text>
          <Text fontWeight="medium" fontSize="sm">
            - Plan and execute manufacturing activities
          </Text>
        </HStack>
      </HStack>
      <Stack>
        <Text fontSize="sm" color="gray.600">
          Create production orders, define required materials, track progress,
          and reserve inventory.
        </Text>
      </Stack>
    </Box>
  )
}

export default ProductionOrders
