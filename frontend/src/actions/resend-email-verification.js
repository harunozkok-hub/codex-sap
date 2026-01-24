import { redirect } from "react-router"
import { validateEmail, validateFields } from "../utils/validators"
import { api } from "../utils/api"
import { toaster } from "../components/ui/toaster"

export const resendEmailVerificationAction = async ({ request }) => {
  const formData = await request.formData()
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
      title: "Resend Verification Email Success",
      type: "success",
      duration: 8000,
      description: `We resent email to: ${email}. ${res.data?.message}`,
    })
    return { ok: true, email, message: res.data?.message }
  } catch (error) {
    const msg = error?.response?.data?.detail || "Resend failed"
    return {
      errors: { form: msg },
    }
  }
}
