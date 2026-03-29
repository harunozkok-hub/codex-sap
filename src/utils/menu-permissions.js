const ALWAYS_VISIBLE = new Set(["home", "profile", "settings"])

const MENU_PERMISSION_PREFIXES = {
  catalog: ["catalog"],
  inventory: ["inventory"],
  orders: ["orders"],
  production: ["production"],
  finance: ["finance"],
  sales: ["sales_stats"],
}

const PROFILE_CHILD_PERMISSIONS = {
  "manage-profile": [],
  "manage-company-profile": ["company.read", "company.write", "company.manage"],
  "manage-dashboard-users": ["users.read", "users.manage"],
  invitations: ["invitations.manage"],
  "dashboard-permissions": ["user_permissions.manage"],
}

function hasWildcard(permissions) {
  return permissions.includes("*")
}

function matchesPermissionPrefix(permission, prefixes) {
  return prefixes.some(
    (prefix) => permission === prefix || permission.startsWith(`${prefix}.`),
  )
}

export function hasAnyPermission(permissions = [], requiredPermissions = []) {
  if (requiredPermissions.length === 0) return true
  if (hasWildcard(permissions)) return true

  const granted = new Set(permissions)
  return requiredPermissions.some((permission) => granted.has(permission))
}

export function hasModuleAccess(permissions = [], moduleKey) {
  if (!moduleKey) return false
  if (hasWildcard(permissions)) return true

  const prefixes = MENU_PERMISSION_PREFIXES[moduleKey] ?? [moduleKey]
  return permissions.some((permission) =>
    matchesPermissionPrefix(permission, prefixes),
  )
}

function filterProfileChildren(children = [], permissions = []) {
  return children.filter((child) =>
    hasAnyPermission(
      permissions,
      PROFILE_CHILD_PERMISSIONS[child.key] ?? PROFILE_CHILD_PERMISSIONS[child.id] ?? [],
    ),
  )
}

/**
 * Filters dashboard menu items against the explicit permission strings returned
 * by the backend session payload.
 */
export function filterMenuByPermissions(menu, profile = null) {
  const permissions = profile?.permissions ?? []

  return menu
    .map((item) => {
      if (item.id === "profile") {
        const children = filterProfileChildren(item.children, permissions)
        return { ...item, children }
      }

      return item
    })
    .filter((item) => {
      if (ALWAYS_VISIBLE.has(item.id)) return true
      return hasModuleAccess(permissions, item.id)
    })
    .filter((item) => !item.children || item.children.length > 0)
}
