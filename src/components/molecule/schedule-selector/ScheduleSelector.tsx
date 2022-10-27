import { HOURS, MINUTES } from '../../../consts/time';
import style from './style.module.scss';
import HourSelect from '../../atom/hour-select/HourSelect';
import MinuteSelect from '../../atom/minute-select/MinuteSelect';

const ScheduleSelector = () => {
  return (
    <>
      <div className={style.timeSelector}>
        <div>
          <HourSelect dataList={HOURS} placeHolderText="時" />
        </div>
        <div>
          <MinuteSelect dataList={MINUTES} placeHolderText="分" />
        </div>
        <div>～</div>
        <div>
          <HourSelect dataList={HOURS} placeHolderText="時" />
        </div>
        <div>
          <MinuteSelect dataList={MINUTES} placeHolderText="分" />
        </div>
        <div className={style.remove}>削除</div>
      </div>
    </>
  );
};

export default ScheduleSelector;
