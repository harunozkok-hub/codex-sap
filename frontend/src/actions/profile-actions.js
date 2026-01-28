import { toaster } from "../components/ui/toaster"
import {
  validateFields,
  validateName,
  validatePhone,
  normalizeOptional,
} from "../utils/validators"
import { api } from "../utils/api"
import { redirect } from "react-router"

export const editUserProfileAction = async ({ request }) => {
  const formData = await request.formData()

  const first_name = formData.get("firstName")
  const last_name = formData.get("lastName")
  const job_title = formData.get("jobTitle")
  const country_code = formData.get("countryCode")
  const phone_number = formData.get("phoneNumber")
  const newsletter = formData.get("newsletter") === "on"

  const errors = validateFields({
    firstName: () => validateName(first_name, "First name", 2, 100),
    lastName: () => validateName(last_name, "Last name", 2, 100),
    jobTitle: () => validateName(job_title, "Job title", 2, 100, true),
    phoneNumber: () =>
      validatePhone(phone_number, country_code, "Phone number", 5, 25, true),
  })

  if (errors) {
    return { errors }
  }
  const newPhoneNumber = normalizeOptional(phone_number)
    ? `${country_code} ${phone_number}`
    : null

  try {
    const res = await api.patch("/api-user/profile", {
      first_name,
      last_name,
      job_title: normalizeOptional(job_title),
      phone: newPhoneNumber,
      newsletter,
    })

    toaster.create({
      title: "Profile Update Success",
      type: "success",
      duration: 6000,
      description: "Profile informations updated successfully",
    })

    return { newProfile: res.data }
  } catch (err) {
    // Map backend error -> field errors (simple version)
    const msg =
      err?.response?.data?.detail ||
      "Updating profile failed, please try in few minutes!"

    return { errors: { form: msg } }
  }
}
