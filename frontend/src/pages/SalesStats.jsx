import { Box, HStack, Text } from '@chakra-ui/react'
import { FiBarChart2 } from 'react-icons/fi'

function SalesStats() {
  return (
    <Box bg="white" borderWidth="1px" borderColor="gray.100" borderRadius="lg" p={4} boxShadow="sm">
      <HStack spacing={3} align="center">
        <FiBarChart2 size={24} color="#2b6cb0" />
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            Sales Stats
          </Text>
          <Text fontSize="sm" color="gray.600">
            Monitor sales performance, KPIs, and growth trends.
          </Text>
        </Box>
      </HStack>
    </Box>
  )
}

export default SalesStats
