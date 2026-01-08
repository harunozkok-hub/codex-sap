import { Navigate, Route, Routes } from "react-router"
import Layout from "./components/Layout"

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
import LayoutWeb from "./components/LayoutWeb"

import Home from "./web-pages/Home"
import PricePlans from "./web-pages/PricePlans"
import Login from "./web-pages/Login"

function App() {
  return (
    <Routes>
      <Route element={<LayoutWeb />}>
        <Route index element={<Home />} />
        <Route path="price-plans" element={<PricePlans />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route path="dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />

        {/* Catalog */}
        <Route path="catalog">
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="bundles" element={<Bundles />} />
        </Route>

        {/* Inventory */}
        <Route path="inventory">
          <Route path="warehouses" element={<Warehouses />} />
          <Route path="stock" element={<Stock />} />
          <Route path="packaging" element={<Packaging />} />
          <Route path="samples" element={<Samples />} />
          <Route path="raw-materials" element={<RawMaterials />} />
        </Route>

        {/* Orders */}
        <Route path="orders" element={<Orders />} />

        {/* Production */}
        <Route path="production">
          <Route path="production-orders" element={<ProductionOrders />} />
          <Route path="production-timeline" element={<ProductionTimeline />} />
        </Route>

        {/* Finance / Sales / Settings */}
        <Route path="finance" element={<Finance />} />
        <Route path="sales-stats" element={<SalesStats />} />
        <Route path="ui-settings" element={<UISettings />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
