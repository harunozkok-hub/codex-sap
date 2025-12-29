import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Finance from './pages/Finance'
import Logistics from './pages/Logistics'
import Orders from './pages/Orders'
import Products from './pages/Products'
import SalesStats from './pages/SalesStats'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/logistics" element={<Logistics />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/sales-stats" element={<SalesStats />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
