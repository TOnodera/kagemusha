import { HOURS, MINUTES } from '../../../consts/time';
import HourSelect from '../../atom/select/hour-select/HourSelect';
import MinuteSelect from '../../atom/select/minute-select/MinuteSelect';
import style from './style.module.scss';

interface Props {
  from?: string;
  to?: string;
  onDeleteSchedule: () => void;
}
const ScheduleSelector = (props: Props) => {
  return (
    <>
      <div className={`${style.timeSelector} ${style.render}`}>
        <div>
          <HourSelect
            value={props.from ? props.from.split(':')[0] : undefined}
            dataList={HOURS}
            placeHolderText="時"
          />
        </div>
        <div>
          <MinuteSelect
            value={props.from ? props.from.split(':')[1] : undefined}
            dataList={MINUTES}
            placeHolderText="分"
          />
        </div>
        <div>～</div>
        <div>
          <HourSelect
            value={props.to ? props.to.split(':')[0] : undefined}
            dataList={HOURS}
            placeHolderText="時"
          />
        </div>
        <div>
          <MinuteSelect
            value={props.to ? props.to.split(':')[1] : undefined}
            dataList={MINUTES}
            placeHolderText="分"
          />
        </div>
        <div className={style.remove} onClick={props.onDeleteSchedule}>
          削除
        </div>
      </div>
    </>
  );
};

export default ScheduleSelector;
