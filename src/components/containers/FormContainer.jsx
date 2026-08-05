import { Box } from "@chakra-ui/react"
import { dashboardFormContainerStyles } from "@/utils/css-chakra"

function FormContainer({
  children,
  maxW = "1000px",
  mx = dashboardFormContainerStyles.mx,
  w = "full",
  ...props
}) {
  return (
    <Box
      {...dashboardFormContainerStyles}
      w={w}
      maxW={maxW}
      mx={mx}
      {...props}
    >
      {children}
    </Box>
  )
}

export default FormContainer
