import { Field, Box, HStack, Input } from "@chakra-ui/react"
import { autofillInput } from "../../utils/css-chakra"
import GenericToggleTip from "../generic/GenericToggleTip"

const FormInput = ({
  error = null,
  onChange,
  inputName,
  value,
  placeholder,

  label = null,
  type = null,
  tooltipInfo = null,
  readOnly = false,
  required = false,
  ...props
}) => {
  const inputProps = {
    name: inputName,
    _autofill: autofillInput,
    placeholder,
    type,
    ...(!readOnly && { onChange }),
  }

  if (value !== undefined) {
    if (onChange || readOnly) {
      inputProps.value = value
    } else {
      inputProps.defaultValue = value
    }
  }

  return (
    <Box rounded="sm" display="flex" {...props}>
      <Field.Root
        justifyContent="flex-start"
        invalid={!!error}
        readOnly={readOnly}
        disabled={readOnly}
        required={required}
      >
        {label && (
          <HStack>
            <Field.Label my="1.5">{label}</Field.Label>
            {required && <Field.RequiredIndicator />}
            {tooltipInfo && <GenericToggleTip content={tooltipInfo} />}
          </HStack>
        )}
        <Input
          {...inputProps}
        />
        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    </Box>
  )
}

export default FormInput
