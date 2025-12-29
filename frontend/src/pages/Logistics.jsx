import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'

function Logistics() {
  return (
    <Card elevation={0} sx={{ border: '1px solid #e8edf5' }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <LocalShippingOutlinedIcon color="primary" />
          <div>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Logistics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Coordinate shipments, couriers, and delivery routes.
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Logistics
