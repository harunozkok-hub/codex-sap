import { RouterProvider } from "react-router/dom"
import { createBrowserRouter, Navigate } from "react-router"

import Layout from "./components/Layout"
import LayoutWeb from "./components/LayoutWeb"

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

import { loginAction, signupAction } from "./web-pages/actions"
import { requireAuthLoader } from "./dashboard-pages/loaders"

const router = createBrowserRouter([
  {
    element: <LayoutWeb />,
    children: [
      { index: true, element: <Home /> },
      { path: "price-plans", element: <PricePlans /> },

      { path: "login", element: <Login />, action: loginAction },
      { path: "register", element: <Signup />, action: signupAction },
    ],
  },

  {
    path: "dashboard",
    element: <Layout />,
    id: "dashboard",
    loader: requireAuthLoader,
    children: [
      { index: true, element: <Dashboard /> },

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
