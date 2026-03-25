import { queryOptions } from "@tanstack/react-query"
import { api } from "../utils/api"
import { ok, fail } from "../utils/query-error-handler"

export const companyAddressesQueryKey = ["profile", "company-addresses"]
export const companyDetailsQueryKey = ["profile", "company-details"]

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
        return ok(res.data)
      } catch (err) {
        return fail(err)
      }
    },
  })

// updates + patches company profile info
export async function updateCompanyProfile(payload) {
  const res = await api.patch("/api-user/company", payload)
  return ok(res.data)
}

export async function deleteCompanyAddress(type) {
  const res = await api.delete(`/api-user/company-address/${type}`)
  return res.data
}

export function removeCompanyAddressFromCache(oldData, type) {
  if (!oldData?.ok || !oldData?.data) return oldData

  return {
    ...oldData,
    data: {
      ...oldData.data,
      [type]: null,
    },
  }
}

// query for company addresses
export const companyAddressesQuery = () =>
  queryOptions({
    queryKey: companyAddressesQueryKey,
    retry: false,
    queryFn: async () => {
      try {
        const res = await api.get("/api-user/company-addresses")
        return ok(res.data)
      } catch (err) {
        return fail(err)
      }
    },
  })
