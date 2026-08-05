import { Field, RadioGroup, Stack, Text } from "@chakra-ui/react"
import {
  glassRadioGroupItemStyles,
  glassRadioIndicatorStyles,
} from "@/utils/css-chakra"
import GenericToggleTip from "@/components/generic/GenericToggleTip"

function FormRadioGroup({
  inputName,
  label = null,
  tooltipInfo = null,
  value,
  onValueChange,
  options = [],
  error = null,
  readOnly = false,
  disabled = false,
  required = false,
}) {
  return (
    <Field.Root
      invalid={!!error}
      readOnly={readOnly}
      disabled={readOnly || disabled}
      required={required}
      w="full"
    >
      {label && (
        <Field.Label mb="2" fontSize="sm" fontWeight="600" color="gray.700">
          {label}
          {required && <Field.RequiredIndicator ml="1" />}
          {tooltipInfo && <GenericToggleTip content={tooltipInfo} />}
        </Field.Label>
      )}

      <RadioGroup.Root
        name={inputName}
        value={value}
        disabled={readOnly || disabled}
        onValueChange={onValueChange}
        w="full"
      >
        <Stack gap="3" w="full">
          {options.map((option) => (
            <RadioGroup.Item
              key={option.value}
              value={option.value}
              {...glassRadioGroupItemStyles}
            >
              <RadioGroup.ItemHiddenInput />
              <Stack direction="row" align="center" gap="3" w="full">
                <RadioGroup.ItemIndicator {...glassRadioIndicatorStyles} />
                <Text fontSize="sm" color="gray.700" fontWeight="500">
                  {option.label}
                </Text>
              </Stack>
            </RadioGroup.Item>
          ))}
        </Stack>
      </RadioGroup.Root>

      {error && (
        <Field.ErrorText mt="1.5" fontSize="xs" color="red.500">
          {error}
        </Field.ErrorText>
      )}
    </Field.Root>
  )
}

export default FormRadioGroup
