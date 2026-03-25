import { checkAdmin } from "./auth"
import {
  companyAddressesQuery,
  companyProfileQuery,
} from "../queries/profile-queries"

export const companyProfileLoader = (queryClient) => async (args) => {
  await checkAdmin(queryClient)(args)
  await queryClient.ensureQueryData(companyProfileQuery())
  await queryClient.ensureQueryData(companyAddressesQuery())

  return null
}
