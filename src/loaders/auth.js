import { redirect } from "react-router"

import { sessionQuery } from "@/queries/profile-queries"
import { api } from "@/utils/api"
import { loadNamespaces, t } from "@/utils/helper-i18n"
import { hasAnyPermission, hasModuleAccess } from "@/utils/menu-permissions"

export const homeLoader = (queryClient) => async () => {
  await queryClient.ensureQueryData(sessionQuery())
  return null
}

export async function confirmEmailLoader({ request }) {
  await loadNamespaces("common")
  const url = new URL(request.url)
  const token = url.searchParams.get("token")

  if (!token) {
    return { ok: false, message: t("missing-token", { ns: "common" }) }
  }

  try {
    const res = await api.get("/auth/confirm-email", { params: { token } })
    return {
      ok: true,
      message: res.data?.message || t("email-confirmed", { ns: "common" }),
    }
  } catch (err) {
    const status = err?.response?.status
    const msg =
      status === 410
        ? t("invalid-or-expired-link-email-", { ns: "common" })
        : status === 409
          ? t("email-already-verified", { ns: "common" })
          : t("confirmation-failed", { ns: "common" })
    return { ok: false, message: msg, status }
  }
}

export async function resetPasswordLoader({ request }) {
  await loadNamespaces("common")
  const url = new URL(request.url)
  const token = url.searchParams.get("token")
  if (!token) {
    return { ok: false, message: t("missing-token", { ns: "common" }) }
  }

  try {
    const res = await api.post("/auth/reset-password-token-check", { token })
    return { ok: true, message: res.data?.message || null }
  } catch (err) {
    const msg = err?.message || "Password reset link is either used or invalid"
    return { ok: false, message: msg }
  }
}

// Small helper: redirects to /:lang/dashboard (or /:lang if you prefer)
function denyRedirect(params, to = "dashboard") {
  const lang = params?.lang || "en"
  return redirect(`/${lang}/${to}`)
}

export function requireModulePerm(queryClient, moduleKey, options = {}) {
  const { redirectTo = "dashboard" } = options

  return async ({ params }) => {
    // Ensure we have session (cached or fetched)
    const session = await queryClient.ensureQueryData(sessionQuery())

    // Not logged in -> go login (include lang)
    if (!session) {
      const lang = params?.lang || "en"
      throw redirect(`/${lang}/login`)
    }

    const perms = session.permissions || []

    if (!hasModuleAccess(perms, moduleKey)) {
      throw denyRedirect(params, redirectTo)
    }

    return null
  }
}

export function requirePermissions(
  queryClient,
  requiredPermissions,
  options = {},
) {
  const { redirectTo = "dashboard" } = options

  return async ({ params }) => {
    const session = await queryClient.ensureQueryData(sessionQuery())

    if (!session) {
      const lang = params?.lang || "en"
      throw redirect(`/${lang}/login`)
    }

    const permissions = session.permissions || []

    if (!hasAnyPermission(permissions, requiredPermissions)) {
      throw denyRedirect(params, redirectTo)
    }

    return null
  }
}
