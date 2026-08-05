import { t } from "@/utils/helper-i18n"
import {
  normalizeOptional,
  splitPhone,
  validateFields,
  validateName,
  validatePhone,
} from "@/utils/validators"

export const EMPTY_ADDRESS_FORM = {
  name: "",
  streetName: "",
  houseNumber: "",
  addressExtra: "",
  city: "",
  region: "",
  postalCode: "",
  country: "",
  countryCodeAddress: "",
  phoneNumberAddress: "",
  copyToOtherAddress: false,
}

export const mapAddressToForm = (address) => {
  if (!address) return EMPTY_ADDRESS_FORM

  const phoneParts = splitPhone(address?.phone ?? "")

  return {
    name: address.name ?? "",
    streetName: address.street ?? "",
    houseNumber: address.house_number ?? "",
    addressExtra: address.address_extra ?? "",
    city: address.city ?? "",
    region: address.region ?? "",
    postalCode: address.postal_code ?? "",
    country: address.country_code ?? "",
    countryCodeAddress: phoneParts.country_code,
    phoneNumberAddress: phoneParts.phone_number,
    copyToOtherAddress: false,
  }
}

export const addressesFieldMap = {
  name: "name",
  phone: "phoneNumber",
  street: "streetName",
  house_number: "houseNumber",
  address_extra: "addressExtra",
  postal_code: "postalCode",
  city: "city",
  region: "region",
  country_code: "country",
}

export const getAddressPayloadAndErrors = (formData) => {
  const name = formData.get("name")
  const country_code = formData.get("countryCodeAddress")
  const phone_number = formData.get("phoneNumberAddress")
  const street = formData.get("streetName")
  const house_number = formData.get("houseNumber")
  const address_extra = formData.get("addressExtra")
  const postal_code = formData.get("postalCode")
  const city = formData.get("city")
  const region = formData.get("region")
  const country = formData.get("country")

  const errors = validateFields({
    name: () =>
      validateName(name, t("company-profile:address-name"), 2, 255, true),
    phoneNumberAddress: () =>
      validatePhone(
        phone_number,
        country_code,
        t("profile:phone-number"),
        5,
        25,
        true,
      ),
    streetName: () =>
      validateName(street, t("company-profile:street-name"), 2, 255),
    houseNumber: () =>
      validateName(
        house_number,
        t("company-profile:house-number"),
        1,
        30,
        true,
      ),
    addressExtra: () =>
      validateName(
        address_extra,
        t("company-profile:address-extra"),
        2,
        255,
        true,
      ),
    postalCode: () =>
      validateName(postal_code, t("company-profile:postal-code"), 2, 30),
    city: () => validateName(city, t("company-profile:city"), 2, 120),
    region: () =>
      validateName(region, t("company-profile:region"), 2, 120, true),
  })

  const payload = {
    name: normalizeOptional(name),
    phone: normalizeOptional(phone_number)
      ? `${country_code} ${phone_number}`
      : null,
    street,
    house_number: normalizeOptional(house_number),
    address_extra: normalizeOptional(address_extra),
    postal_code,
    city,
    region: normalizeOptional(region),
    country_code: country,
  }

  return { payload, errors }
}
