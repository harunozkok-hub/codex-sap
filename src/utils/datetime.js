export const getBrowserTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone

const formatWithTimezone = (
  value,
  {
    locale = [],
    timezone = null,
    dateStyle = "short",
    timeStyle,
  } = {},
) => {
  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) return ""

  const browserTimezone = getBrowserTimezone()
  const resolvedTimezone = timezone || browserTimezone

  try {
    return date.toLocaleString(locale, {
      dateStyle,
      ...(timeStyle ? { timeStyle } : {}),
      timeZone: resolvedTimezone,
    })
  } catch {
    return date.toLocaleString(locale, {
      dateStyle,
      ...(timeStyle ? { timeStyle } : {}),
      timeZone: browserTimezone,
    })
  }
}

export const formatDateTime = (value, options = {}) =>
  formatWithTimezone(value, {
    dateStyle: "short",
    timeStyle: "short",
    ...options,
  })

export const formatDateOnly = (value, options = {}) =>
  formatWithTimezone(value, {
    dateStyle: "short",
    ...options,
  })
