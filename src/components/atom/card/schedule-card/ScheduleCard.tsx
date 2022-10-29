import ScheduleSelector from '../../../molecule/schedule-selector/ScheduleSelector';
import AddButton from '../../button/add-button/AddButton';
import BasicButton from '../../button/basic-button/BasicButton';
import FadeIn from '../../button/fade-in/FadeIn';
import Card from '../card/Card';
import style from './style.module.scss';

interface Props {
  schedules: Schedule[];
  onAddSchedule: () => void;
  onDeleteSchedule: (scheduleId: string) => void;
  onDispatchSchedule: () => void;
  onChange: (schedultTime: ScheduleTime) => void;
}
export default function ScheduleCard(props: Props) {
  const {
    onChange,
    onDispatchSchedule,
    onAddSchedule,
    schedules,
    onDeleteSchedule
  } = props;
  const onAddButtonClick = () => {
    onAddSchedule();
  };
  return (
    <Card>
      <div className={style.header}>
        <div className={style.addButtonWrapper}>
          <AddButton onClick={onAddButtonClick} />
          <div className={style.buttonDescription}>スケジュールを追加</div>
        </div>
      </div>
      {schedules.map((schedule) => {
        return (
          <FadeIn key={schedule.id}>
            <ScheduleSelector
              id={schedule.id}
              from={schedule.from}
              to={schedule.to}
              onDeleteSchedule={() => {
                onDeleteSchedule(schedule.id);
              }}
              onChange={onChange}
            />
          </FadeIn>
        );
      })}
      <div className={style.startButtonWrapper}>
        <BasicButton
          text="このスケジュールで起動する"
          onClick={onDispatchSchedule}
        />
      </div>
    </Card>
  );
}
