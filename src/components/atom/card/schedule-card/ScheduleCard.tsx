import ScheduleSelector from '../../../molecule/schedule-selector/ScheduleSelector';
import AddButton from '../../button/add-button/AddButton';
import BasicButton from '../../button/basic-button/BasicButton';
import FadeIn from '../../button/fade-in/FadeIn';
import Card from '../card/Card';
import style from './style.module.scss';

interface Props {
  schedules: Schedule[];
  cardId: string;
  onAddSchedule: (cardId: string) => void;
  onDeleteSchedule: (cardId: string, scheduleId: string) => void;
}
export default function ScheduleCard(props: Props) {
  const { onAddSchedule, cardId, schedules, onDeleteSchedule } = props;
  const onAddButtonClick = () => {
    onAddSchedule(cardId);
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
              from={schedule.from}
              to={schedule.to}
              onDeleteSchedule={() => {
                onDeleteSchedule(cardId, schedule.id);
              }}
            />
          </FadeIn>
        );
      })}
      <div className={style.startButtonWrapper}>
        <BasicButton
          text="このスケジュールで起動する"
          onClick={() => {
            alert();
          }}
        />
      </div>
    </Card>
  );
}
