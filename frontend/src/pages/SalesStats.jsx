import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined'

function SalesStats() {
  return (
    <Card elevation={0} sx={{ border: '1px solid #e8edf5' }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <ShowChartOutlinedIcon color="primary" />
          <div>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Sales Stats
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Monitor sales performance, KPIs, and growth trends.
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default SalesStats
