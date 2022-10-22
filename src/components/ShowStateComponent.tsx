import Grid from '@mui/material/Grid';
import Pending from './atom/Pending';
import { Running } from './atom/Running';

interface Props {
  show: boolean;
}
const ShowStateComponent = (props: Props) => {
  return (
    <div>
      <Grid container justifyContent="center" style={{ height: '130px' }}>
        <Grid style={{ marginBottom: '10px' }}>
          <Running show={props.show} />
          <Pending show={!props.show} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ShowStateComponent;
