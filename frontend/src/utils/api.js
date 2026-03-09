import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
})

let isRefreshing = false
let pendingQueue = []

function processQueue(error) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve()
  })
  pendingQueue = []
}

function isAuthUrl(url = "") {
  // normalize: keep only path-ish part
  const u = String(url)
  return (
    u.includes("/auth/refresh") ||
    u.includes("/auth/login") ||
    u.includes("/auth/logout") ||
    u.includes("/auth/register")
  )
}

/* ================================
   NEW: pydantic -> string message
   ================================ */
function formatFastApiError(data) {
  if (!data) return null

  const { detail } = data

  // Case 1: already a string
  if (typeof detail === "string") return detail

  // Case 2: Pydantic validation error (array)
  if (Array.isArray(detail)) {
    return detail
      .map((err) => {
        if (!err || !err.msg) return null

        const field = Array.isArray(err.loc)
          ? err.loc.filter((x) => x !== "body").join(".")
          : null

        return field ? `${field}: ${err.msg}` : err.msg
      })
      .filter(Boolean)
      .join(" · ")
  }

  return null
}

/* ================================
   Response interceptor
   ================================ */
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    // Always normalize the message
    const data = error?.response?.data
    const formattedMessage = formatFastApiError(data)

    if (formattedMessage) {
      error.message = formattedMessage
    } else if (!error.response) {
      error.message = "Network error"
    } else if (!error.message) {
      error.message = "Request failed"
    }
    // Network/CORS/etc
    if (!error || !error.config) return Promise.reject(error)

    const originalRequest = error.config
    const status = error.response?.status
    const url = originalRequest.url || ""

    // If it's not a 401, bail
    if (status !== 401) return Promise.reject(error)

    // Prevent infinite loops on auth endpoints
    if (isAuthUrl(url)) return Promise.reject(error)

    // Already retried once -> don't loop
    if (originalRequest._retry) return Promise.reject(error)

    // If refresh in flight, queue it
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject })
      }).then(() => api(originalRequest))
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      await api.post("/auth/refresh")
      processQueue(null)
      return api(originalRequest)
    } catch (refreshErr) {
      processQueue(refreshErr)
      return Promise.reject(refreshErr)
    } finally {
      isRefreshing = false
    }
  },
)
