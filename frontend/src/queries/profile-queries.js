import { queryOptions } from "@tanstack/react-query"
import { api } from "../utils/api"

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
    queryFn: async () => {
      const res = await api.get("/api-user/companyaaa")
      return res.data
    },
  })

// query for company addresses
export const companyAddressesQuery = () =>
  queryOptions({
    queryKey: ["profile", "company-addresses"],
    queryFn: async () => {
      const res = await api.get("/api-user/company-addressesaaa")
      return res.data
    },
  })
