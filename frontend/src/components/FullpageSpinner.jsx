import { Box, Spinner, Center } from "@chakra-ui/react"

const FullpageSpinner = ({ size = "lg" }) => {
  return (
    <Center h="full">
      <Spinner size={size} color="teal.500" />
    </Center>
  )
}

export default FullpageSpinner
