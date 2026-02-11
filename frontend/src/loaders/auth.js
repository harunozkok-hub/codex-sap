import { redirect } from "react-router"
import { sessionQuery } from "../queries/profile-queries"
import { api } from "../utils/api"

export const homeLoader = (queryClient) => async () => {
  await queryClient.ensureQueryData(sessionQuery())
  return null
}

export const requireAuthLoader =
  (queryClient) =>
  async ({ params }) => {
    const profile = await queryClient.ensureQueryData(sessionQuery())

    if (!profile) {
      // ✅ keep language in redirect
      throw redirect(`/${params.lang}/login`)
    }

    return null
  }
export async function confirmEmailLoader({ request }) {
  const url = new URL(request.url)
  const token = url.searchParams.get("token")

  if (!token) {
    return { ok: false, message: "Missing token" }
  }

  try {
    const res = await api.get("/auth/confirm-email", { params: { token } })
    return { ok: true, message: res.data?.message || "Email confirmed" }
  } catch (err) {
    const status = err?.response?.status
    const msg =
      status === 401
        ? "Invalid or expired link - Email verification link may be expired!"
        : status === 409
          ? "Email already verified"
          : "Confirmation failed"
    return { ok: false, message: msg, status }
  }
}

export const checkAdmin =
  (queryClient) =>
  async ({ params }) => {
    const profile = await queryClient.ensureQueryData(sessionQuery())

    if (profile.role !== "admin") {
      throw redirect(`/${params.lang}/dashboard`)
    }
    return null
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

    // Admin bypass if you want:
    if (session.role === "admin") return null

    const perms = session.permissions || []

    // Optional: wildcard support
    if (perms.includes("*")) return null

    if (!perms.includes(moduleKey)) {
      throw denyRedirect(params, redirectTo)
    }

    return null
  }
}
