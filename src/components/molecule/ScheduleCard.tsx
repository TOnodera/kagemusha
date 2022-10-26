import { Card, CardContent, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import TimeSelector from '../atom/time-selector/TimeSelector';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
const ScheduleCard = () => {
  return (
    <Grid item xs={4}>
      <Card>
        <CardContent>
          <Grid container>
            <Grid>
              <AccessAlarmIcon color="info" />
            </Grid>
          </Grid>
          <TimeSelector />
          <Grid
            container
            justifyContent="flex-end"
            style={{ marginTop: '20px' }}
          >
            <Grid>
              <Button size="small" variant="contained" color="success">
                <AddCircleOutlineIcon />
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ScheduleCard;
