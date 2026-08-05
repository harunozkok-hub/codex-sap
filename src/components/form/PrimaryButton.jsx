import { Button } from "@chakra-ui/react"
import { NavLink } from "react-router"
import { glassButtonPrimary } from "@/utils/css-chakra"

function PrimaryButton({
  onClick,
  as,
  to,
  disabled,
  loading,
  label,
  type = "button",
  children,
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

  return (
    <Button {...glassButtonPrimary} {...buttonProps} {...props}>
      {iconLeft}
      {label || children}
      {iconRight}
    </Button>
  )
}

export default PrimaryButton
