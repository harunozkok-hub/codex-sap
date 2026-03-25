const ALWAYS_VISIBLE = new Set(["profile", "settings"])

/**
 * permissions: array like ["catalog","inventory","orders"] or ["*"]
 * role: "admin" or "user"
 */
export function filterMenuByPermissions(menu, profile = null) {
  const role = profile?.role
  const permissions = profile?.permissions ?? [] //test the permissions
  // Admin can see all
  if (role === "admin") return menu
  if (permissions.includes("*")) return menu

  const allowed = new Set(permissions)

  return menu
    .filter((item) => {
      // always visible modules
      if (ALWAYS_VISIBLE.has(item.id)) return true

      // home is usually always visible
      if (item.id === "home") return true

      // keep only allowed modules
      return allowed.has(item.id)
    })
    .map((item) => {
      // If you want: filter children too (optional)
      // For module-level perms, usually you DON'T need this,
      // but it doesn't hurt to keep it consistent.

      // keep profile/settings children always
      if (ALWAYS_VISIBLE.has(item.id) || item.id === "home") return item

      // if it's a module and it's allowed, keep children untouched
      return item
    })
}
