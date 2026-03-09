export const ok = (data) => ({
  ok: true,
  data,
  errorMessage: null,
  errorStatus: null,
})
export const fail = (err) => ({
  ok: false,
  data: null,
  errorMessage: err?.message ?? "Failed",
  errorStatus: err?.response?.status ?? null,
})
