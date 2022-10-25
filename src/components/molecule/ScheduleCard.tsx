import { Card, CardContent, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid';
import TimeSelector from '../atom/TimeSelector';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
const ScheduleCard = () => {
  return (
    <Grid item xs={4}>
      <Card>
        <CardContent>
          <div>
            <AccessAlarmIcon />
          </div>
          <TimeSelector />
          <div>
            <AddCircleOutlineIcon />
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ScheduleCard;
