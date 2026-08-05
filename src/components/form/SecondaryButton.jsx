import { Button } from "@chakra-ui/react"
import { NavLink } from "react-router"
import {
  glassButtonSecondary,
  glassButtonSecondaryNeutral,
  sidebarSecondaryButton,
} from "@/utils/css-chakra"

function SecondaryButton({
  onClick,
  as,
  to,
  disabled,
  loading,
  label,
  type = "button",
  children,
  atSidebar = false,
  neutral = false,
  iconLeft = null,
  iconRight = null,
  ...props
}) {
  const isLink = !!to

  const buttonProps = {
    type,
    onClick,
    disabled: disabled || loading,
    loading: loading,
    ...(isLink && {
      as: NavLink,
      to,
    }),
    ...(as && { as }),
  }

  const styles = atSidebar
    ? sidebarSecondaryButton
    : neutral
      ? glassButtonSecondaryNeutral
      : glassButtonSecondary

  return (
    <Button {...styles} {...buttonProps} {...props}>
      {iconLeft}
      {label || children}
      {iconRight}
    </Button>
  )
}

export default SecondaryButton
