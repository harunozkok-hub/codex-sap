import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { FiShoppingCart } from "react-icons/fi"

function Orders() {
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
        <FiShoppingCart size={24} color="#2b6cb0" />
        <HStack>
          <Text fontWeight="bold" fontSize="lg">
            Orders
          </Text>
          <Text fontWeight="medium" fontSize="lg">
            Manage customer orders from all channels
          </Text>
        </HStack>
      </HStack>
      <Stack>
        <Text fontSize="sm" color="gray.600">
          View, process, and track customer orders, including orders synced from
          Wix.
        </Text>
      </Stack>
    </Box>
  )
}

export default Orders
