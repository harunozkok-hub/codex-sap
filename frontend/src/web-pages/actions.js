import {
  validateEmail,
  validateFields,
  validateName,
  validatePasswordPair,
} from "../utils/validators"
import { redirect } from "react-router"
import { api } from "../utils/api"
import { toaster } from "../components/ui/toaster"

export const signupAction = async ({ request }) => {
  const formData = await request.formData()

  const companyName = formData.get("companyName")
  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const email = formData.get("email")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")
  const newsletter = formData.get("newsletter") === "newsletter"
  const acceptTerms = formData.get("acceptTerms") === "acceptTerms"

  const errors = validateFields({
    companyName: () => validateName(companyName, "Company name", 5, 100),
    firstName: () => validateName(firstName, "First name", 2, 100),
    lastName: () => validateName(lastName, "Last name", 2, 100),
    email: () => validateEmail(email),
    password: () => validatePasswordPair(password, confirmPassword),
    acceptTerms: () =>
      !acceptTerms ? "Please accept terms & conditions" : null,
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

    // either redirect to dashboard or login
    toaster.create({
      title: "Toast Title",
      type: "success",
      duration: 6000,
      description:
        "Your account was created as admin successfully. You can invite users to join to dashboards. Please login to your account...",
    })
    return redirect("/login")
  } catch (err) {
    // Map backend error -> field errors (simple version)
    const msg = err?.response?.data?.detail || "Signup failed"

    return {
      errors: { form: msg },
    }
  }
}

export const loginAction = async ({ request }) => {
  const formData = await request.formData()

  const email = formData.get("email")
  const password = formData.get("password")

  const errors = validateFields({
    email: () => validateEmail(email),
    password: () => validateName(password, "Password"),
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

    // either redirect to dashboard or login
    toaster.create({
      title: "Toast Title",
      type: "success",
      description: "Logged in successfully",
    })
    return redirect("/dashboard")
  } catch (err) {
    // Map backend error -> field errors (simple version)
    const msg = err?.response?.data?.detail || "Login failed"
    //const msg = "Please enter correct email or password!"

    return {
      errors: { form: msg },
    }
  }
}
