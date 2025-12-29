import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

function Orders() {
  return (
    <Card elevation={0} sx={{ border: '1px solid #e8edf5' }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <ShoppingCartOutlinedIcon color="primary" />
          <div>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Orders
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track order fulfillment, status updates, and customer details.
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Orders
