import AddButton from '../../atom/button/add-button/AddButton';
import style from './style.module.scss';

interface Props {
  isScheduled: boolean;
  onClick: () => void;
}
export default function AddScheduleButton(props: Props) {
  return (
    <div
      style={{ pointerEvents: props.isScheduled ? 'none' : 'auto' }}
      className={style.addScheduleButtonWrapper}
      onClick={props.onClick}
    >
      <AddButton backgroundColor={props.isScheduled ? '#777' : '#777ee3'} />
      <div className={style.buttonDescription}>スケジュールを追加</div>
    </div>
  );
}
