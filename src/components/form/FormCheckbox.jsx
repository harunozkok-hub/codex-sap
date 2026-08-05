import { Checkbox, Field, HStack } from "@chakra-ui/react"
import GenericToggleTip from "@/components/generic/GenericToggleTip"
import { glassCheckboxControlStyles } from "@/utils/css-chakra"

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
  labelPosition = "left",
  spread = false,
  align = "start",
  mt = 0,
  disabled = false,
}) => {
  const isLabelLeft = labelPosition === "left"
  const justifyContentMap = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
  }

  return (
    <Field.Root
      mt={mt}
      justifyContent="flex-start"
      invalid={!!error}
      readOnly={readOnly}
      disabled={readOnly || disabled}
      required={required}
      w="full"
    >
      <HStack mb="2" gap="1.5" justifySelf="flex-end">
        {label && (
          <Field.Label m="0" fontSize="sm" fontWeight="600" color="gray.700">
            {label}
          </Field.Label>
        )}

        {tooltipInfo && <GenericToggleTip content={tooltipInfo} />}
      </HStack>

      <Checkbox.Root
        name={inputName}
        checked={checked}
        value={value}
        disabled={readOnly || disabled}
        w={spread ? "full" : "fit-content"}
        ml={align === "end" && !spread ? "auto" : undefined}
        mr={align === "center" && !spread ? "auto" : undefined}
        alignItems="center"
        gap="3"
        justifyContent={
          spread ? "space-between" : justifyContentMap[align] || "flex-start"
        }
        {...(!readOnly && { onCheckedChange })}
      >
        <Checkbox.HiddenInput />

        {!isLabelLeft && <Checkbox.Control {...glassCheckboxControlStyles} />}

        <Checkbox.Label
          flex={spread ? "1" : undefined}
          fontSize="sm"
          color="gray.700"
          fontWeight="500"
          userSelect="none"
        >
          {text} {required && <Field.RequiredIndicator />}
        </Checkbox.Label>

        {isLabelLeft && <Checkbox.Control {...glassCheckboxControlStyles} />}
      </Checkbox.Root>

      {error && (
        <Field.ErrorText mt="1.5" fontSize="xs" color="red.500">
          {error}
        </Field.ErrorText>
      )}
    </Field.Root>
  )
}

export default FormCheckbox
