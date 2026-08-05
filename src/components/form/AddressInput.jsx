import { GridItem, SimpleGrid, Stack } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

import { country } from "@/utils/country"
import { resGap } from "@/utils/css-chakra"

import AddressSuggestionInput from "@/components/form/AddressSuggestionInput"
import FormInput from "@/components/form/FormInput"
import FormSelect from "@/components/form/FormSelect"
import PhoneInput from "@/components/form/PhoneInput"

const pickAutofillValue = (nextValue, prevValue) => {
  if (nextValue == null) return prevValue
  if (typeof nextValue === "string" && nextValue.trim() === "") {
    return prevValue
  }

  return nextValue
}

const applyAutocompleteAddressToForm = (prevFormData, item) => {
  return {
    ...prevFormData,
    streetName: pickAutofillValue(item?.street, prevFormData.streetName),
    houseNumber: pickAutofillValue(item?.housenumber, prevFormData.houseNumber),
    city: pickAutofillValue(item?.city, prevFormData.city),
    region: pickAutofillValue(item?.state, prevFormData.region),
    postalCode: pickAutofillValue(item?.postcode, prevFormData.postalCode),
    country: pickAutofillValue(
      item?.country_code?.toUpperCase(),
      prevFormData.country,
    ),
  }
}

function AddressInput({
  formData,
  errors = null,
  onChange,
  onFormDataChange = null,
  country: restrictedCountry = null,
  showAddressName = true,
  showPhone = true,
  showAutocomplete = true,
  addressNameRequired = false,
  phoneRequired = false,
  countryOptions = null,
  addressSuggestionMinEntry = 5,
  ...props
}) {
  const { t } = useTranslation(["company-profile", "profile", "common"])
  const resolvedCountryOptions = countryOptions ?? country(t)
  const restrictedCountryLabel =
    resolvedCountryOptions.find((item) => item.iso2 === restrictedCountry)
      ?.country ?? restrictedCountry

  const handleAutocompleteSelect = (item) => {
    if (!onFormDataChange) return

    onFormDataChange((prev) => {
      const nextAddress = applyAutocompleteAddressToForm(prev, item)

      if (restrictedCountry) {
        return {
          ...nextAddress,
          country: restrictedCountry,
        }
      }

      return nextAddress
    })
  }

  const showHeaderFields = showAddressName || showPhone

  return (
    <Stack gap={resGap} w="100%" {...props}>
      {restrictedCountry && (
        <input type="hidden" name="country" value={restrictedCountry} />
      )}

      {showAutocomplete && (
        <AddressSuggestionInput
          onSelect={handleAutocompleteSelect}
          minEntry={addressSuggestionMinEntry}
          country={restrictedCountry}
          countryLabel={restrictedCountryLabel}
        />
      )}

      {showHeaderFields && (
        <SimpleGrid minChildWidth="xs" gap={resGap}>
          {showAddressName && (
            <FormInput
              inputName="name"
              value={formData?.name ?? ""}
              onChange={onChange}
              label={t("company-profile:address-name")}
              placeholder={t("company-profile:address-name-placeholder")}
              error={errors?.name}
              required={addressNameRequired}
            />
          )}
          {showPhone && (
            <PhoneInput
              error={errors?.phoneNumberAddress}
              label={t("profile:phone-number")}
              countryCodeValue={formData?.countryCodeAddress}
              phoneNumberValue={formData?.phoneNumberAddress}
              countryCodeName="countryCodeAddress"
              phoneNumberName="phoneNumberAddress"
              onChange={onChange}
              countryOptions={resolvedCountryOptions}
              required={phoneRequired}
            />
          )}
        </SimpleGrid>
      )}

      <SimpleGrid columns={{ base: 1, sm: 4 }} gapY={resGap} gapX="3" w="100%">
        <GridItem colSpan={{ base: 1, sm: 3 }}>
          <FormInput
            inputName="streetName"
            value={formData?.streetName ?? ""}
            onChange={onChange}
            label={t("company-profile:street-name")}
            placeholder={t("company-profile:street-name-placeholder")}
            error={errors?.streetName}
            required
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, sm: 1 }} minWidth="8rem">
          <FormInput
            inputName="houseNumber"
            value={formData?.houseNumber ?? ""}
            onChange={onChange}
            label={t("company-profile:house-number")}
            placeholder={t("company-profile:house-number-placeholder")}
            error={errors?.houseNumber}
          />
        </GridItem>
      </SimpleGrid>

      <FormInput
        inputName="addressExtra"
        value={formData?.addressExtra ?? ""}
        onChange={onChange}
        label={t("company-profile:address-extra")}
        placeholder={t("company-profile:address-extra-placeholder")}
        error={errors?.addressExtra}
      />

      <SimpleGrid minChildWidth="xs" gap={resGap}>
        <FormInput
          inputName="postalCode"
          value={formData?.postalCode ?? ""}
          onChange={onChange}
          label={t("company-profile:postal-code")}
          placeholder={t("company-profile:postal-code-placeholder")}
          error={errors?.postalCode}
          required
        />
        <FormInput
          inputName="city"
          value={formData?.city ?? ""}
          onChange={onChange}
          label={t("company-profile:city")}
          placeholder={t("company-profile:city-placeholder")}
          error={errors?.city}
          required
        />
      </SimpleGrid>

      <SimpleGrid minChildWidth="xs" gap={resGap}>
        <FormInput
          inputName="region"
          value={formData?.region ?? ""}
          onChange={onChange}
          label={t("company-profile:region")}
          placeholder={t("company-profile:region-placeholder")}
          error={errors?.region}
        />
        <FormSelect
          required
          inputName="country"
          value={restrictedCountry ?? formData?.country ?? ""}
          onChange={onChange}
          label={t("company-profile:country")}
          placeholder={t("company-profile:select-country")}
          error={errors?.country}
          readOnly={!!restrictedCountry}
          selectList={resolvedCountryOptions.map((item) => {
            return {
              value: item.iso2,
              label: item.country,
            }
          })}
        />
      </SimpleGrid>
    </Stack>
  )
}

export default AddressInput
