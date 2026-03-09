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
import { autofillInput } from "../../utils/css-chakra"
import { country } from "../../utils/country"
import { useTranslation } from "react-i18next"
import GenericToggleTip from "../generic/GenericToggleTip"

const PhoneInput = ({
  error,
  label,
  tooltipInfo,
  countryCodeValue,
  phoneNumberValue,
  onChange, // single handler like your handleFormData
  countryOptions = country, // default to your `country` array
  countryCodeName = "countryCode",
  phoneNumberName = "phoneNumber",
  countryPlaceholder,
  phonePlaceholder,
  readOnly = false,
  required = false,
}) => {
  const { t } = useTranslation("profile")
  return (
    <Box rounded="sm" display="flex">
      <Field.Root
        justifyContent="flex-end"
        invalid={!!error}
        readOnly={readOnly}
        disabled={readOnly}
        required={required}
      >
        <HStack>
          <Field.Label>{label || t("phone-number")}</Field.Label>
          {tooltipInfo ? <GenericToggleTip content={tooltipInfo} /> : null}
        </HStack>

        <Grid templateColumns="repeat(4, 1fr)" width="100%">
          <GridItem colSpan={1}>
            <NativeSelect.Root width="8rem">
              <NativeSelect.Field
                name={countryCodeName}
                fontSize="xs"
                _autofill={autofillInput}
                placeholder={countryPlaceholder || t("country-code")}
                value={countryCodeValue ?? ""}
                readOnly={readOnly}
                disabled={readOnly}
                {...(!readOnly && { onChange })}
              >
                <For each={countryOptions}>
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
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </GridItem>

          <GridItem colSpan={3}>
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
            />
          </GridItem>
        </Grid>

        {error ? <Field.ErrorText>{error}</Field.ErrorText> : null}
      </Field.Root>
    </Box>
  )
}

export default PhoneInput
