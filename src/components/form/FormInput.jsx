import { Field, Box, HStack, Input } from "@chakra-ui/react"
import { autofillInput, glassInputStyles } from "@/utils/css-chakra"
import GenericToggleTip from "@/components/generic/GenericToggleTip"

const FormInput = ({
  error = null,
  onChange,
  inputName,
  inputProps: customInputProps = {},
  value,
  defaultValue,
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
    defaultValue,
    type,
    ...customInputProps,
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
    <Box rounded="sm" display="flex" w="full" {...props}>
      <Field.Root
        justifyContent="flex-start"
        invalid={!!error}
        readOnly={readOnly}
        disabled={readOnly}
        required={required}
        w="full"
      >
        {label && (
          <HStack mb="0.5" gap="1" minH="24px">
            <Field.Label m="0" fontSize="sm" fontWeight="600" color="gray.700">
              {label}
            </Field.Label>
            {required && <Field.RequiredIndicator />}
            {tooltipInfo && <GenericToggleTip content={tooltipInfo} />}
          </HStack>
        )}

        <Input {...glassInputStyles} {...inputProps} />

        {error && (
          <Field.ErrorText
            mt="0.5"
            fontSize="xs"
            fontWeight="500"
            color="rgba(220, 38, 38, 0.82)"
            lineHeight="1.4"
          >
            {error}
          </Field.ErrorText>
        )}
      </Field.Root>
    </Box>
  )
}

export default FormInput
