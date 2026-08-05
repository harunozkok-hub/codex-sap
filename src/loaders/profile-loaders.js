import {
  companyProfileQuery,
  prefetchCompanyAddresses,
} from "@/queries/profile-queries"

import { requirePermissions } from "@/loaders/auth"

export const companyProfileLoader = (queryClient) => async (args) => {
  await requirePermissions(
    queryClient,
    ["company.read", "company.write", "company.manage"],
  )(args)
  await queryClient.ensureQueryData(companyProfileQuery())
  await prefetchCompanyAddresses(queryClient)

  return null
}
