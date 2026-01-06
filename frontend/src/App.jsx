import { Navigate, Route, Routes } from "react-router"
import Layout from "./components/Layout"
import Dashboard from "./dashboard-pages/Dashboard"
import Finance from "./dashboard-pages/Finance"
import Logistics from "./dashboard-pages/Logistics"
import Orders from "./dashboard-pages/Orders"
import Products from "./dashboard-pages/Products"
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
        <Route path="ui-settings" element={<UISettings />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="logistics" element={<Logistics />} />
        <Route path="finance" element={<Finance />} />
        <Route path="sales-stats" element={<SalesStats />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
