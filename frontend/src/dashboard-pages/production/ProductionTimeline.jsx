import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { FiTruck } from "react-icons/fi"

function ProductionTimeline() {
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
            Production Timeline
          </Text>
          <Text fontWeight="medium" fontSize="sm">
            - Visualize production schedules and lead times
          </Text>
        </HStack>
      </HStack>
      <Stack>
        <Text fontSize="sm" color="gray.600">
          See expected completion dates, delays, and production capacity over
          time.
        </Text>
      </Stack>
    </Box>
  )
}

export default ProductionTimeline
