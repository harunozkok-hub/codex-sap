import { useMemo, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const menuItems = [
  {
    id: 'home',
    label: 'Home',
    icon: <HomeOutlinedIcon />,
    children: [{ label: 'Dashboard', path: '/' }],
  },
  {
    id: 'products',
    label: 'Products',
    icon: <Inventory2OutlinedIcon />,
    children: [{ label: 'View Products', path: '/products' }],
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: <ShoppingCartOutlinedIcon />,
    children: [{ label: 'Manage Orders', path: '/orders' }],
  },
  {
    id: 'logistics',
    label: 'Logistics',
    icon: <LocalShippingOutlinedIcon />,
    children: [{ label: 'Logistics Overview', path: '/logistics' }],
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: <MonetizationOnOutlinedIcon />,
    children: [{ label: 'Finance Summary', path: '/finance' }],
  },
  {
    id: 'sales',
    label: 'Sales Stats',
    icon: <ShowChartOutlinedIcon />,
    children: [{ label: 'Sales Performance', path: '/sales-stats' }],
  },
]

function Sidebar() {
  const location = useLocation()
  const initialOpenState = useMemo(
    () =>
      menuItems.reduce((acc, item) => {
        acc[item.id] = true
        return acc
      }, {}),
    [],
  )
  const [openSections, setOpenSections] = useState(initialOpenState)

  const handleToggle = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ py: 2 }}>
        <Avatar sx={{ bgcolor: 'secondary.main', width: 40, height: 40 }}>A</Avatar>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Admin
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Operations
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

      <List sx={{ color: '#ffffff', pt: 1, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <Box key={item.id}>
            <ListItemButton
              onClick={() => handleToggle(item.id)}
              sx={{
                borderRadius: 1.5,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
              {openSections[item.id] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openSections[item.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.children.map((child) => {
                  const selected = location.pathname === child.path
                  return (
                    <ListItemButton
                      key={child.label}
                      component={RouterLink}
                      to={child.path}
                      selected={selected}
                      sx={{
                        pl: 5,
                        borderRadius: 1.5,
                        my: 0.25,
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(255,255,255,0.16)',
                        },
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                      }}
                    >
                      <ListItemIcon sx={{ color: 'inherit', minWidth: 32 }}>
                        <IconButton
                          edge="start"
                          size="small"
                          disableRipple
                          sx={{ color: 'inherit', p: 0.5 }}
                        >
                          <AssignmentOutlinedIcon fontSize="small" />
                        </IconButton>
                      </ListItemIcon>
                      <ListItemText primary={child.label} />
                    </ListItemButton>
                  )
                })}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  )
}

export default Sidebar
