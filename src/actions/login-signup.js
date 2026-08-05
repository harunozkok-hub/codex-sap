import { redirect } from "react-router"

import {
  loginFieldMap,
  signupFieldMap,
} from "@/pages/dashboard-pages/profile/util/profile"
import { toaster } from "@/components/ui/toaster"
import { api } from "@/utils/api"
import { loadNamespaces, t } from "@/utils/helper-i18n"
import {
  mapBackendFieldErrors,
  validateEmail,
  validateFields,
  validateName,
  validatePasswordPair,
} from "@/utils/validators"

export const signupAction = async ({ request }) => {
  const formData = await request.formData()
  await loadNamespaces(["profile", "validators", "common"])

  const companyName = formData.get("companyName")
  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const email = formData.get("email")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")
  const newsletter = formData.get("newsletter") === "newsletter"
  const acceptTerms = formData.get("acceptTerms") === "acceptTerms"

  const errors = validateFields({
    companyName: () =>
      validateName(companyName, t("company-name", { ns: "profile" }), 5, 100),
    firstName: () =>
      validateName(firstName, t("first-name", { ns: "profile" }), 2, 100),
    lastName: () =>
      validateName(lastName, t("last-name", { ns: "profile" }), 2, 100),
    email: () => validateEmail(email),
    password: () => validatePasswordPair(password, confirmPassword),
    acceptTerms: () =>
      !acceptTerms
        ? t("please-accept-terms-and-condit", { ns: "common" })
        : null,
  })

  if (errors) {
    return {
      errors,
    }
  }

  try {
    await api.post("/auth/register-company", {
      company_name: companyName,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      newsletter,
      accept_terms: acceptTerms,
    })

    return { ok: true, email }
  } catch (err) {
    const msg = err?.message || t("signup-failed", { ns: "common" })

    return {
      errors: mapBackendFieldErrors(
        msg,
        signupFieldMap,
        t("signup-failed", { ns: "common" }),
      ),
    }
  }
}

export const loginAction =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData()
    await loadNamespaces(["validators", "common"])

    const email = formData.get("email")
    const password = formData.get("password")

    const errors = validateFields({
      email: () => validateEmail(email),
      password: () => validateName(password, t("common:password"), 8, 128),
    })

    if (errors) {
      return {
        errors,
      }
    }

    try {
      const body = new URLSearchParams()
      body.set("username", email)
      body.set("password", password)

      await api.post("/auth/login", body, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      await queryClient.invalidateQueries({ queryKey: ["session"] })

      toaster.create({
        title: t("common:login-success"),
        type: "success",
        duration: 6000,
        description: t("common:logged-in-successfully"),
      })
      sessionStorage.removeItem("pending_signup_email")

      return redirect(`/${params.lang}/dashboard`)
    } catch (err) {
      const status = err?.response?.status
      const msg = err?.message || t("common:login-failed")

      const needsVerification = status === 403

      return {
        errors: mapBackendFieldErrors(
          msg,
          loginFieldMap,
          t("common:login-failed"),
        ),
        needsVerification,
        email,
      }
    }
  }

export const logoutAction =
  (queryClient) =>
  async ({ params }) => {
    try {
      await api.post("/auth/logout")
    } catch (e) {
      // ignore
    }
    queryClient.invalidateQueries(["session"])
    return redirect(`/${params.lang}`)
  }
