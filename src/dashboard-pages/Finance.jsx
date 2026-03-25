import { Box, HStack, Text } from '@chakra-ui/react'
import { FiDollarSign } from 'react-icons/fi'

function Finance() {
  return (
    <Box bg="white" borderWidth="1px" borderColor="gray.100" borderRadius="lg" p={4} boxShadow="sm">
      <HStack spacing={3} align="center">
        <FiDollarSign size={24} color="#2b6cb0" />
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            Finance
          </Text>
          <Text fontSize="sm" color="gray.600">
            Review revenue, expenses, and financial health metrics.
          </Text>
        </Box>
      </HStack>
    </Box>
  )
}

export default Finance
