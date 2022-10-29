import { useState } from 'react';
import ScheduleCard from '../../atom/card/schedule-card/ScheduleCard';
import { v4 as uuid } from 'uuid';
import style from './style.module.scss';
const ScheduleCards = () => {
  const makeDefaultSchedule = (): Schedule => {
    return { id: uuid(), from: '00:00', to: '00:00' };
  };
  const [scheduleCard, setScheduleCards] = useState({
    schedules: [makeDefaultSchedule()] as Schedule[]
  } as Schedules);

  // スケジュール追加時の処理
  const onAddSchedule = () => {
    setScheduleCards((scheduleCard) => {
      return { schedules: [...scheduleCard.schedules, makeDefaultSchedule()] };
    });
  };

  // スケジュール削除時の処理
  const onDeleteSchedule = (scheduleId: string) => {
    // 1個しかない場合は削除させない
    const count = scheduleCard.schedules.length;
    if (count <= 1) {
      return;
    }
    // データ更新
    setScheduleCards((scheduleCard) => {
      return {
        schedules: [
          ...scheduleCard.schedules.filter(
            (schedule) => schedule.id !== scheduleId
          )
        ]
      };
    });
  };

  // セレクタ変更時の処理
  const onChange = (scheduleTime: ScheduleTime) => {
    const schedules = scheduleCard.schedules.map((schedule) => {
      if (schedule.id === scheduleTime.id) {
        return {
          id: scheduleTime.id,
          from: `${scheduleTime.fromHour}:${scheduleTime.fromMinute}`,
          to: `${scheduleTime.toHour}:${scheduleTime.toMinute}`
        };
      }
      return schedule;
    });
    console.log(schedules);
    setScheduleCards({ schedules });
  };

  // スケジューラー起動処理
  const onDispatchSchedule = () => {
    alert('teeest');
  };

  return (
    <div className={style.scheduleCards}>
      <ScheduleCard
        onDispatchSchedule={onDispatchSchedule}
        onAddSchedule={onAddSchedule}
        onDeleteSchedule={onDeleteSchedule}
        schedules={scheduleCard.schedules}
        onChange={onChange}
      />
    </div>
  );
};

export default ScheduleCards;
