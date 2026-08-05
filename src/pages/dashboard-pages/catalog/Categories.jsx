import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { FiBox } from "react-icons/fi"

function Categories() {
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
            CATEGORIES
          </Text>
          <Text fontWeight="medium" fontSize="sm">
            - Organize products for your store and customers
          </Text>
        </HStack>
      </HStack>
      <Stack>
        <Text fontSize="sm" color="gray.600">
          Create and manage product categories, and control how products are
          grouped and displayed, including Wix categories.
        </Text>
      </Stack>
    </Box>
  )
}

export default Categories
