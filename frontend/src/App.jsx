import { RouterProvider } from "react-router/dom"
import { createBrowserRouter, Navigate } from "react-router"

import Layout from "./components/Layout"
import LayoutWeb from "./components/LayoutWeb"

import DashboardPermissions from "./dashboard-pages/profile/DashboardPermissions"
import Invitations from "./dashboard-pages/profile/Invitations"
import ManageDashboardUsers from "./dashboard-pages/profile/ManageDashboardUsers"
import ManageProfile from "./dashboard-pages/profile/ManageProfile"

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
} from "./loaders/auth"

const router = createBrowserRouter([
  {
    element: <LayoutWeb />,
    id: "home-page",
    loader: homeLoader,
    children: [
      { index: true, element: <Home /> },
      { path: "price-plans", element: <PricePlans /> },

      { path: "login", element: <Login />, action: loginAction },
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
      { path: "register", element: <Signup />, action: signupAction },
      { path: "signup-success", element: <SignupSuccess /> },
    ],
  },
  { path: "logout", action: logoutAction },
  {
    path: "dashboard",
    element: <Layout />,
    id: "dashboard",
    loader: requireAuthLoader,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "profile",
        children: [
          {
            path: "profile-settings",
            element: <ManageProfile />,
          },
          {
            path: "manage-users",
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
        children: [
          { path: "products", element: <Products /> },
          { path: "categories", element: <Categories /> },
          { path: "bundles", element: <Bundles /> },
        ],
      },

      {
        path: "inventory",
        children: [
          { path: "warehouses", element: <Warehouses /> },
          { path: "stock", element: <Stock /> },
          { path: "packaging", element: <Packaging /> },
          { path: "samples", element: <Samples /> },
          { path: "raw-materials", element: <RawMaterials /> },
        ],
      },

      { path: "orders", element: <Orders /> },

      {
        path: "production",
        children: [
          { path: "production-orders", element: <ProductionOrders /> },
          { path: "production-timeline", element: <ProductionTimeline /> },
        ],
      },

      { path: "finance", element: <Finance /> },
      { path: "sales-stats", element: <SalesStats /> },
      { path: "ui-settings", element: <UISettings /> },

      { path: "*", element: <Navigate to="/dashboard" replace /> },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
