import { checkAdmin } from "./auth"
import {
  companyAddressesQuery,
  companyProfileQuery,
} from "../queries/profile-queries"

export const companyProfileLoader = (queryClient) => async () => {
  checkAdmin(queryClient)

  try {
    await queryClient.ensureQueryData(companyProfileQuery())
    await queryClient.ensureQueryData(companyAddressesQuery())
    return { ok: true }
  } catch (err) {
    // thanks to your axios interceptor, err.message is already a nice string
    console.log("I am here ")
    return { ok: false, message: err?.message || "Failed to fetch data" }
  }
}
