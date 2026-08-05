import { redirect } from "react-router"

import {
  addressesFieldMap,
  getAddressPayloadAndErrors,
} from "@/components/form/util/address-input"
import {
  changePasswordFieldMap,
  companyProfileFieldMap,
  userProfileFieldMap,
} from "@/pages/dashboard-pages/profile/util/profile"
import { toaster } from "@/components/ui/toaster"
import {
  companyAddressQueryKey,
  companyDetailsQueryKey,
  companyProfileQuery,
  sessionQuery,
  updateCompanyAddress,
  updateCompanyProfile,
  updateProfile,
} from "@/queries/profile-queries"
import { api } from "@/utils/api"
import { loadNamespaces, t } from "@/utils/helper-i18n"
import {
  mapBackendFieldErrors,
  normalizeOptional,
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordPair,
  validatePhone,
  validateFields,
} from "@/utils/validators"

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
    await loadNamespaces(["validators", "company-profile", "dashboard"])

    const display_name = formData.get("displayName")
    const legal_name = formData.get("legalName")
    const company_location_code = formData.get("country")
    const document_language = formData.get("documentLanguage")
    const vat_number = formData.get("vatNumber")
    const vat_number_label = formData.get("vatNumberLabel")
    const vat_number_required = formData.get("vatNumberRequired") === "true"
    const legal_id = formData.get("legalId")
    const legal_id_label = formData.get("legalIdLabel")
    const legal_id_required = formData.get("legalIdRequired") === "true"
    const billing_email = formData.get("billingEmail")
    const country_code = formData.get("countryCode")
    const phone_number = formData.get("phoneNumber")
    const timezone = formData.get("timezone")
    const currency = formData.get("currency")

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
        validateName(legal_name, t("company-profile:legal-name"), 2, 255),
      vatNumber: () =>
        validateName(
          vat_number,
          vat_number_label || t("company-profile:vat-number"),
          5,
          100,
          !vat_number_required,
        ),
      legalId: () =>
        validateName(
          legal_id,
          legal_id_label || "Legal ID",
          2,
          100,
          !legal_id_required,
        ),
      timezone: () =>
        validateName(
          timezone,
          t("dashboard:onboarding-preferences-timezone-label"),
          2,
          100,
        ),
      currency: () =>
        validateName(
          currency,
          t("dashboard:onboarding-preferences-currency-label"),
          2,
          20,
        ),
      phoneNumber: () =>
        validatePhone(
          phone_number,
          country_code,
          t("company-profile:company-phone"),
          5,
          25,
          true,
        ),
      billingEmail: () => validateEmail(billing_email),
    })

    if (errors) {
      return { errors }
    }
    const newPhoneNumber = normalizeOptional(phone_number)
      ? `${country_code} ${phone_number}`
      : null

    const payload = {
      display_name: normalizeOptional(display_name),
      legal_name,
      company_location_code,
      document_language,
      vat_number: normalizeOptional(vat_number),
      legal_id: normalizeOptional(legal_id),
      phone: newPhoneNumber,
      billing_email,
      timezone,
      currency,
    }
    try {
      const response = await updateCompanyProfile(payload)

      queryClient.setQueryData(companyDetailsQueryKey, () => response)
      queryClient.setQueryData(["session"], (prev) => {
        if (!prev) return prev

        return {
          ...prev,
          company: {
            ...prev.company,
            ...response,
          },
        }
      })
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
    await loadNamespaces(["validators", "company-profile", "profile"])

    const copyToOtherAddress = formData.get("copyToOtherAddress") === "on"
    const { payload, errors } = getAddressPayloadAndErrors(formData)

    if (errors) {
      return { errors }
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
          addressesFieldMap,
          t("company-profile:company-address-update-failed"),
        ),
      }
    }
  }
