import { redirect } from "react-router"
import { api } from "../utils/api"

export async function requireAuthLoader() {
  try {
    const res = await api.get("/api-user/profile") // cookie-auth endpoint
    return { profile: res.data }
  } catch {
    return redirect("/login")
  }
}
