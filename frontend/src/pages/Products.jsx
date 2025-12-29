import { Box, HStack, Text } from '@chakra-ui/react'
import { FiBox } from 'react-icons/fi'

function Products() {
  return (
    <Box bg="white" borderWidth="1px" borderColor="gray.100" borderRadius="lg" p={4} boxShadow="sm">
      <HStack spacing={3} align="center">
        <FiBox size={24} color="#2b6cb0" />
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            Products
          </Text>
          <Text fontSize="sm" color="gray.600">
            Manage your catalog, pricing, and availability.
          </Text>
        </Box>
      </HStack>
    </Box>
  )
}

export default Products
