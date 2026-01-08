import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { FiTruck } from "react-icons/fi"

function Packaging() {
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
            Packaging Materials
          </Text>
          <Text fontWeight="medium" fontSize="sm">
            - Manage packaging-related inventory
          </Text>
        </HStack>
      </HStack>
      <Stack>
        <Text fontSize="sm" color="gray.600">
          Track boxes, bottles, labels, fillers, and other packaging materials,
          including sizes, weights, and costs.
        </Text>
      </Stack>
    </Box>
  )
}

export default Packaging
