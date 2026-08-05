import { Box } from "@chakra-ui/react"
import {
  dashboardPageSurfaceStyles,
  resPX,
  resPY,
} from "@/utils/css-chakra"

function PageContainer({
  children,
  maxW = "full",
  bg,
  px = resPX,
  py = resPY,
  minW = "340px",
  ...props
}) {
  return (
    <Box
      {...dashboardPageSurfaceStyles}
      bg={bg ?? dashboardPageSurfaceStyles.bg}
      position="relative"
      px={px}
      py={py}
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
