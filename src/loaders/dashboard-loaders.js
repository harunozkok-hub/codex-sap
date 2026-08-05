import { redirect } from "react-router"
import { sessionQuery } from "@/queries/profile-queries"
import { dashboardOnboardingQuery } from "@/queries/dashboard-queries"
import { hasAnyPermission } from "@/utils/menu-permissions"

async function getDashboardAccessContext(queryClient) {
  const profile = await queryClient.ensureQueryData(sessionQuery())

  if (!profile) {
    return { profile: null, onboarding: null, onboardingComplete: false }
  }

  const onboarding = await queryClient.ensureQueryData(dashboardOnboardingQuery())
  const onboardingComplete = !!onboarding?.onboarding_complete

  return { profile, onboarding, onboardingComplete }
}

export const dashboardLoader =
  (queryClient) =>
  async ({ params }) => {
    const { profile, onboardingComplete } = await getDashboardAccessContext(
      queryClient,
    )

    if (!profile) {
      throw redirect(`/${params.lang}/login`)
    }

    if (!onboardingComplete) {
      throw redirect(`/${params.lang}/dashboard-onboarding`)
    }

    return null
  }

export const dashboardOnboardingLoader = (queryClient) => async (args) => {
  const { params, request } = args
  const { profile, onboarding, onboardingComplete } = await getDashboardAccessContext(
    queryClient,
  )

  if (!profile) {
    throw redirect(`/${params.lang}/login`)
  }

  if (onboardingComplete) {
    throw redirect(`/${params.lang}/dashboard`)
  }

  const canManageOnboarding = hasAnyPermission(profile.permissions || [], [
    "company.manage",
  ])

  const pathname = new URL(request.url).pathname
  const isFallbackRoute = pathname.endsWith("/dashboard-onboarding/access-required")

  if (!canManageOnboarding && !isFallbackRoute) {
    throw redirect(`/${params.lang}/dashboard-onboarding/access-required`)
  }

  if (canManageOnboarding && isFallbackRoute) {
    throw redirect(`/${params.lang}/dashboard-onboarding/welcome`)
  }

  const getNextOnboardingPath = () => {
    if (!onboarding?.company?.company_location_code) {
      return "welcome"
    }

    if (!onboarding?.company?.legal_name) {
      return "company-legal-info"
    }

    if (!onboarding?.addresses?.hq?.street) {
      return "company-address"
    }

    if (!onboarding?.company?.currency) {
      return "preferences"
    }

    return "done"
  }

  const onboardingRootPath = `/${params.lang}/dashboard-onboarding`
  const isOnboardingIndexRoute =
    pathname === onboardingRootPath || pathname === `${onboardingRootPath}/`

  if (canManageOnboarding && isOnboardingIndexRoute) {
    throw redirect(`/${params.lang}/dashboard-onboarding/${getNextOnboardingPath()}`)
  }

  return null
}
