import { queryOptions } from "@tanstack/react-query"
import { api } from "@/utils/api"
import { country } from "@/utils/country"

export const dashboardOnboardingQueryKey = ["dashboardOnboarding"]
export const onboardingMetadataQueryKey = (countryCode) => [
  "dashboardOnboardingMetadata",
  countryCode,
]

// updates + patches company profile info
export async function updateCompanyOnboardingInfo(payload, page) {
  const res = await api.put("/api-user/company-onboarding", { [page]: payload })
  return res.data
}
// query for company onboarding data completion
export const dashboardOnboardingQuery = () =>
  queryOptions({
    queryKey: dashboardOnboardingQueryKey,
    retry: false,
    queryFn: async () => {
      try {
        const res = await api.get("/api-user/company-onboarding")
        return res.data
      } catch {
        return null
      }
    },
  })

// query for company onboarding metadata when selected country changes
export const dashboardOndoardingMetadataQuery = (countryCode) =>
  queryOptions({
    queryKey: onboardingMetadataQueryKey(countryCode),
    retry: false,
    queryFn: async () => {
      try {
        const res = await api.get("/api-user/company-onboarding/metadata", {
          params: { country_code: countryCode },
        })
        return res.data
      } catch {
        return null
      }
    },
  })
