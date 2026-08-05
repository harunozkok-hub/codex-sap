import { queryOptions } from "@tanstack/react-query"

import { api } from "@/utils/api"

export const companyHQAddressQueryKey = ["profile", "company-addresses", "hq"]
export const companyBillingAddressQueryKey = [
  "profile",
  "company-addresses",
  "billing",
]
export const companyDetailsQueryKey = ["profile", "company-details"]

const defaultInvitationsQueryParams = {
  mine: false,
  used: null,
  search: "",
  page: 1,
  pageSize: 10,
}

export const invitationsQueryKey = (params = {}) => {
  const normalizedSearch =
    typeof params.search === "string" ? params.search.trim() : ""

  return [
    "profile",
    "invitations",
    {
      mine: params.mine ?? defaultInvitationsQueryParams.mine,
      used: params.used ?? defaultInvitationsQueryParams.used,
      search: normalizedSearch,
      page: params.page ?? defaultInvitationsQueryParams.page,
      pageSize: params.pageSize ?? defaultInvitationsQueryParams.pageSize,
    },
  ]
}

//query profile
export const sessionQuery = () =>
  queryOptions({
    queryKey: ["session"],
    queryFn: async () => {
      try {
        const res = await api.get("/api-user/profile")
        return res.data // profile object
      } catch (err) {
        const status = err?.response?.status
        if (status === 401 || status === 403 || status === 404) return null
        throw err
      }
    },
  })

// updates + patches user profile
export async function updateProfile(payload) {
  const res = await api.patch("/api-user/profile", payload)
  return res.data
}

// query for company profile
export const companyProfileQuery = () =>
  queryOptions({
    queryKey: companyDetailsQueryKey,
    retry: false,
    queryFn: async () => {
      try {
        const res = await api.get("/api-user/company")
        return res.data
      } catch {
        return null
      }
    },
  })

export const invitationsQuery = (params = {}) =>
  queryOptions({
    queryKey: invitationsQueryKey(params),
    retry: false,
    queryFn: async () => {
      try {
        const normalizedSearch =
          typeof params.search === "string" ? params.search.trim() : ""

        const res = await api.get("/api-user/invitations", {
          params: {
            mine: params.mine ?? defaultInvitationsQueryParams.mine,
            used: params.used ?? defaultInvitationsQueryParams.used,
            search: normalizedSearch || undefined,
            page: params.page ?? defaultInvitationsQueryParams.page,
            page_size: params.pageSize ?? defaultInvitationsQueryParams.pageSize,
          },
        })
        return res.data
      } catch {
        return null
      }
    },
  })

// updates + patches company profile info
export async function updateCompanyProfile(payload) {
  const res = await api.patch("/api-user/company", payload)
  return res.data
}
//resets company country + all information related + to redirect to onboarding page
export async function resetCompanyCountry() {
  const res = await api.post("/api-user/company-country-change-request")
  return res.data
}

// updates + patches company address info
export async function updateCompanyAddress(payload, type) {
  const res = await api.put(`/api-user/company-address/${type}`, payload)
  return res.data
}

export async function deleteCompanyAddress(type) {
  const res = await api.delete(`/api-user/company-address/${type}`)
  return res.data
}

const fetchCompanyAddresses = async () => {
  const res = await api.get("/api-user/company-addresses")
  return res.data
}

export const companyAddressQueryKey = (type) =>
  type === "billing" ? companyBillingAddressQueryKey : companyHQAddressQueryKey

export async function prefetchCompanyAddresses(queryClient) {
  const data = await fetchCompanyAddresses()

  queryClient.setQueryData(companyHQAddressQueryKey, data?.hq ?? null)
  queryClient.setQueryData(companyBillingAddressQueryKey, data?.billing ?? null)

  return data
}

export const companyAddressQuery = (type) =>
  queryOptions({
    queryKey: companyAddressQueryKey(type),
    retry: false,
    queryFn: async () => {
      try {
        const data = await fetchCompanyAddresses()
        return data?.[type] ?? null
      } catch {
        return null
      }
    },
  })
