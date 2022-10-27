import { useState } from 'react';
import ScheduleSelector from '../../../molecule/schedule-selector/ScheduleSelector';
import Card from '../card/Card';
import style from './style.module.scss';

interface Props {
  schedules: Schedule[];
  cardIdx: number;
  onChangeSchedule: (
    cardIdx: number,
    scheduleIdx: number,
    schedule: Schedule
  ) => void;
  onDeleteSchedule: (cardIdx: number, scheduleIdx: number) => void;
}
export default function ScheduleCard(props: Props) {
  const { onChangeSchedule, cardIdx, schedules, onDeleteSchedule } = props;
  const [scheduleSelectorNum, setScheduleSelectorNum] = useState(1);
  return (
    <Card>
      {schedules.map((schedule, idx) => (
        <ScheduleSelector
          key={idx}
          from={schedule.from}
          to={schedule.to}
          onDeleteSchedule={onDeleteSchedule}
        />
      ))}
      <div className={style.scheduleCard}>
        <div className={style.addButtonWrapper}>
          <div
            className={style.addButton}
            onClick={() => {
              onChangeSchedule(cardIdx, schedules.length + 1, {
                from: '00:00',
                to: '00:00'
              });
            }}
          >
            +
          </div>
        </div>
      </div>
    </Card>
  );
}
