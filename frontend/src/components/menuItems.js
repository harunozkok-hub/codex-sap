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

export const menuItems = (t) => {
  return [
    {
      id: "home",
      label: t("dashboard"),
      icon: FiHome,
      path: "",
    },
    // ✅ PROFILE (manage profile/ manage users and permissions if admin)
    {
      id: "profile",
      label: t("profile"),
      icon: FiUser,
      children: [
        {
          key: "manage-profile",
          label: t("manage-profile"),
          path: "profile/profile-settings",
        },
        {
          key: "manage-dashboard-users",
          label: t("manage-dashboard-users"),
          path: "profile/manage-users",
        },
        {
          key: "invitations",
          label: t("invitations"),
          path: "profile/invitations",
        },
        {
          key: "dashboard-permissions",
          label: t("permissions"),
          path: "profile/dashboard-permissions",
        },
      ],
    },

    // ✅ CATALOG (what you sell / sync to Wix)
    {
      id: "catalog",
      label: t("catalog"),
      icon: FiBox,
      children: [
        {
          key: "product-list",
          label: t("product-list"),
          path: "catalog/products",
        },
        {
          key: "categories",
          label: t("categories"),
          path: "catalog/categories",
        },
        {
          key: "bundles",
          label: t("bundles-and-kits"),
          path: "catalog/bundles",
        },
      ],
    },

    // ✅ INVENTORY (what you stock/manage)
    {
      id: "inventory",
      label: t("inventory"),
      icon: FiTruck,
      children: [
        {
          key: "warehouses",
          label: t("warehouses"),
          path: "inventory/warehouses",
        },
        {
          key: "stock-levels",
          label: t("stock-levels"),
          path: "inventory/stock",
        },
        {
          key: "packaging-materials",
          label: t("packaging-materials"),
          path: "inventory/packaging",
        },
        {
          key: "samples-gifts",
          label: t("samples-and-gifts"),
          path: "inventory/samples",
        },
        {
          key: "raw-materials",
          label: t("raw-materials"),
          path: "inventory/raw-materials",
        },
      ],
    },

    // ✅ ORDERS
    {
      id: "orders",
      label: t("orders"),
      icon: FiShoppingCart,
      children: [{ key: "orders", label: t("manage-orders"), path: "orders" }],
    },

    // ✅ PRODUCTION
    {
      id: "production",
      label: t("production"),
      icon: FiTruck,
      children: [
        {
          key: "production-orders",
          label: t("production-orders"),
          path: "production/production-orders",
        },
        {
          key: "production-timeline",
          label: t("timeline"),
          path: "production/production-timeline",
        },
      ],
    },

    // ✅ FINANCE
    {
      id: "finance",
      label: t("finance"),
      icon: FiDollarSign,
      children: [
        {
          key: "finance-summary",
          label: t("finance-summary"),
          path: "finance",
        },
      ],
    },

    // ✅ SALES
    {
      id: "sales",
      label: t("sales-stats"),
      icon: FiBarChart2,
      children: [
        {
          key: "sales-performance",
          label: t("sales-performance"),
          path: "sales-stats",
        },
      ],
    },

    // ✅ SETTINGS
    {
      id: "settings",
      label: t("settings"),
      icon: FiSettings,
      children: [
        { key: "ui-settings", label: t("ui-settings"), path: "ui-settings" },
      ],
    },
  ]
}
