import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  show: boolean;
}
export const Running = (props: Props) => {
  return (
    <div style={{ height: '1rem', display: props.show ? 'block' : 'none' }}>
      <Grid container justifyContent="center">
        <Grid style={{ marginTop: '40px', marginBottom: 0 }}>
          <CircularProgress />
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid style={{ marginTop: '10px', marginBottom: '10px' }}>実行中</Grid>
      </Grid>
    </div>
  );
};
