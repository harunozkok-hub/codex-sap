// ==============================
// Generic helpers
// ==============================

const safeStr = (v) => {
  return typeof v === "string" ? v : v == null ? "" : String(v)
}
// +39 xxxxxxx string seperated to country code + phone
export const splitPhone = (phone) => {
  const p = safeStr(phone).trim()
  if (!p) return { country_code: "", phone_number: "" }

  // naive parse: assumes starts with +<digits> then space then rest
  // If it doesn't match, we'll just put everything in number.
  const m = p.match(/^\s*(\+\d{1,4})\s*(.*)\s*$/)
  if (!m) return { country_code: "", phone_number: p }
  return { country_code: m[1] ?? "", phone_number: (m[2] ?? "").trim() }
}

// in the forms, take the error object and removes one field of error.
// used to cancel error, when user starts typing to field
// setErrors((prev) => clearFieldErrorFromErrors(prev, name))
export const clearFieldErrorFromErrors = (errors, fieldName) => {
  if (!errors?.[fieldName]) return errors

  const next = { ...errors }
  delete next[fieldName]

  return Object.keys(next).length ? next : null
}
// check if forms key value pairs are the same
export const isFormDifferent = (checkingForm, refForm) => {
  return Object.keys(checkingForm).some(
    (key) => refForm[key] !== checkingForm[key],
  )
}

export const normalizeOptional = (v) => {
  const s = v == null ? "" : String(v).trim()
  return s.length === 0 ? null : s
}

export const isEmpty = (value) =>
  value === undefined || value === null || String(value).trim() === ""

export const hasMinLength = (value, min) =>
  !isEmpty(value) && String(value).length >= min

export const hasMaxLength = (value, max) =>
  isEmpty(value) || String(value).length <= max

// ==============================
// Email validation
// ==============================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const isValidEmail = (email) =>
  !isEmpty(email) && EMAIL_REGEX.test(String(email).toLowerCase())

export const validateEmail = (email) => {
  if (isEmpty(email)) return "Email is required"
  if (!hasMinLength(email, 5)) return "Email is too short"
  if (!hasMaxLength(email, 254)) return "Email is too long"
  if (!isValidEmail(email)) return "Invalid email address"
  return null
}

// ==============================
// Password validation
// ==============================

export const hasUppercase = (value) => /[A-Z]/.test(value)
export const hasLowercase = (value) => /[a-z]/.test(value)
export const hasNumber = (value) => /\d/.test(value)
export const hasSpecialChar = (value) => /[#?!@$%^&*\-_]/.test(value)
export const onlyNumbers = (value) => /^\d+$/.test(value)

export const validatePassword = (password, options = {}) => {
  const {
    minLength = 8,
    maxLength = 128,
    requireUppercase = true,
    requireLowercase = true,
    requireNumber = true,
    requireSpecialChar = true,
  } = options

  if (isEmpty(password)) return "Password is required"
  if (!hasMinLength(password, minLength))
    return `Password must be at least ${minLength} characters`
  if (!hasMaxLength(password, maxLength))
    return `Password must be at most ${maxLength} characters`

  if (requireUppercase && !hasUppercase(password))
    return "Password must contain at least one uppercase, one lowercase letter, one number and one special character"
  if (requireLowercase && !hasLowercase(password))
    return "Password must contain at least one uppercase, one lowercase letter, one number and one special character"
  if (requireNumber && !hasNumber(password))
    return "Password must contain at least one uppercase, one lowercase letter, one number and one special character"
  if (requireSpecialChar && !hasSpecialChar(password))
    return "Password must contain at least one uppercase, one lowercase letter, one number and one special character"

  return null
}

export const validateConfirmPassword = (
  password,
  confirmPassword,
  options = {},
) => {
  const { minLength = 8, maxLength = 128 } = options

  if (!confirmPassword || String(confirmPassword).trim().length === 0) {
    return "Confirm password is required"
  }

  if (String(confirmPassword).length < minLength) {
    return `Confirm password must be at least ${minLength} characters`
  }

  if (String(confirmPassword).length > maxLength) {
    return `Confirm password must be at most ${maxLength} characters`
  }

  if (password !== confirmPassword) {
    return "Passwords do not match"
  }

  return null
}

export const validatePasswordPair = (
  password,
  confirmPassword,
  passwordOptions = {},
) => {
  const passwordError = validatePassword(password, passwordOptions)
  if (passwordError) return { password: passwordError }

  const confirmError = validateConfirmPassword(
    password,
    confirmPassword,
    passwordOptions,
  )
  if (confirmError) return { confirmPassword: confirmError }

  return null
}

// ==============================
// Name validation (first/last/company/various)

export const validateName = (
  name,
  label = "Name",
  minLength = 2,
  maxLength = 100,
  optional = false,
) => {
  if (optional) {
    const defaultText = `${label} is an optional field. If it is not empty,`
    if (!hasMinLength(name, minLength) && !isEmpty(name))
      return `${defaultText} it must be at least ${minLength} characters`
    if (!hasMaxLength(name, maxLength))
      return `${defaultText} it must be at most ${maxLength} characters`
  } else {
    if (isEmpty(name)) return `${label} is required`
    if (!hasMinLength(name, minLength))
      return `${label} must be at least ${minLength} characters`
    if (!hasMaxLength(name, maxLength))
      return `${label} must be at most ${maxLength} characters`
  }

  return null
}

// ==============================
// Phone validation (All phone fields/ can be optional)

export const validatePhone = (
  phone,
  countryCode,
  label = "Name",
  minLength = 5,
  maxLength = 25,
  optional = false,
) => {
  if (optional) {
    const defaultText = `${label} is an optional field. If it is not empty,`
    if (!hasMinLength(phone, minLength) && !isEmpty(phone))
      return `${defaultText} it must be at least ${minLength} numeric characters`
    if (!hasMaxLength(phone, maxLength))
      return `${defaultText} it must be at most ${maxLength} numeric characters`
    if (!onlyNumbers(phone) && !isEmpty(phone)) {
      return `${label} is optional. You can either enter numeric characters or leave the field empty`
    }
    if (!isEmpty(phone) && !hasMinLength(countryCode, 2)) {
      return `${label} was entered but country code was not selected.Please select country code to proceed`
    }
    if (!isEmpty(countryCode) && isEmpty(phone)) {
      return `Country code was entered but ${label} was not entered. Please select type number to proceed`
    }
  } else {
    if (isEmpty(phone)) return `${label} is required`
    if (!hasMinLength(phone, minLength))
      return `${label} must be at least ${minLength} characters`
    if (!hasMaxLength(phone, maxLength))
      return `${label} must be at most ${maxLength} characters`
    if (!onlyNumbers(phone)) {
      return `${label} needs to be numeric characters`
    }
    //needs adjustment
  }
  return null
}

// ==============================
// Utility for form-level validation
// ==============================

export const validateFields = (validators) => {
  const errors = {}

  Object.entries(validators).forEach(([field, validator]) => {
    const error = validator()
    if (error) errors[field] = error
  })

  return Object.keys(errors).length > 0 ? errors : null
}
