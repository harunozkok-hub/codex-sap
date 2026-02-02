import { t } from "./helper-i18n"

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
  if (isEmpty(email)) {
    const error = t("email-is-required", { ns: "validators" })
    return error
  }
  if (!hasMinLength(email, 5)) {
    const error = t("email-is-too-short", { ns: "validators" })
    return error
  }
  if (!hasMaxLength(email, 254)) {
    const error = t("email-is-too-long", { ns: "validators" })
    return error
  }
  if (!isValidEmail(email)) {
    const error = t("invalid-email-address", { ns: "validators" })
    return error
  }
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

  if (isEmpty(password)) {
    const error = t("password-is-required", { ns: "validators" })
    return error
  }
  if (!hasMinLength(password, minLength)) {
    const error = t("password-must-be-at-least-minl", {
      ns: "validators",
      min: minLength,
    })
    return error
  }
  if (!hasMaxLength(password, maxLength)) {
    const error = t("password-must-be-at-most-maxle", {
      ns: "validators",
      max: maxLength,
    })
    return error
  }

  if (
    (requireUppercase && !hasUppercase(password)) ||
    (requireLowercase && !hasLowercase(password)) ||
    (requireNumber && !hasNumber(password)) ||
    (requireSpecialChar && !hasSpecialChar(password))
  ) {
    const error = t("password-must-contain-at-least", { ns: "validators" })
    return error
  }

  return null
}

export const validateConfirmPassword = (
  password,
  confirmPassword,
  options = {},
) => {
  const { minLength = 8, maxLength = 128 } = options

  if (!confirmPassword || String(confirmPassword).trim().length === 0) {
    const error = t("confirm-password-is-required", { ns: "validators" })
    return error
  }

  if (String(confirmPassword).length < minLength) {
    const error = t("confirm-password-must-be-at-le", {
      ns: "validators",
      min: minLength,
    })
    return error
  }

  if (String(confirmPassword).length > maxLength) {
    const error = t("confirm-password-must-be-at-mo", {
      ns: "validators",
      max: maxLength,
    })
    return error
  }

  if (password !== confirmPassword) {
    const error = t("passwords-do-not-match", { ns: "validators" })
    return error
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
  label = t("name", { ns: "validators" }),
  minLength = 2,
  maxLength = 100,
  optional = false,
) => {
  if (optional) {
    if (!hasMinLength(name, minLength) && !isEmpty(name)) {
      const error = t("label-is-optional-if-provided-min-name", {
        ns: "validators",
        label,
        min: minLength,
      })
      return error
    }
    if (!hasMaxLength(name, maxLength)) {
      const error = t("label-is-optional-if-provided-", {
        ns: "validators",
        label,
        max: maxLength,
      })
      return error
    }
  } else {
    if (isEmpty(name)) {
      const error = t("label-is-required", { ns: "validators", label })
      return error
    }
    if (!hasMinLength(name, minLength)) {
      const error = t("label-must-be-at-least-minleng", {
        ns: "validators",
        label,
        min: minLength,
      })
      return error
    }
    if (!hasMaxLength(name, maxLength)) {
      const error = t("label-must-be-at-most-maxlengt-name-max", {
        ns: "validators",
        label,
        max: maxLength,
      })
      return error
    }
  }

  return null
}

// ==============================
// Phone validation (All phone fields/ can be optional)

export const validatePhone = (
  phone,
  countryCode,
  label = t("name", { ns: "validators" }),
  minLength = 5,
  maxLength = 25,
  optional = false,
) => {
  if (!isEmpty(phone) && !hasMinLength(countryCode, 2)) {
    const error = t("missing-country-code", { ns: "validators", label })
    return error
  }
  if (optional) {
    if (!hasMinLength(phone, minLength) && !isEmpty(phone)) {
      const error = t("opt-min-digits", {
        ns: "validators",
        label,
        min: minLength,
      })
      return error
    }
    if (!hasMaxLength(phone, maxLength)) {
      const error = t("opt-max-digits", {
        ns: "validators",
        label,
        max: maxLength,
      })
      return error
    }
    if (!onlyNumbers(phone) && !isEmpty(phone)) {
      const error = t("opt-numeric-only", { ns: "validators", label })
      return error
    }
    if (!isEmpty(countryCode) && isEmpty(phone)) {
      const error = t("opt-missing-number", { ns: "validators", label })
      return error
    }
  } else {
    if (isEmpty(phone)) {
      const error = t("label-is-required", { ns: "validators", label })
      return error
    }
    if (!hasMinLength(phone, minLength)) {
      const error = t("label-must-be-at-least-minleng", {
        ns: "validators",
        label,
        min: minLength,
      })
      return error
    }
    if (!hasMaxLength(phone, maxLength)) {
      const error = t("label-must-be-at-most-maxlengt-name-max", {
        ns: "validators",
        label,
        max: maxLength,
      })
      return error
    }
    if (!onlyNumbers(phone)) {
      const error = t("numeric-only", { ns: "validators", label })
      return error
    }
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
