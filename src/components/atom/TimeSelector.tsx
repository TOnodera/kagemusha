import { MenuItem, Select } from '@mui/material';
import { HOURS, MINUTES } from '../../consts/time';
import { useState } from 'react';
const TimeSelector = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  return (
    <>
      <Select value={hour} onChange={(e) => setHour(e.target.value as number)}>
        {HOURS.map((hour) => (
          <MenuItem key={hour} value={hour}>
            {hour}
          </MenuItem>
        ))}
      </Select>
      <span>～</span>
      <Select
        value={minute}
        onChange={(e) => setMinute(e.target.value as number)}
      >
        {MINUTES.map((minute) => (
          <MenuItem key={minute} value={minute}>
            {minute}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

const test1 = '';
const test2 = '';
const test3 = '';

export default TimeSelector;
