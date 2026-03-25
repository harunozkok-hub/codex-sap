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

export const mapCompanyDetailsToForm = (detailItem) => {
  const phoneParts = splitPhone(detailItem?.phone ?? "")
  return {
    companyName: detailItem?.name ?? "",
    legalName: detailItem?.legal_name ?? "",
    displayName: detailItem?.display_name ?? "",
    billingEmail: detailItem?.billing_email ?? "",
    vatNumber: detailItem?.vat_number ?? "",
    countryCodeCompany: phoneParts.country_code,
    phoneNumberCompany: phoneParts.phone_number,
  }
}

export const userProfileFieldMap = {
  first_name: "firstName",
  last_name: "lastName",
  job_title: "jobTitle",
  phone: "phoneNumber",
}

export const companyProfileFieldMap = {
  display_name: "displayName",
  legal_name: "legalName",
  vat_number: "vatNumber",
  billing_email: "billingEmail",
  phone: "phoneNumber",
}

export const signupFieldMap = {
  company_name: "companyName",
  first_name: "firstName",
  last_name: "lastName",
  email: "email",
  password: "password",
  confirm_password: "confirmPassword",
  accept_terms: "acceptTerms",
}

export const loginFieldMap = {
  email: "email",
  username: "email",
  password: "password",
}

export const changePasswordFieldMap = {
  password: "currentPassword",
  current_password: "currentPassword",
  new_password: "newPassword",
}

export const rolesList = (t) => {
  //const {} = useTranslation("profile")
  return [
    { value: "owner", label: t("owner") },
    { value: "admin", label: t("admin") },
    { value: "manager", label: t("manager") },
    { value: "member", label: t("member") },
    { value: "viewer", label: t("viewer") },
  ]
}
