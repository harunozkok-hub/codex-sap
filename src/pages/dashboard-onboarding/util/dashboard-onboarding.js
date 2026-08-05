export const mapCompanyContextToForm = (dashboardOnboardingItem) => {
  return {
    country: dashboardOnboardingItem?.company?.company_location_code ?? "",
    documentLanguage: dashboardOnboardingItem?.company?.document_language ?? "",
  }
}

export const companyContextMap = {
  context: {
    company_location_code: "country",
    document_language: "documentLanguage",
  },
}

export const mapCompanyLegalInfoToForm = (dashboardOnboardingItem) => {
  return {
    name: dashboardOnboardingItem?.company?.name ?? "",
    legalName: dashboardOnboardingItem?.company?.legal_name ?? "",
    billingEmail: dashboardOnboardingItem?.company?.billing_email ?? "",
    legalId: dashboardOnboardingItem?.company?.legal_id ?? "",
    legalIdLabel:
      dashboardOnboardingItem?.country_metadata?.legal_id_label ?? "",
    legalIdPlaceholder:
      dashboardOnboardingItem?.country_metadata?.legal_id_placeholder ?? "",
    legalIdRequired:
      dashboardOnboardingItem?.country_metadata?.legal_id_required ?? "",
    vatNumber: dashboardOnboardingItem?.company?.vat_number ?? "",
    vatNumberLabel:
      dashboardOnboardingItem?.country_metadata?.vat_number_label ?? "",
    vatNumberPlaceholder:
      dashboardOnboardingItem?.country_metadata?.vat_number_placeholder ?? "",
    vatNumberRequired:
      dashboardOnboardingItem?.country_metadata?.vat_number_required ?? "",
  }
}

export const companyLegalInfoMap = {
  legal_info: {
    legal_name: "legalName",
    billing_email: "billingEmail",
    legal_id: "legalId",
    vat_number: "vatNumber",
  },
}

export const mapPreferencesToForm = (dashboardOnboardingItem) => {
  return {
    timezone:
      dashboardOnboardingItem?.company?.timezone ??
      dashboardOnboardingItem?.country_metadata?.default_timezone ??
      "",
    currency:
      dashboardOnboardingItem?.company?.currency ??
      dashboardOnboardingItem?.country_metadata?.default_currency ??
      "",
  }
}

export const companyPreferencesMap = {
  preferences: {
    timezone: "timezone",
    currency: "currency",
  },
}
