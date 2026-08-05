import { useGeolocation, useLocalStorage } from "@uidotdev/usehooks"
import { useEffect, useRef, useCallback } from "react"
import { api } from "@/utils/api"

const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30

function isCountryExpired(stored) {
  if (!stored?.detectedAt) return true
  return Date.now() - stored.detectedAt > THIRTY_DAYS
}

export function useCountry() {
  const geo = useGeolocation()
  const [stored, setStored] = useLocalStorage("geoCountry", null)

  const inFlightRef = useRef(false)
  const lastFetchKeyRef = useRef(null)

  const fetchCountry = useCallback(async () => {
    const lat = geo.latitude
    const lon = geo.longitude

    if (lat == null || lon == null) return

    const fetchKey = `${lat}:${lon}`

    if (inFlightRef.current) return
    if (lastFetchKeyRef.current === fetchKey && !isCountryExpired(stored))
      return

    inFlightRef.current = true

    try {
      const res = await api.get(
        `/utils/country-from-position?lat=${lat}&lon=${lon}`,
      )

      const nextValue = {
        countryCode: res.data.country_code,
        detectedAt: Date.now(),
      }

      setStored(nextValue)
      lastFetchKeyRef.current = fetchKey
    } catch (err) {
      console.error("Failed to fetch country", err)
    } finally {
      inFlightRef.current = false
    }
  }, [geo.latitude, geo.longitude, setStored, stored])

  useEffect(() => {
    const lat = geo.latitude
    const lon = geo.longitude

    if (lat == null || lon == null) return
    if (stored && !isCountryExpired(stored)) return

    fetchCountry()
  }, [geo.latitude, geo.longitude, stored, fetchCountry])

  const refresh = useCallback(() => {
    lastFetchKeyRef.current = null
    fetchCountry()
  }, [fetchCountry])

  return {
    country: stored?.countryCode ?? null,
    loading: !stored && geo.loading,
    error: geo.error,
    isExpired: isCountryExpired(stored),
    refresh,
  }
}
