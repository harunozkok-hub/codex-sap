import { SimpleGrid, Text } from "@chakra-ui/react"
import {
  FiBarChart2,
  FiDollarSign,
  FiShoppingBag,
  FiShoppingCart,
  FiTruck,
} from "react-icons/fi"
import DashboardCard from "../components/DashboardCard"

function Dashboard() {
  const cards = [
    {
      title: "Orders",
      value: "142 Orders",
      subtitle: "Weekly transactions",
      icon: <FiShoppingCart />,
      color: "blue",
    },
    {
      title: "Shipments",
      value: "24 Shipments",
      subtitle: "In transit",
      icon: <FiTruck />,
      color: "green",
    },
    {
      title: "Logistics",
      value: "12 Couriers",
      subtitle: "Active partners",
      icon: <FiShoppingBag />,
      color: "blue",
    },
    {
      title: "Finance",
      value: "$48,200",
      subtitle: "Monthly revenue",
      icon: <FiDollarSign />,
      color: "green",
    },
    {
      title: "Sales Stats",
      value: "+18% MoM",
      subtitle: "Performance growth",
      icon: <FiBarChart2 />,
      color: "blue",
    },
  ]

  return (
    <>
      <Text fontSize="xl" fontWeight="bold" mb={4} color="gray.800">
        Dashboard Overview
      </Text>
      <SimpleGrid minChildWidth="72" gap={4}>
        {cards.map((card) => (
          <DashboardCard key={card.title} {...card} />
        ))}
      </SimpleGrid>
    </>
  )
}

export default Dashboard
