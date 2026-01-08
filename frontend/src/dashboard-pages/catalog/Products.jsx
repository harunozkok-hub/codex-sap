import { Box, HStack, Separator, Stack, Text } from "@chakra-ui/react"
import { FiBox } from "react-icons/fi"

function Products() {
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
            PRODUCT LIST
          </Text>
          <Text fontWeight="medium" fontSize="sm">
            - Manage the products you sell
          </Text>
        </HStack>
      </HStack>
      <Stack>
        <Text fontSize="sm" color="gray.600">
          Create, edit, and manage sellable products. Products can be synced to
          ecommerce platforms when needed - Wix supported.
        </Text>
      </Stack>
    </Box>
  )
}

export default Products
