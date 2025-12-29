import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined'
import DashboardCard from '../components/DashboardCard'

function Dashboard() {
  const cards = [
    {
      title: 'Orders',
      value: '142 Orders',
      subtitle: 'Weekly transactions',
      icon: <ShoppingCartCheckoutOutlinedIcon />,
      color: 'primary',
    },
    {
      title: 'Shipments',
      value: '24 Shipments',
      subtitle: 'In transit',
      icon: <LocalShippingOutlinedIcon />,
      color: 'secondary',
    },
    {
      title: 'Logistics',
      value: '12 Couriers',
      subtitle: 'Active partners',
      icon: <ShoppingBagOutlinedIcon />,
      color: 'primary',
    },
    {
      title: 'Finance',
      value: '$48,200',
      subtitle: 'Monthly revenue',
      icon: <MonetizationOnOutlinedIcon />,
      color: 'secondary',
    },
    {
      title: 'Sales Stats',
      value: '+18% MoM',
      subtitle: 'Performance growth',
      icon: <ShowChartOutlinedIcon />,
      color: 'primary',
    },
  ]

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Dashboard Overview
      </Typography>
      <Grid container spacing={2.5}>
        {cards.map((card) => (
          <Grid key={card.title} item xs={12} sm={6} md={4} lg={3}>
            <DashboardCard {...card} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Dashboard
