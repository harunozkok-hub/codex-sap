import { Button } from "@chakra-ui/react"
import { ToggleTip } from "../../components/ui/toggle-tip"
import { FiInfo } from "react-icons/fi"

const GenericToggleTip = ({ content, size = "xs" }) => {
  return (
    <ToggleTip content={content}>
      <Button size={size} variant="ghost">
        <FiInfo />
      </Button>
    </ToggleTip>
  )
}

export default GenericToggleTip
