import { Box } from "@chakra-ui/react"
import { resPX, resPY } from "../../utils/css-chakra"

function PageContainer({
  children,
  maxW = "full",
  bg = "white",
  px = resPX,
  py = resPY,
  minW = "340px",
  ...props
}) {
  return (
    <Box
      bg={bg}
      position="relative"
      borderWidth="1px"
      borderColor="gray.100"
      borderRadius="lg"
      px={px}
      py={py}
      boxShadow="sm"
      maxW={maxW}
      minW={minW}
      mx="auto"
      {...props}
    >
      {children}
    </Box>
  )
}

export default PageContainer
