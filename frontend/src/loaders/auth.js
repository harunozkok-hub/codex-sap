import { redirect } from "react-router"
import { api } from "../utils/api"

// ---- tiny in-memory cache (module-scoped) ----
let cachedProfile = undefined // undefined = not fetched yet
let cacheTime = 0
const TTL_MS = 30_000 // 30 seconds

function isCacheValid() {
  return cachedProfile !== undefined && Date.now() - cacheTime < TTL_MS
}

async function fetchProfile() {
  const res = await api.get("/api-user/profile")
  return res.data
}

async function getSession({ force = false } = {}) {
  if (!force && isCacheValid()) return cachedProfile

  try {
    const profile = await fetchProfile()
    cachedProfile = profile
    cacheTime = Date.now()
    return profile
  } catch (err) {
    const status = err?.response?.status

    // Not authenticated
    if (status === 401 || status === 403) {
      cachedProfile = null
      cacheTime = Date.now()
      return null
    }

    // Real error: surface it
    throw err
  }
}

// ---- loaders ----
export async function homeLoader() {
  const profile = await getSession()
  return { profile }
}

export async function requireAuthLoader() {
  const profile = await getSession()
  if (!profile) return redirect("/login")
  return { profile }
}

// ---- helpers to keep cache correct after auth actions ----
export function clearSessionCache() {
  cachedProfile = undefined
  cacheTime = 0
}

export function setSessionCache(profile) {
  cachedProfile = profile
  cacheTime = Date.now()
}
