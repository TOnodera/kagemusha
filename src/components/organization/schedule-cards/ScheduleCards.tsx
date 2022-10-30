import { useState } from 'react';
import ScheduleCard from '../../atom/card/schedule-card/ScheduleCard';
import { v4 as uuid } from 'uuid';
import style from './style.module.scss';
import { DateTime } from 'luxon';
import ValidationUtils from '../../../utils/ValidationUtils';
import Swal from 'sweetalert2';
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
    setScheduleCards({ schedules });
  };

  // スケジューラー起動処理
  const onDispatchSchedule = () => {
    // 入力バリデーション
    // // 同じ値の入力
    const invalidCombination = scheduleCard.schedules.find((schedule) => {
      const sameFrom = scheduleCard.schedules.find(
        (s) => s.from === schedule.from
      );
      return sameFrom?.to === schedule.to && sameFrom.id !== schedule.id;
    });
    if (invalidCombination) {
      Swal.fire(
        '設定エラー',
        '同じスケジュールが設定されているので同じ値の設定を削除してください。',
        'error'
      );
      return;
    }

    // // fromがtoより大きい値の入力
    const invalidValue = scheduleCard.schedules.find((schedule) => {
      const from = DateTime.fromFormat(schedule.from, 'HH:mm');
      const to = DateTime.fromFormat(schedule.to, 'HH:mm');
      return to.diff(from, 'minute').minutes < 0;
    });
    if (invalidValue) {
      Swal.fire(
        '設定エラー',
        '開始時刻より終了時刻が早い時間帯になっている設定があるので削除してください。',
        'error'
      );
      return;
    }

    // 選択範囲エラー
    const invalidFrom = scheduleCard.schedules.find((schedule) => {
      const invalidSchedule = scheduleCard.schedules.find((s) => {
        if (schedule.id === s.id) {
          return false;
        }
        return !ValidationUtils.rangeIsValid(schedule.from, s.from, s.to);
      });
      return !!invalidSchedule;
    });
    const invalidTo = scheduleCard.schedules.find((schedule) => {
      const invalidSchedule = scheduleCard.schedules.find((s) => {
        if (schedule.id === s.id) {
          return false;
        }
        return !ValidationUtils.rangeIsValid(schedule.to, s.from, s.to);
      });
      return !!invalidSchedule;
    });
    if (invalidFrom || invalidTo) {
      Swal.fire(
        '設定エラー',
        '重複している時間帯があるので重複しないように再設定してください。',
        'error'
      );
      return;
    }

    // データ送信
    console.log(scheduleCard.schedules);
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
