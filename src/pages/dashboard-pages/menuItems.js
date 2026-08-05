import {
  LuBanknote,
  LuBoxes,
  LuBuilding2,
  LuChartColumnBig,
  LuIdCard,
  LuLayoutDashboard,
  LuMail,
  LuPackage,
  LuSettings2,
  LuShieldCheck,
  LuShoppingCart,
  LuFactory,
  LuUserRound,
  LuUsersRound,
} from "react-icons/lu"

export const menuItems = (t) => {
  return [
    {
      id: "home",
      label: t("dashboard"),
      icon: LuLayoutDashboard,
      path: "",
    },
    {
      id: "profile",
      label: t("profile"),
      icon: LuUserRound,
      children: [
        {
          icon: LuIdCard,
          key: "manage-profile",
          label: t("manage-profile"),
          path: "profile/profile-settings",
        },
        {
          icon: LuBuilding2,
          key: "manage-company-profile",
          label: t("company-profile"),
          path: "profile/company-profile-settings",
        },
        {
          icon: LuUsersRound,
          key: "manage-dashboard-users",
          label: t("manage-dashboard-users"),
          path: "profile/manage-users",
        },
        {
          icon: LuMail,
          key: "invitations",
          label: t("invitations"),
          path: "profile/invitations",
        },
        {
          icon: LuShieldCheck,
          key: "dashboard-permissions",
          label: t("permissions"),
          path: "profile/dashboard-permissions",
        },
      ],
    },
    {
      id: "catalog",
      label: t("catalog"),
      icon: LuPackage,
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
    {
      id: "inventory",
      label: t("inventory"),
      icon: LuBoxes,
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
    {
      id: "orders",
      label: t("orders"),
      icon: LuShoppingCart,
      children: [{ key: "orders", label: t("manage-orders"), path: "orders" }],
    },
    {
      id: "production",
      label: t("production"),
      icon: LuFactory,
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
    {
      id: "finance",
      label: t("finance"),
      icon: LuBanknote,
      children: [
        {
          key: "finance-summary",
          label: t("finance-summary"),
          path: "finance",
        },
      ],
    },
    {
      id: "sales",
      label: t("sales-stats"),
      icon: LuChartColumnBig,
      children: [
        {
          key: "sales-performance",
          label: t("sales-performance"),
          path: "sales-stats",
        },
      ],
    },
    {
      id: "settings",
      label: t("settings"),
      icon: LuSettings2,
      children: [
        { key: "ui-settings", label: t("ui-settings"), path: "ui-settings" },
      ],
    },
  ]
}
