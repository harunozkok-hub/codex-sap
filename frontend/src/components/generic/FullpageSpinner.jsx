import { Box, Spinner, Center } from "@chakra-ui/react"

const FullpageSpinner = ({ size = "lg" }) => {
  return (
    <Box pos="absolute" bg="bg/60" inset="0">
      <Center h="full">
        <Spinner size={size} color="teal.500" />
      </Center>
    </Box>
  )
}

export default FullpageSpinner
