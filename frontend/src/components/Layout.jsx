import { useMemo } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Outlet } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Sidebar from './Sidebar'

const drawerWidth = 260

function Layout() {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          background: {
            default: '#f5f7fb',
          },
          primary: {
            main: '#123a6e',
          },
          secondary: {
            main: '#0f5d96',
          },
        },
        shape: { borderRadius: 12 },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
              },
            },
          },
        },
      }),
    [],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
        <AppBar
          position="fixed"
          color="primary"
          sx={{ zIndex: (muiTheme) => muiTheme.zIndex.drawer + 1, boxShadow: 'none' }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: 'none',
              backgroundColor: '#0f4d8f',
              color: '#ffffff',
            },
          }}
        >
          <Toolbar />
          <Sidebar />
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Layout
