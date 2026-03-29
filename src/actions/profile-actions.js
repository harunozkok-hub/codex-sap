import { toaster } from "../components/ui/toaster"
import { api } from "../utils/api"
import {
  validateFields,
  validateEmail,
  validateName,
  validatePhone,
  normalizeOptional,
  mapBackendFieldErrors,
  validatePassword,
  validatePasswordPair,
} from "../utils/validators"
import { t, loadNamespaces } from "../utils/helper-i18n"
import {
  companyProfileQuery,
  companyDetailsQueryKey,
  companyAddressQueryKey,
  sessionQuery,
  updateCompanyProfile,
  updateProfile,
  updateCompanyAddress,
} from "../queries/profile-queries"
import {
  userProfileFieldMap,
  companyProfileFieldMap,
  changePasswordFieldMap,
  companyAddressesFieldMap,
} from "../dashboard-pages/profile/util/profile"
import { redirect } from "react-router"

export const changePasswordAction =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData()
    await loadNamespaces(["profile", "validators"])
    const currentPassword = formData.get("currentPassword")
    const newPassword = formData.get("newPassword")
    const repeatNewPassword = formData.get("repeatNewPassword")

    const errors = validateFields({
      currentPassword: () =>
        validatePassword(currentPassword, {
          minLength: 8,
          maxLength: 128,
        }),
      newPassword: () => validatePasswordPair(newPassword, repeatNewPassword),
    })
    if (errors) {
      return {
        errors,
      }
    }

    try {
      await api.put("/api-user/password-change", {
        password: currentPassword,
        new_password: newPassword,
      })

      await queryClient.invalidateQueries({ queryKey: ["session"] })

      toaster.create({
        title: t("profile:password-updated"),
        type: "success",
        duration: 6000,
        description: t("profile:your-password-has-been-updated"),
      })

      return redirect(`/${params.lang}/login`)
    } catch (err) {
      const msg = err?.message || t("profile:password-change-failed-please-")

      return {
        errors: mapBackendFieldErrors(
          msg,
          changePasswordFieldMap,
          t("profile:password-change-failed-please-"),
        ),
      }
    }
  }

export const editUserProfileAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    await loadNamespaces(["validators", "profile"])

    const first_name = formData.get("firstName")
    const last_name = formData.get("lastName")
    const job_title = formData.get("jobTitle")
    const country_code = formData.get("countryCode")
    const phone_number = formData.get("phoneNumber")
    const newsletter = formData.get("newsletter") === "on"

    const errors = validateFields({
      firstName: () =>
        validateName(first_name, t("first-name", { ns: "profile" }), 2, 100),
      lastName: () =>
        validateName(last_name, t("last-name", { ns: "profile" }), 2, 100),
      jobTitle: () =>
        validateName(
          job_title,
          t("job-title", { ns: "profile" }),
          2,
          100,
          true,
        ),
      phoneNumber: () =>
        validatePhone(
          phone_number,
          country_code,
          t("phone-number", { ns: "profile" }),
          5,
          25,
          true,
        ),
    })

    if (errors) {
      return { errors }
    }
    const newPhoneNumber = normalizeOptional(phone_number)
      ? `${country_code} ${phone_number}`
      : null

    const payload = {
      first_name,
      last_name,
      job_title: normalizeOptional(job_title),
      phone: newPhoneNumber,
      newsletter,
    }
    try {
      const response = await updateProfile(payload)

      queryClient.setQueryData(["session"], () => response)
      await queryClient.ensureQueryData(sessionQuery())

      toaster.create({
        title: t("profile-update-success", { ns: "profile" }),
        type: "success",
        duration: 6000,
        description: t("profile-informations-updated-s", { ns: "profile" }),
      })

      return null
    } catch (err) {
      const msg =
        err?.message || t("updating-profile-failed-please", { ns: "profile" })
      return {
        errors: mapBackendFieldErrors(
          msg,
          userProfileFieldMap,
          t("updating-profile-failed-please", { ns: "profile" }),
        ),
      }
    }
  }

export const editCompanyProfileAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    await loadNamespaces(["validators", "company-profile"])

    const display_name = formData.get("displayName")
    const legal_name = formData.get("legalName")
    const vat_number = formData.get("vatNumber")
    const billing_email = formData.get("billingEmail")
    const country_code = formData.get("countryCode")
    const phone_number = formData.get("phoneNumber")

    const errors = validateFields({
      displayName: () =>
        validateName(
          display_name,
          t("company-profile:display-name"),
          2,
          255,
          true,
        ),
      legalName: () =>
        validateName(legal_name, t("company-profile:legal-name"), 2, 255, true),
      vatNumber: () =>
        validateName(vat_number, t("company-profile:vat-number"), 2, 100, true),
      phoneNumber: () =>
        validatePhone(
          phone_number,
          country_code,
          t("company-profile:company-phone"),
          5,
          25,
          true,
        ),
      billingEmail: () => validateEmail(billing_email, true),
    })

    if (errors) {
      return { errors }
    }
    const newPhoneNumber = normalizeOptional(phone_number)
      ? `${country_code} ${phone_number}`
      : null

    const payload = {
      display_name: normalizeOptional(display_name),
      legal_name: normalizeOptional(legal_name),
      vat_number: normalizeOptional(vat_number),
      phone: newPhoneNumber,
      billing_email: normalizeOptional(billing_email),
    }
    try {
      const response = await updateCompanyProfile(payload)

      queryClient.setQueryData(companyDetailsQueryKey, () => response)
      await queryClient.ensureQueryData(companyProfileQuery())

      toaster.create({
        title: t("company-profile:company-profile-update-success"),
        type: "success",
        duration: 6000,
        description: t("company-profile:company-profile-updated-succes"),
      })

      return null
    } catch (err) {
      const msg =
        err?.message || t("company-profile:company-profile-update-failed")
      return {
        errors: mapBackendFieldErrors(
          msg,
          companyProfileFieldMap,
          t("company-profile:company-profile-update-failed"),
        ),
      }
    }
  }

export const editCompanyAddressAction =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData()
    await loadNamespaces(["validators", "company-profile"])

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
    const copyToOtherAddress = formData.get("copyToOtherAddress") === "on"

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

    if (errors) {
      return { errors }
    }
    const newPhoneNumber = normalizeOptional(phone_number)
      ? `${country_code} ${phone_number}`
      : null

    const payload = {
      name: normalizeOptional(name),
      phone: newPhoneNumber,
      street,
      house_number: normalizeOptional(house_number),
      address_extra: normalizeOptional(address_extra),
      postal_code,
      city,
      region: normalizeOptional(region),
      country_code: country,
    }

    try {
      const response = await updateCompanyAddress(payload, params.type)
      const otherAddressType = params.type === "hq" ? "billing" : "hq"
      const currentAddressLabel = t(`company-profile:${params.type}-address`)
      const otherAddressLabel = t(`company-profile:${otherAddressType}-address`)

      queryClient.setQueryData(companyAddressQueryKey(params.type), response)
      if (copyToOtherAddress) {
        const secondResponse = await updateCompanyAddress(
          payload,
          otherAddressType,
        )

        queryClient.setQueryData(
          companyAddressQueryKey(otherAddressType),
          secondResponse,
        )
      }

      toaster.create({
        title: t("company-profile:company-address-update-success"),
        type: "success",
        duration: 6000,
        description: copyToOtherAddress
          ? t("company-profile:company-addresses-updated-successfully", {
              currentAddressLabel,
              otherAddressLabel,
            })
          : t("company-profile:company-address-updated-successfully", {
              currentAddressLabel,
            }),
      })

      return redirect("../")
    } catch (err) {
      const msg =
        err?.message || t("company-profile:company-address-update-failed")
      return {
        errors: mapBackendFieldErrors(
          msg,
          companyAddressesFieldMap,
          t("company-profile:company-address-update-failed"),
        ),
      }
    }
  }
