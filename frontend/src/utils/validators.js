// ==============================
// Generic helpers
// ==============================

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
  options = {}
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
  passwordOptions = {}
) => {
  const passwordError = validatePassword(password, passwordOptions)
  if (passwordError) return { password: passwordError }

  const confirmError = validateConfirmPassword(
    password,
    confirmPassword,
    passwordOptions
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
  maxLength = 100
) => {
  if (isEmpty(name)) return `${label} is required`
  if (!hasMinLength(name, minLength))
    return `${label} must be at least ${minLength} characters`
  if (!hasMaxLength(name, maxLength))
    return `${label} must be at most ${maxLength} characters`
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
