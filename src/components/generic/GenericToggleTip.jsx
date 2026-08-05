import { Button } from "@chakra-ui/react"
import { ToggleTip } from "@/components/ui/toggle-tip"
import { LuInfo } from "react-icons/lu"

const GenericToggleTip = ({ content, size = "2xs" }) => {
  return (
    <ToggleTip content={content}>
      <Button size={size} variant="ghost">
        <LuInfo />
      </Button>
    </ToggleTip>
  )
}

export default GenericToggleTip
