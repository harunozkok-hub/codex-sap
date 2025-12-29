import { Box, HStack, Text } from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi'

function Orders() {
  return (
    <Box bg="white" borderWidth="1px" borderColor="gray.100" borderRadius="lg" p={4} boxShadow="sm">
      <HStack spacing={3} align="center">
        <FiShoppingCart size={24} color="#2b6cb0" />
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            Orders
          </Text>
          <Text fontSize="sm" color="gray.600">
            Track order fulfillment, status updates, and customer details.
          </Text>
        </Box>
      </HStack>
    </Box>
  )
}

export default Orders
