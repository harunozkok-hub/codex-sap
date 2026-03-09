import { Field, Box, HStack, NativeSelect } from "@chakra-ui/react"
import GenericToggleTip from "../generic/GenericToggleTip"
import { autofillInput } from "../../utils/css-chakra"

const FormSelect = ({
  error = null,
  onChange,
  inputName,
  value,
  label,
  tooltipInfo = null,
  readOnly = false,
  required = false,
  placeholder = null,
  selectList = [],
}) => {
  return (
    <Box rounded="sm" display="flex">
      <Field.Root
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

        <NativeSelect.Root>
          <NativeSelect.Field
            name={inputName}
            value={value}
            _autofill={autofillInput}
            placeholder={placeholder}
            {...(!readOnly && { onChange })}
          >
            {selectList.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>

        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    </Box>
  )
}

export default FormSelect
