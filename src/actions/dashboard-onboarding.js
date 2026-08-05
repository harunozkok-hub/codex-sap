import { redirect } from "react-router"

import {
  addressesFieldMap,
  getAddressPayloadAndErrors,
} from "@/components/form/util/address-input"
import {
  dashboardOnboardingQuery,
  updateCompanyOnboardingInfo,
} from "@/queries/dashboard-queries"
import { loadNamespaces, t } from "@/utils/helper-i18n"
import {
  companyContextMap,
  companyLegalInfoMap,
  companyPreferencesMap,
  mapCompanyLegalInfoToForm,
} from "@/pages/dashboard-onboarding/util/dashboard-onboarding"
import {
  validateFields,
  validateName,
  mapBackendFieldErrors,
  validateEmail,
  normalizeOptional,
} from "@/utils/validators"

export const countryContextAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    await loadNamespaces(["validators", "common", "dashboard"])
    const oldQueryData = await queryClient.ensureQueryData(
      dashboardOnboardingQuery(),
    )

    const company_location_code = formData.get("country")
    const document_language = formData.get("documentLanguage")
    const isDirty = formData.get("isDirty") === "true"
    const savedCountry = normalizeOptional(
      oldQueryData?.company?.company_location_code,
    )
    const savedDocumentLanguage = normalizeOptional(
      oldQueryData?.company?.document_language,
    )
    const submittedCountry = normalizeOptional(company_location_code)
    const submittedDocumentLanguage = normalizeOptional(document_language)
    const contextAlreadySynced =
      savedCountry === submittedCountry &&
      savedDocumentLanguage === submittedDocumentLanguage

    if (!isDirty && contextAlreadySynced) {
      return redirect("../company-legal-info")
    }

    const errors = validateFields({
      country: () =>
        validateName(
          company_location_code,
          t("dashboard:onboarding-company-context-country-label"),
          2,
          5,
        ),
      documentLanguage: () =>
        validateName(
          document_language,
          t("dashboard:onboarding-company-context-document-language-label"),
          2,
          5,
        ),
    })

    if (errors) {
      return {
        errors,
      }
    }

    const payload = { company_location_code, document_language }

    try {
      const response = await updateCompanyOnboardingInfo(payload, "context")
      queryClient.setQueryData(["dashboardOnboarding"], () => response)
      await queryClient.ensureQueryData(dashboardOnboardingQuery())

      return redirect("../company-legal-info")
    } catch (err) {
      const msg =
        err?.message || t("dashboard:onboarding-company-context-update-failed")

      return {
        errors: mapBackendFieldErrors(
          msg,
          companyContextMap,
          t("dashboard:onboarding-company-context-update-failed"),
        ),
      }
    }
  }

export const companyLegalInfoAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    await loadNamespaces([
      "validators",
      "common",
      "company-profile",
      "dashboard",
    ])

    const oldQueryData = await queryClient.ensureQueryData(
      dashboardOnboardingQuery(),
    )
    const countryMetaData = mapCompanyLegalInfoToForm(oldQueryData)

    const legal_name = formData.get("legalName")
    const billing_email = formData.get("billingEmail")
    const legal_id = countryMetaData.legalIdRequired
      ? formData.get("legalId")
      : null
    const vat_number = formData.get("vatNumber")

    const isDirty = formData.get("isDirty") === "true"

    if (!isDirty) {
      return redirect("../company-address")
    }

    const errors = validateFields({
      legalName: () =>
        validateName(legal_name, t("company-profile:legal-name"), 2, 255),
      billingEmail: () => validateEmail(billing_email),
      vatNumber: () =>
        validateName(
          vat_number,
          countryMetaData.vatNumberLabel || t("company-profile:vat-number"),
          5,
          100,
          !countryMetaData.vatNumberRequired,
        ),
      legalId: () =>
        countryMetaData.legalIdRequired
          ? validateName(legal_id, countryMetaData.legalIdLabel, 2, 100)
          : null,
    })

    if (errors) {
      return {
        errors,
      }
    }

    const payload = {
      legal_name,
      billing_email,
      legal_id,
      vat_number: countryMetaData.vatNumberRequired
        ? vat_number
        : normalizeOptional(vat_number),
    }

    try {
      const response = await updateCompanyOnboardingInfo(payload, "legal_info")
      queryClient.setQueryData(["dashboardOnboarding"], () => response)
      await queryClient.ensureQueryData(dashboardOnboardingQuery())

      return redirect("../company-address")
    } catch (err) {
      const fallbackMessage = t(
        "dashboard:onboarding-company-legal-update-failed",
      )
      const msg = err?.message || fallbackMessage

      return {
        errors: mapBackendFieldErrors(
          msg,
          companyLegalInfoMap,
          fallbackMessage,
        ),
      }
    }
  }

export const companyAddressesAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    await loadNamespaces([
      "validators",
      "company-profile",
      "profile",
      "dashboard",
    ])

    const isDirty = formData.get("isDirty") === "true"
    const billing_same_as_hq =
      formData.get("billingAddressMode") === "use-hq-address"

    if (!isDirty) {
      return redirect("../preferences")
    }

    const { payload, errors } = getAddressPayloadAndErrors(formData)

    if (errors) {
      return { errors }
    }

    try {
      const response = await updateCompanyOnboardingInfo(
        { hq: payload, billing_same_as_hq },
        "addresses",
      )
      queryClient.setQueryData(["dashboardOnboarding"], () => response)
      await queryClient.ensureQueryData(dashboardOnboardingQuery())

      return redirect("../preferences")
    } catch (err) {
      const fallbackMessage = t(
        "dashboard:onboarding-company-address-update-failed",
      )
      const msg = err?.message || fallbackMessage
      const fieldMap = { addresses: { hq: addressesFieldMap } }

      return {
        errors: mapBackendFieldErrors(msg, fieldMap, fallbackMessage),
      }
    }
  }

export const companyPreferencesAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    await loadNamespaces(["validators", "common", "dashboard"])
    const oldQueryData = await queryClient.ensureQueryData(
      dashboardOnboardingQuery(),
    )

    const timezone = formData.get("timezone")
    const currency = formData.get("currency")
    const isDirty = formData.get("isDirty") === "true"

    const submittedTimezone = normalizeOptional(timezone)
    const submittedCurrency = normalizeOptional(currency)
    const savedTimezone = normalizeOptional(oldQueryData?.company?.timezone)
    const savedCurrency = normalizeOptional(oldQueryData?.company?.currency)
    const preferencesAlreadySynced =
      savedTimezone === submittedTimezone && savedCurrency === submittedCurrency

    if (!isDirty && preferencesAlreadySynced) {
      return redirect("../done")
    }

    const errors = validateFields({
      timezone: () =>
        validateName(
          timezone,
          t("dashboard:onboarding-preferences-timezone-label"),
          5,
          64,
        ),
      currency: () =>
        validateName(
          currency,
          t("dashboard:onboarding-preferences-currency-label"),
          2,
          3,
        ),
    })

    if (errors) {
      return { errors }
    }

    const payload = {
      timezone: submittedTimezone,
      currency: submittedCurrency,
    }

    try {
      const response = await updateCompanyOnboardingInfo(payload, "preferences")
      queryClient.setQueryData(["dashboardOnboarding"], () => response)
      await queryClient.ensureQueryData(dashboardOnboardingQuery())

      return redirect("../done")
    } catch (err) {
      const fallbackMessage = t(
        "dashboard:onboarding-company-preferences-update-failed",
      )
      const msg = err?.message || fallbackMessage

      return {
        errors: mapBackendFieldErrors(
          msg,
          companyPreferencesMap,
          fallbackMessage,
        ),
      }
    }
  }

export const completeOnboardingAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    await loadNamespaces(["validators", "common", "dashboard"])

    const onboarding_complete = formData.get("informationVerified") === "on"

    const errors = validateFields({
      informationVerified: () =>
        !onboarding_complete
          ? t("dashboard:onboarding-done-information-verified-error")
          : null,
    })

    if (errors) {
      return {
        errors,
      }
    }
    const payload = onboarding_complete

    try {
      const response = await updateCompanyOnboardingInfo(
        payload,
        "onboarding_complete",
      )
      queryClient.setQueryData(["dashboardOnboarding"], () => response)
      await queryClient.ensureQueryData(dashboardOnboardingQuery())

      return redirect("../../dashboard")
    } catch (err) {
      const fallbackMessage = t("common:something-went-wrong")
      const msg = err?.message || fallbackMessage

      return {
        errors: mapBackendFieldErrors(msg, {}, fallbackMessage),
      }
    }
  }
