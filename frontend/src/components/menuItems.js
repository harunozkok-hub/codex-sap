import {
  FiBarChart2,
  FiBox,
  FiDollarSign,
  FiHome,
  FiShoppingCart,
  FiTruck,
  FiSettings,
  FiUser,
} from "react-icons/fi"

export const menuItems = [
  {
    id: "home",
    label: "Dashboard",
    icon: FiHome,
    path: "",
  },
  // ✅ PROFILE (manage profile/ manage users and permissions if admin)
  {
    id: "profile",
    label: "Profile",
    icon: FiUser,
    children: [
      {
        key: "manage-profile",
        label: "Manage Profile",
        path: "profile/profile-settings",
      },
      {
        key: "manage-dashboard-users",
        label: "Manage Dashboard Users",
        path: "profile/manage-users",
      },
      { key: "invitations", label: "Invitations", path: "profile/invitations" },
      {
        key: "dashboard-permissions",
        label: "Permissions",
        path: "profile/dashboard-permissions",
      },
    ],
  },

  // ✅ CATALOG (what you sell / sync to Wix)
  {
    id: "catalog",
    label: "Catalog",
    icon: FiBox,
    children: [
      { key: "product-list", label: "Product List", path: "catalog/products" },
      { key: "categories", label: "Categories", path: "catalog/categories" },
      { key: "bundles", label: "Bundles & Kits", path: "catalog/bundles" },
    ],
  },

  // ✅ INVENTORY (what you stock/manage)
  {
    id: "inventory",
    label: "Inventory",
    icon: FiTruck,
    children: [
      { key: "warehouses", label: "Warehouses", path: "inventory/warehouses" },
      { key: "stock-levels", label: "Stock Levels", path: "inventory/stock" },
      {
        key: "packaging-materials",
        label: "Packaging Materials",
        path: "inventory/packaging",
      },
      {
        key: "samples-gifts",
        label: "Samples & Gifts",
        path: "inventory/samples",
      },
      {
        key: "raw-materials",
        label: "Raw Materials",
        path: "inventory/raw-materials",
      },
    ],
  },

  // ✅ ORDERS
  {
    id: "orders",
    label: "Orders",
    icon: FiShoppingCart,
    children: [{ key: "orders", label: "Manage Orders", path: "orders" }],
  },

  // ✅ PRODUCTION
  {
    id: "production",
    label: "Production",
    icon: FiTruck,
    children: [
      {
        key: "production-orders",
        label: "Production Orders",
        path: "production/production-orders",
      },
      {
        key: "production-timeline",
        label: "Timeline",
        path: "production/production-timeline",
      },
    ],
  },

  // ✅ FINANCE
  {
    id: "finance",
    label: "Finance",
    icon: FiDollarSign,
    children: [
      { key: "finance-summary", label: "Finance Summary", path: "finance" },
    ],
  },

  // ✅ SALES
  {
    id: "sales",
    label: "Sales Stats",
    icon: FiBarChart2,
    children: [
      {
        key: "sales-performance",
        label: "Sales Performance",
        path: "sales-stats",
      },
    ],
  },

  // ✅ SETTINGS
  {
    id: "settings",
    label: "Settings",
    icon: FiSettings,
    children: [
      { key: "ui-settings", label: "UI Settings", path: "ui-settings" },
    ],
  },
]
