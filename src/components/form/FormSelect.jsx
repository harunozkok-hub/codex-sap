import { Field, Box, HStack, NativeSelect } from "@chakra-ui/react"
import GenericToggleTip from "@/components/generic/GenericToggleTip"
import { autofillInput, glassSelectStyles } from "@/utils/css-chakra"

const FormSelect = ({
  error = null,
  onChange,
  inputName,
  value,
  defaultValue,
  label,
  tooltipInfo = null,
  readOnly = false,
  required = false,
  disabled = false,
  placeholder = null,
  selectList = [],
  labelAside = null,
  ...props
}) => {
  const selectProps = {
    name: inputName,
    _autofill: autofillInput,
    placeholder,
    defaultValue,
    ...(!readOnly && { onChange }),
  }

  if (value !== undefined) {
    if (onChange || readOnly) {
      selectProps.value = value
    } else {
      selectProps.defaultValue = value
    }
  }

  return (
    <Box rounded="sm" display="flex" w="full" {...props}>
      <Field.Root
        justifyContent="flex-start"
        invalid={!!error}
        readOnly={readOnly}
        disabled={readOnly || disabled}
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
            {labelAside}
          </HStack>
        )}

        <NativeSelect.Root w="full">
          <NativeSelect.Field
            {...selectProps}
            w="full"
            {...glassSelectStyles}
          >
            {selectList.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator color="gray.500" pointerEvents="none" />
        </NativeSelect.Root>

        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    </Box>
  )
}

export default FormSelect
