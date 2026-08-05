import { Stack } from "@chakra-ui/react"

const CustomCard = ({ children }) => {
  return (
    <Stack
      w="100%"
      maxW="md"
      mx="auto"
      px={{ base: "1.25rem", md: "1.5rem" }}
      py={{ base: "1.1rem", md: "1.35rem" }}
      borderRadius="20px"
      bg="rgba(255,255,255,0.52)"
      borderWidth="1px"
      borderColor="rgba(196,181,253,0.22)"
      boxShadow="inset 0 1px 0 rgba(255,255,255,0.65)"
      gap="2"
      textAlign="center"
    >
      {children}
    </Stack>
  )
}

export default CustomCard
