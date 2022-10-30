import { HOURS, MINUTES } from '../../../consts/time';
import HourSelect from '../../atom/select/hour-select/HourSelect';
import MinuteSelect from '../../atom/select/minute-select/MinuteSelect';
import style from './style.module.scss';
import { useState, useEffect } from 'react';

interface Props {
  id: string;
  from: string;
  to: string;
  onDeleteSchedule: () => void;
  onChange: (scheduleTime: ScheduleTime) => void;
}
const ScheduleSelector = (props: Props) => {
  const { id, from, to, onDeleteSchedule, onChange } = props;
  const [fromHour, setFromHour] = useState(from.split(':')[0]);
  const [fromMinute, setFromMinute] = useState(from.split(':')[1]);
  const [toHour, setToHour] = useState(to.split(':')[0]);
  const [toMinute, setToMinute] = useState(to.split(':')[1]);

  useEffect(() => {
    onChange({
      id,
      fromHour,
      fromMinute,
      toHour,
      toMinute
    } as ScheduleTime);
  }, [fromHour, fromMinute, toHour, toMinute]);

  return (
    <>
      <div className={`${style.timeSelector} ${style.render}`}>
        <div>
          <HourSelect
            value={fromHour}
            dataList={HOURS}
            placeHolderText="時"
            onChange={(e) => setFromHour(e.target.value)}
          />
        </div>
        <div>
          <MinuteSelect
            value={fromMinute}
            dataList={MINUTES}
            placeHolderText="分"
            onChange={(e) => setFromMinute(e.target.value)}
          />
        </div>
        <div>～</div>
        <div>
          <HourSelect
            value={toHour}
            dataList={HOURS}
            placeHolderText="時"
            onChange={(e) => setToHour(e.target.value)}
          />
        </div>
        <div>
          <MinuteSelect
            value={toMinute}
            dataList={MINUTES}
            placeHolderText="分"
            onChange={(e) => setToMinute(e.target.value)}
          />
        </div>
        <div className={style.remove} onClick={onDeleteSchedule}>
          削除
        </div>
      </div>
    </>
  );
};

export default ScheduleSelector;
