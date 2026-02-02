import { validateEmail, validateFields } from "../utils/validators"
import { api } from "../utils/api"
import { toaster } from "../components/ui/toaster"
import { loadNamespaces, t } from "../utils/helper-i18n"

export const resendEmailVerificationAction = async ({ request }) => {
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
    const res = await api.post("/auth/resend-confirmation", { email })
    toaster.create({
      title: t("resend-verification-email-succ", { ns: "common" }),
      type: "success",
      duration: 8000,
      description: `${t("we-resent-email-to", { ns: "common" })} ${email}. ${res.data?.message}`,
    })
    return { ok: true, email, message: res.data?.message }
  } catch (error) {
    const msg =
      error?.response?.data?.detail || t("resend-failed", { ns: "common" })
    return {
      errors: { form: msg },
    }
  }
}
