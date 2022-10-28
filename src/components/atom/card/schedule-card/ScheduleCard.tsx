import ScheduleSelector from '../../../molecule/schedule-selector/ScheduleSelector';
import AddButton from '../../button/add-button/AddButton';
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
  const onAddButtonClick = () => {
    onChangeSchedule(cardIdx, schedules.length + 1, {
      from: '00:00',
      to: '00:00'
    });
  };
  return (
    <Card>
      <div className={style.header}>
        <div className={style.addButtonWrapper}>
          <AddButton onClick={onAddButtonClick} />
          <div className={style.buttonDescription}>スケジュールを追加</div>
        </div>
      </div>
      {schedules.map((schedule, idx) => (
        <ScheduleSelector
          key={idx}
          from={schedule.from}
          to={schedule.to}
          onDeleteSchedule={() => {
            onDeleteSchedule(cardIdx, idx);
          }}
        />
      ))}
    </Card>
  );
}
