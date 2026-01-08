import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { FiTruck } from "react-icons/fi"

function Samples() {
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
            Samples & Gifts
          </Text>
          <Text fontWeight="medium" fontSize="sm">
            - Handle non-sellable promotional items
          </Text>
        </HStack>
      </HStack>
      <Stack>
        <Text fontSize="sm" color="gray.600">
          Manage free samples and gift items used for promotions or marketing
          campaigns.
        </Text>
      </Stack>
    </Box>
  )
}

export default Samples
