import { Button, IconButton } from "@chakra-ui/react"
import { NavLink } from "react-router"

import { glassButtonDanger, glassIconButtonDanger } from "@/utils/css-chakra"

function DangerButton({
  onClick,
  as,
  to,
  disabled,
  loading,
  label,
  type = "button",
  children,
  forIcon = null,
  ...props
}) {
  const isLink = !!to

  const buttonProps = {
    type,
    onClick,
    disabled: disabled || loading,
    loading,
    ...(isLink && {
      as: NavLink,
      to,
    }),
    ...(as && { as }),
  }

  const button = forIcon ? (
    <IconButton {...glassIconButtonDanger} {...buttonProps} {...props}>
      {label || children}
    </IconButton>
  ) : (
    <Button {...glassButtonDanger} {...buttonProps} {...props}>
      {label || children}
    </Button>
  )

  return button
}

export default DangerButton
