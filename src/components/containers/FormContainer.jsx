import { Box } from "@chakra-ui/react"

function FormContainer({
  children,
  maxW = "1000px",
  mx,
  w = "full",
  ...props
}) {
  return (
    <Box w={w} maxW={maxW} mx={mx} {...props}>
      {children}
    </Box>
  )
}

export default FormContainer
