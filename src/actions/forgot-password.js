import { redirect } from "react-router"

import { toaster } from "@/components/ui/toaster"
import { api } from "@/utils/api"
import { loadNamespaces, t } from "@/utils/helper-i18n"
import {
  validateEmail,
  validateFields,
  validatePasswordPair,
} from "@/utils/validators"

export const forgotPasswordAction = async ({ request }) => {
  const formData = await request.formData()
  await loadNamespaces(["validators", "common"])
  const email = formData.get("email")

  const errors = validateFields({
    email: () => validateEmail(email),
  })

  if (errors) {
    return {
      errors,
    }
  }
  try {
    const res = await api.post("/auth/forgot-password", { email })
    toaster.create({
      title: t("common:reset-password-email-sent"),
      type: "success",
      duration: 8000,
      description: `${t("common:we-sent-password-reset-email-to")} ${email}. ${res.data?.message}`,
    })
    return { ok: true, email, message: res.data?.message }
  } catch (error) {
    const msg = error?.message || t("common:reset-password-failed")
    return {
      errors: { form: msg },
    }
  }
}

export const resetPasswordAction = async ({ request, params }) => {
  const formData = await request.formData()
  await loadNamespaces(["validators", "common"])

  const token = formData.get("token")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")

  const errors = validateFields({
    password: () => validatePasswordPair(password, confirmPassword),
  })

  if (errors) {
    return {
      errors,
    }
  }

  try {
    await api.post("/auth/reset-password", {
      token,
      new_password: password,
    })

    toaster.create({
      title: t("common:password-reset-success"),
      type: "success",
      duration: 8000,
      description: t("common:your-password-has-been-reset"),
    })

    return redirect(`/${params.lang}/login`)
  } catch (error) {
    const msg = error?.message || t("common:password-reset-failed")
    return {
      errors: { form: msg },
    }
  }
}
