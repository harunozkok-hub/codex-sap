import { Box, Checkbox, Field, HStack } from "@chakra-ui/react"
import GenericToggleTip from "../generic/GenericToggleTip"

const FormCheckbox = ({
  error = null,
  onCheckedChange,
  inputName,
  checked,
  label = null,
  text,
  tooltipInfo = null,
  readOnly = false,
  required = false,
  value,
  rightControlled = false,
  mt = 0,
  disabled = false,
}) => {
  return (
    <Field.Root
      mt={mt}
      justifyContent="flex-start"
      invalid={!!error}
      readOnly={readOnly}
      disabled={readOnly || disabled}
      required={required}
    >
      <HStack>
        {label && <Field.Label my="1.5">{label}</Field.Label>}

        {tooltipInfo && <GenericToggleTip content={tooltipInfo} />}
      </HStack>

      <Checkbox.Root
        name={inputName}
        checked={checked}
        value={value}
        disabled={readOnly || disabled}
        {...(!readOnly && { onCheckedChange })}
      >
        <Checkbox.HiddenInput />
        {rightControlled && <Checkbox.Control />}
        <Checkbox.Label>
          {text} {required && <Field.RequiredIndicator />}
        </Checkbox.Label>
        {!rightControlled && <Checkbox.Control />}
      </Checkbox.Root>

      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  )
}

export default FormCheckbox
