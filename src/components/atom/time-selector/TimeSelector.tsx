import {
  MenuItem,
  Select,
  Grid,
  Button,
  FormControl,
  InputLabel,
  FormHelperText
} from '@mui/material';
import { HOURS, MINUTES } from '../../../consts/time';
import { useState } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const TimeSelector = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  return (
    <div>
      <FormControl sx={{ m: 1, width: 50 }} variant="standard">
        <InputLabel id="demo-simple-select-helper-label">時</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="時"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 50 }} variant="standard">
        <InputLabel id="demo-simple-select-helper-label">分</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="分"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <span>～</span>
    </div>
  );
};

export default TimeSelector;
