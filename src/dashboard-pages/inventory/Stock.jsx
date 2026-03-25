import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { FiTruck } from "react-icons/fi"

function Stock() {
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
            Stock Levels
          </Text>
          <Text fontWeight="medium" fontSize="sm">
            - Track inventory across all warehouses
          </Text>
        </HStack>
      </HStack>
      <Stack>
        <Text fontSize="sm" color="gray.600">
          View real-time stock quantities by product, material, and location.
        </Text>
      </Stack>
    </Box>
  )
}

export default Stock
