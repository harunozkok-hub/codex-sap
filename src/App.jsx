import { RouterProvider } from "react-router/dom"
import { createBrowserRouter, Navigate, redirect } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import {
  forgotPasswordAction,
  resetPasswordAction,
} from "@/actions/forgot-password"
import { loginAction, signupAction, logoutAction } from "@/actions/login-signup"
import {
  editCompanyProfileAction,
  editUserProfileAction,
  changePasswordAction,
  editCompanyAddressAction,
} from "@/actions/profile-actions"

import {
  companyAddressesAction,
  companyLegalInfoAction,
  completeOnboardingAction,
  companyPreferencesAction,
  countryContextAction,
} from "@/actions/dashboard-onboarding"
import { resendEmailVerificationAction } from "@/actions/resend-email-verification"
import { companyProfileLoader } from "@/loaders/profile-loaders"
import {
  homeLoader,
  confirmEmailLoader,
  requireModulePerm,
  requirePermissions,
  resetPasswordLoader,
} from "@/loaders/auth"
import { dashboardOnboardingLoader } from "@/loaders/dashboard-loaders"
import { langLoader } from "@/loaders/langLoader"
import { dashboardLoader } from "@/loaders/dashboard-loaders"
import { getResolvedLanguage } from "@/utils/helper-i18n"

import Layout from "@/pages/dashboard-pages/Layout"
import LayoutWeb from "@/pages/web-pages/LayoutWeb"
import Dashboard from "@/pages/dashboard-pages/Dashboard"
import Finance from "@/pages/dashboard-pages/Finance"
import Orders from "@/pages/dashboard-pages/Orders"
import SalesStats from "@/pages/dashboard-pages/SalesStats"
import UISettings from "@/pages/dashboard-pages/UISettings"
import Bundles from "@/pages/dashboard-pages/catalog/Bundles"
import Categories from "@/pages/dashboard-pages/catalog/Categories"
import Products from "@/pages/dashboard-pages/catalog/Products"
import Packaging from "@/pages/dashboard-pages/inventory/Packaging"
import RawMaterials from "@/pages/dashboard-pages/inventory/RawMaterials"
import Samples from "@/pages/dashboard-pages/inventory/Samples"
import Stock from "@/pages/dashboard-pages/inventory/Stock"
import Warehouses from "@/pages/dashboard-pages/inventory/Warehouses"
import ProductionOrders from "@/pages/dashboard-pages/production/ProductionOrders"
import ProductionTimeline from "@/pages/dashboard-pages/production/ProductionTimeline"
import ChangePassword from "@/pages/dashboard-pages/profile/ChangePassword"
import DashboardPermissions from "@/pages/dashboard-pages/profile/DashboardPermissions"
import EditCompanyAddress from "@/pages/dashboard-pages/profile/EditCompanyAddress"
import Invitations from "@/pages/dashboard-pages/profile/Invitations"
import ManageCompanyProfile from "@/pages/dashboard-pages/profile/ManageCompanyProfile"
import ManageDashboardUsers from "@/pages/dashboard-pages/profile/ManageDashboardUsers"
import ManageProfile from "@/pages/dashboard-pages/profile/ManageProfile"
import ConfirmEmail from "@/pages/web-pages/ConfirmEmail"
import ForgotPassword from "@/pages/web-pages/ForgotPassword"
import Home from "@/pages/web-pages/Home"
import Login from "@/pages/web-pages/Login"
import PricePlans from "@/pages/web-pages/PricePlans"
import RedirectPage from "@/pages/web-pages/RedirectPage"
import ResendEmail from "@/pages/web-pages/ResendEmail"
import ResetPassword from "@/pages/web-pages/ResetPassword"
import Signup from "@/pages/web-pages/Signup"
import SignupSuccess from "@/pages/web-pages/SignupSuccess"
import LayoutDashboardOnboarding from "@/pages/dashboard-onboarding/LayoutDashboardOnboarding"
import Welcome from "@/pages/dashboard-onboarding/Welcome"
import CompanyContext from "@/pages/dashboard-onboarding/CompanyContext"
import CompanyLegalInfo from "@/pages/dashboard-onboarding/CompanyLegalInfo"
import CompanyAddress from "@/pages/dashboard-onboarding/CompanyAddress"
import Preferences from "@/pages/dashboard-onboarding/Preferences"
import Done from "@/pages/dashboard-onboarding/Done"
import AccessRequired from "@/pages/dashboard-onboarding/AccessRequired"

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
            path: "forgot-password",
            element: <ForgotPassword />,
            action: forgotPasswordAction,
          },
          {
            path: "reset-password",
            element: <ResetPassword />,
            action: resetPasswordAction,
            loader: resetPasswordLoader,
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
        path: "dashboard-onboarding",
        id: "dashboard-onboarding",
        element: <LayoutDashboardOnboarding />,
        loader: dashboardOnboardingLoader(queryClient),
        children: [
          {
            index: true,
            element: <Navigate to="welcome" replace />,
          },
          {
            path: "welcome",
            element: <Welcome />,
          },
          {
            path: "company-country",
            element: <CompanyContext />,
            action: countryContextAction(queryClient),
          },
          {
            path: "company-legal-info",
            element: <CompanyLegalInfo />,
            action: companyLegalInfoAction(queryClient),
          },
          {
            path: "company-address",
            element: <CompanyAddress />,
            action: companyAddressesAction(queryClient),
          },
          {
            path: "preferences",
            element: <Preferences />,
            action: companyPreferencesAction(queryClient),
          },
          {
            path: "done",
            element: <Done />,
            action: completeOnboardingAction(queryClient),
          },
          {
            path: "access-required",
            element: <AccessRequired />,
          },
        ],
      },
      {
        path: "dashboard",
        element: <Layout />,
        id: "dashboard",
        loader: dashboardLoader(queryClient),
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
                path: "change-user-password",
                action: changePasswordAction(queryClient),
                element: <ChangePassword />,
              },

              {
                path: "company-profile-settings",
                loader: companyProfileLoader(queryClient),
                children: [
                  {
                    index: true,
                    action: editCompanyProfileAction(queryClient),
                    element: <ManageCompanyProfile />,
                  },
                  {
                    path: "address/:type",
                    element: <EditCompanyAddress />,
                    action: editCompanyAddressAction(queryClient),
                  },
                ],
              },
              {
                path: "manage-users",
                loader: requirePermissions(queryClient, [
                  "users.read",
                  "users.manage",
                ]),
                element: <ManageDashboardUsers />,
              },
              {
                path: "invitations",
                loader: requirePermissions(queryClient, ["invitations.manage"]),
                element: <Invitations />,
              },
              {
                path: "dashboard-permissions",
                loader: requirePermissions(queryClient, [
                  "user_permissions.manage",
                ]),
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
