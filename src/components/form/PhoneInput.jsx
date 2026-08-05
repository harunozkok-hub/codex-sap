import {
  Box,
  Field,
  HStack,
  Grid,
  GridItem,
  NativeSelect,
  For,
  Input,
} from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

import {
  autofillInput,
  glassInputStyles,
  glassSelectStyles,
} from "@/utils/css-chakra"
import { country } from "@/utils/country"

import GenericToggleTip from "@/components/generic/GenericToggleTip"

const PhoneInput = ({
  error,
  label,
  tooltipInfo,
  countryCodeValue,
  phoneNumberValue,
  onChange, // single handler like your handleFormData
  countryOptions = null,
  countryCodeName = "countryCode",
  phoneNumberName = "phoneNumber",
  countryPlaceholder,
  phonePlaceholder,
  readOnly = false,
  required = false,
}) => {
  const { t } = useTranslation("profile")
  const resolvedCountryOptions = countryOptions ?? country(t)
  return (
    <Box rounded="sm" display="flex">
      <Field.Root
        justifyContent="flex-start"
        invalid={!!error}
        readOnly={readOnly}
        disabled={readOnly}
        required={required}
      >
        {label && (
          <HStack mb="0.5" gap="1" minH="24px">
            <Field.Label m="0" fontSize="sm" fontWeight="600" color="gray.700">
              {label || t("phone-number")}
            </Field.Label>
            {required && <Field.RequiredIndicator />}
            {tooltipInfo && <GenericToggleTip content={tooltipInfo} />}
          </HStack>
        )}

        <Grid templateColumns="repeat(6, 1fr)" width="100%" gap="3">
          <GridItem colSpan={2}>
            <NativeSelect.Root minWidth="6rem">
              <NativeSelect.Field
                name={countryCodeName}
                fontSize="xs"
                _autofill={autofillInput}
                placeholder={countryPlaceholder || t("country-code")}
                value={countryCodeValue ?? ""}
                readOnly={readOnly}
                disabled={readOnly}
                {...(!readOnly && { onChange })}
                {...glassSelectStyles}
              >
                <For each={resolvedCountryOptions}>
                  {(item) => (
                    <option key={item.iso2} value={item.phone_code}>
                      {item.icon +
                        "  " +
                        item.iso2 +
                        "  " +
                        "(" +
                        item.phone_code +
                        ")"}
                    </option>
                  )}
                </For>
              </NativeSelect.Field>
              <NativeSelect.Indicator color="gray.500" pointerEvents="none" />
            </NativeSelect.Root>
          </GridItem>

          <GridItem colSpan={4}>
            <Input
              name={phoneNumberName}
              _autofill={autofillInput}
              placeholder={
                phonePlaceholder || t("123123123-without-country-code")
              }
              value={phoneNumberValue ?? ""}
              readOnly={readOnly}
              disabled={readOnly}
              {...(!readOnly && { onChange })}
              {...glassInputStyles}
            />
          </GridItem>
        </Grid>

        {error ? <Field.ErrorText>{error}</Field.ErrorText> : null}
      </Field.Root>
    </Box>
  )
}

export default PhoneInput
