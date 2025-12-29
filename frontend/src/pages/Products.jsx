import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'

function Products() {
  return (
    <Card elevation={0} sx={{ border: '1px solid #e8edf5' }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Inventory2OutlinedIcon color="primary" />
          <div>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Products
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your catalog, pricing, and availability.
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Products
