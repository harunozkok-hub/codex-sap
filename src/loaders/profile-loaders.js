import { requirePermissions } from "./auth"
import {
  companyProfileQuery,
  prefetchCompanyAddresses,
} from "../queries/profile-queries"

export const companyProfileLoader = (queryClient) => async (args) => {
  await requirePermissions(
    queryClient,
    ["company.read", "company.write", "company.manage"],
  )(args)
  await queryClient.ensureQueryData(companyProfileQuery())
  await prefetchCompanyAddresses(queryClient)

  return null
}
