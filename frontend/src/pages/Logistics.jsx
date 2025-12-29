import { Box, HStack, Text } from '@chakra-ui/react'
import { FiTruck } from 'react-icons/fi'

function Logistics() {
  return (
    <Box bg="white" borderWidth="1px" borderColor="gray.100" borderRadius="lg" p={4} boxShadow="sm">
      <HStack spacing={3} align="center">
        <FiTruck size={24} color="#2b6cb0" />
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            Logistics
          </Text>
          <Text fontSize="sm" color="gray.600">
            Coordinate shipments, couriers, and delivery routes.
          </Text>
        </Box>
      </HStack>
    </Box>
  )
}

export default Logistics
