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

api.interceptors.response.use(
  (res) => res,
  async (error) => {
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
  }
)
