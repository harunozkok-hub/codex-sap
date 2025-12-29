import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'

function Finance() {
  return (
    <Card elevation={0} sx={{ border: '1px solid #e8edf5' }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <MonetizationOnOutlinedIcon color="primary" />
          <div>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Finance
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Review revenue, expenses, and financial health metrics.
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Finance
