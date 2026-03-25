import { Box } from "@chakra-ui/react"

const CustomCard = ({ children }) => {
  return (
    <Box
      bg="white"
      borderRadius="md"
      p={4}
      h="100%"
      boxShadow="md"
      shadowColor="teal.100"
      maxW="md"
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Box>
  )
}

export default CustomCard
