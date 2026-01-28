import { splitPhone } from "../../../utils/validators"

export const mapProfileToForm = (profileItem) => {
  // profileItem can be dashboard loader profile OR action response profile
  const phoneParts = splitPhone(profileItem?.phone ?? "")
  return {
    email: profileItem?.email ?? "",
    role: profileItem?.role ?? "user",
    firstName: profileItem?.first_name ?? "",
    lastName: profileItem?.last_name ?? "",
    newsletter: profileItem?.newsletter ?? false,
    jobTitle: profileItem?.job_title ?? "",
    countryCode: phoneParts.country_code,
    phoneNumber: phoneParts.phone_number,
    companyName: profileItem?.company?.name ?? "",
  }
}
