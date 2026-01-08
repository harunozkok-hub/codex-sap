import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { FiBox } from "react-icons/fi"

function Bundles() {
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
        <FiBox size={24} color="#2b6cb0" />
        <HStack>
          <Text fontWeight="bold" fontSize="lg">
            Bundles & Kits
          </Text>
          <Text fontWeight="medium" fontSize="sm">
            - Sell multiple items together as one product
          </Text>
        </HStack>
      </HStack>
      <Stack>
        <Text fontSize="sm" color="gray.600">
          Create product bundles or kits composed of multiple products, with
          unified pricing and stock logic.
        </Text>
      </Stack>
    </Box>
  )
}

export default Bundles
