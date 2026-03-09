import { queryOptions } from "@tanstack/react-query"
import { api } from "../utils/api"
import { ok, fail } from "../utils/query-error-handler"

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
    queryKey: ["profile", "company-details"],
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

// query for company addresses
export const companyAddressesQuery = () =>
  queryOptions({
    queryKey: ["profile", "company-addresses"],
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
