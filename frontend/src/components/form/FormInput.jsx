import { Field, Box, HStack, Input } from "@chakra-ui/react"
import { autofillInput } from "../../utils/css-chakra"
import GenericToggleTip from "../generic/GenericToggleTip"

const FormInput = ({
  error = null,
  onChange,
  inputName,
  value,
  placeholder,
  label,
  tooltipInfo = null,
  readOnly = false,
  required = false,
}) => {
  return (
    <Box rounded="sm" display="flex">
      <Field.Root
        justifyContent="flex-start"
        invalid={!!error}
        readOnly={readOnly}
        disabled={readOnly}
        required={required}
      >
        <HStack>
          <Field.Label my="1.5">{label}</Field.Label>
          {required && <Field.RequiredIndicator />}
          {tooltipInfo && <GenericToggleTip content={tooltipInfo} />}
        </HStack>
        <Input
          name={inputName}
          _autofill={autofillInput}
          placeholder={placeholder}
          value={value}
          {...(!readOnly && { onChange })}
        />
        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    </Box>
  )
}

export default FormInput
