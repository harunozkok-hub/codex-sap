import { RouterProvider } from "react-router/dom"
import { createBrowserRouter, Navigate, redirect } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Layout from "./components/Layout"
import LayoutWeb from "./components/LayoutWeb"

import DashboardPermissions from "./dashboard-pages/profile/DashboardPermissions"
import Invitations from "./dashboard-pages/profile/Invitations"
import ManageDashboardUsers from "./dashboard-pages/profile/ManageDashboardUsers"
import ManageProfile from "./dashboard-pages/profile/ManageProfile"
import ManageCompanyProfile from "./dashboard-pages/profile/ManageCompanyProfile"

import Dashboard from "./dashboard-pages/Dashboard"
import Products from "./dashboard-pages/catalog/Products"
import Categories from "./dashboard-pages/catalog/Categories"
import Bundles from "./dashboard-pages/catalog/Bundles"

import Warehouses from "./dashboard-pages/inventory/Warehouses"
import Stock from "./dashboard-pages/inventory/Stock"
import Packaging from "./dashboard-pages/inventory/Packaging"
import Samples from "./dashboard-pages/inventory/Samples"
import RawMaterials from "./dashboard-pages/inventory/RawMaterials"

import ProductionOrders from "./dashboard-pages/production/ProductionOrders"
import ProductionTimeline from "./dashboard-pages/production/ProductionTimeline"

import Finance from "./dashboard-pages/Finance"
import Orders from "./dashboard-pages/Orders"
import SalesStats from "./dashboard-pages/SalesStats"
import UISettings from "./dashboard-pages/UISettings"

import Home from "./web-pages/Home"
import PricePlans from "./web-pages/PricePlans"
import Login from "./web-pages/Login"
import Signup from "./web-pages/Signup"
import ConfirmEmail from "./web-pages/ConfirmEmail"
import ResendEmail from "./web-pages/ResendEmail"
import SignupSuccess from "./web-pages/SignupSuccess"

import { loginAction, signupAction, logoutAction } from "./actions/login-signup"
import { resendEmailVerificationAction } from "./actions/resend-email-verification"
import {
  requireAuthLoader,
  homeLoader,
  confirmEmailLoader,
  checkAdmin,
  requireModulePerm,
} from "./loaders/auth"
import { langLoader } from "./loaders/langLoader"
import { editUserProfileAction } from "./actions/profile-actions"
import { getResolvedLanguage } from "./utils/helper-i18n"
import RedirectPage from "./web-pages/RedirectPage"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { companyProfileLoader } from "./loaders/profile-loaders"

const resolveLanguageLoader = async () => {
  const lang = await getResolvedLanguage()
  throw redirect(`/${lang}`)
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      staleTime: 60_000,
      gcTime: 15 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    hydrateFallbackElement: <p>Fallback..</p>,
    children: [
      {
        element: <RedirectPage />,
        index: true,
        loader: resolveLanguageLoader,
      },
    ],
  },
  // ✅ correct root lang route
  {
    path: "/:lang",
    loader: langLoader,
    children: [
      {
        element: <LayoutWeb />,
        id: "home-page",
        loader: homeLoader(queryClient),
        children: [
          { index: true, element: <Home /> },
          { path: "price-plans", element: <PricePlans /> },

          {
            path: "login",
            element: <Login />,
            action: loginAction(queryClient),
          },
          {
            path: "confirm-email",
            element: <ConfirmEmail />,
            loader: confirmEmailLoader,
          },
          {
            path: "resend-email",
            element: <ResendEmail />,
            action: resendEmailVerificationAction,
          },
          {
            path: "register",
            element: <Signup />,
            action: signupAction,
          },
          { path: "signup-success", element: <SignupSuccess /> },
        ],
      },

      { path: "logout", action: logoutAction(queryClient) },

      {
        path: "dashboard",
        element: <Layout />,
        id: "dashboard",
        loader: requireAuthLoader(queryClient),
        children: [
          { index: true, element: <Dashboard /> },

          {
            path: "profile",
            children: [
              {
                index: true,
                element: <Navigate to="profile-settings" replace />,
              },
              {
                path: "profile-settings",
                action: editUserProfileAction(queryClient),
                element: <ManageProfile />,
              },
              {
                path: "company-profile-settings",
                loader: companyProfileLoader(queryClient),
                element: <ManageCompanyProfile />,
              },
              {
                path: "manage-users",
                loader: checkAdmin(queryClient),
                element: <ManageDashboardUsers />,
              },
              { path: "invitations", element: <Invitations /> },
              {
                path: "dashboard-permissions",
                element: <DashboardPermissions />,
              },
            ],
          },

          {
            path: "catalog",
            loader: requireModulePerm(queryClient, "catalog"),
            children: [
              { index: true, element: <Navigate to="products" replace /> },
              { path: "products", element: <Products /> },
              { path: "categories", element: <Categories /> },
              { path: "bundles", element: <Bundles /> },
            ],
          },

          {
            path: "inventory",
            loader: requireModulePerm(queryClient, "inventory"),
            children: [
              { index: true, element: <Navigate to="stock" replace /> },
              { path: "warehouses", element: <Warehouses /> },
              { path: "stock", element: <Stock /> },
              { path: "packaging", element: <Packaging /> },
              { path: "samples", element: <Samples /> },
              { path: "raw-materials", element: <RawMaterials /> },
            ],
          },

          {
            path: "orders",
            loader: requireModulePerm(queryClient, "orders"),
            element: <Orders />,
          },

          {
            path: "production",
            loader: requireModulePerm(queryClient, "production"),
            children: [
              {
                index: true,
                element: <Navigate to="production-orders" replace />,
              },
              { path: "production-orders", element: <ProductionOrders /> },
              {
                path: "production-timeline",
                element: <ProductionTimeline />,
              },
            ],
          },

          {
            path: "finance",
            loader: requireModulePerm(queryClient, "finance"),
            element: <Finance />,
          },
          {
            path: "sales-stats",
            loader: requireModulePerm(queryClient, "sales-stats"),
            element: <SalesStats />,
          },
          { path: "ui-settings", element: <UISettings /> },

          { path: "*", element: <Navigate to="../" replace /> },
        ],
      },

      { path: "*", element: <Navigate to="../" replace /> },
    ],
  },

  {
    path: "*",
    loader: async ({ request }) => {
      const lang = await getResolvedLanguage()
      const url = new URL(request.url)
      throw redirect(`/${lang}${url.pathname}${url.search}`)
    },
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
