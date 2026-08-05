import { Box, Field, HStack, Tag, Text } from "@chakra-ui/react"

import GenericToggleTip from "@/components/generic/GenericToggleTip"
import { glassInputStyles } from "@/utils/css-chakra"

function normalizeOptions(options) {
  if (Array.isArray(options)) {
    return options.map((option) =>
      typeof option === "string"
        ? { value: option, label: option }
        : { value: option.value, label: option.label ?? option.value },
    )
  }

  if (!options || typeof options !== "object") {
    return []
  }

  return Object.entries(options).map(([value, label]) => ({
    value,
    label: typeof label === "string" ? label : value,
  }))
}

const tagRootStyles = {
  borderRadius: "full",
  borderWidth: "1px",
  borderColor: "rgba(168, 85, 247, 0.24)",
  bg: "rgba(243, 232, 255, 0.74)",
  color: "purple.800",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
  px: "2.5",
  py: "1.5",
  gap: "1.5",
}

const tagCloseTriggerStyles = {
  borderRadius: "full",
  color: "purple.700",
  transition: "background 0.2s ease, color 0.2s ease",
  _hover: {
    bg: "rgba(255,255,255,0.7)",
    color: "purple.900",
  },
  _focusVisible: {
    outline: "none",
    boxShadow: "0 0 0 2px rgba(168, 85, 247, 0.12)",
  },
}

const FormTagInput = ({
  error = null,
  label = null,
  onValueChange,
  options = [],
  placeholder = null,
  readOnly = false,
  disabled = false,
  tooltipInfo = null,
  value = [],
  ...props
}) => {
  const normalizedOptions = normalizeOptions(options)
  const optionMap = new Map(
    normalizedOptions.map((option) => [String(option.value), option.label]),
  )
  const selectedItems = value.map((itemValue) => ({
    value: String(itemValue),
    label: optionMap.get(String(itemValue)) ?? String(itemValue),
  }))

  const removeValue = (nextValue) => {
    if (readOnly || disabled || !onValueChange) return

    onValueChange(value.filter((itemValue) => String(itemValue) !== nextValue))
  }

  return (
    <Box rounded="sm" display="flex" w="full" {...props}>
      <Field.Root
        justifyContent="flex-start"
        invalid={!!error}
        readOnly={readOnly}
        disabled={readOnly || disabled}
        w="full"
      >
        {label && (
          <HStack mb="0.5" gap="1" minH="24px">
            <Field.Label m="0" fontSize="sm" fontWeight="600" color="gray.700">
              {label}
            </Field.Label>
            {tooltipInfo && <GenericToggleTip content={tooltipInfo} />}
          </HStack>
        )}

        <Box
          {...glassInputStyles}
          h="auto"
          minH="48px"
          px="3"
          py="2.5"
          display="flex"
          alignItems="center"
        >
          {selectedItems.length ? (
            <HStack gap="2" wrap="wrap">
              {selectedItems.map((item) => (
                <Tag.Root key={item.value} size="sm" {...tagRootStyles}>
                  <Tag.Label fontWeight="600" lineHeight="1">
                    {item.label}
                  </Tag.Label>
                  {!readOnly && !disabled ? (
                    <Tag.EndElement>
                      <Tag.CloseTrigger
                        aria-label={`Remove ${item.label}`}
                        onClick={() => removeValue(item.value)}
                        {...tagCloseTriggerStyles}
                      />
                    </Tag.EndElement>
                  ) : null}
                </Tag.Root>
              ))}
            </HStack>
          ) : (
            <Text fontSize="sm" color="gray.500">
              {placeholder}
            </Text>
          )}
        </Box>

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

export default FormTagInput
