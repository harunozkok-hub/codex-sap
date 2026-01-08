import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { FiTruck } from "react-icons/fi"

function RawMaterials() {
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
            Raw Materials
          </Text>
          <Text fontWeight="medium" fontSize="sm">
            - Track production components and ingredients
          </Text>
        </HStack>
      </HStack>
      <Stack>
        <Text fontSize="sm" color="gray.600">
          Manage raw materials used in production - e.g. bottles, caps,
          formulas, labels - and monitor their stock and usage.
        </Text>
      </Stack>
    </Box>
  )
}

export default RawMaterials
