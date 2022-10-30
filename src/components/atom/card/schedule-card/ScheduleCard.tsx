import ScheduleSelector from '../../../molecule/schedule-selector/ScheduleSelector';
import AddButton from '../../button/add-button/AddButton';
import BasicButton from '../../button/basic-button/BasicButton';
import FadeIn from '../../button/fade-in/FadeIn';
import Card from '../card/Card';
import style from './style.module.scss';
import { useState } from 'react';
import { DateTime } from 'luxon';
import ValidationUtils from '../../../../utils/ValidationUtils';
import Swal from 'sweetalert2';

interface Props {
  schedules: Schedule[];
  onAddSchedule: () => void;
  onDeleteSchedule: (scheduleId: string) => void;
  onChange: (schedultTime: ScheduleTime) => void;
  onStartWithSchedule: (schedules: Schedule[]) => void;
}
export default function ScheduleCard(props: Props) {
  const {
    onChange,
    onStartWithSchedule,
    onAddSchedule,
    schedules,
    onDeleteSchedule
  } = props;

  const [isScheduled, setIsScheduled] = useState(false);

  const onAddButtonClick = () => {
    onAddSchedule();
  };

  // スケジューラー起動処理
  const onDispatchSchedule = () => {
    // 入力バリデーション
    // // 同じ値の入力
    const invalidCombination = schedules.find((schedule) => {
      const sameFrom = schedules.find((s) => s.from === schedule.from);
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
    const invalidValue = schedules.find((schedule) => {
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
    // スケジュールされている時間帯に別のスケジュールの時間帯がかぶってたらエラー
    const invalidFrom = schedules.find((schedule) => {
      const invalidSchedule = schedules.find((s) => {
        // 自分自身のチェックはしない
        if (schedule.id === s.id) {
          return false;
        }
        return !ValidationUtils.rangeIsValid(schedule.from, s.from, s.to);
      });
      return !!invalidSchedule;
    });
    const invalidTo = schedules.find((schedule) => {
      const invalidSchedule = schedules.find((s) => {
        // 自分自身のチェックはしない
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

    // 開始時刻を過ぎているスケジュールがある場合はエラー
    const isTimeUp = schedules.filter((schedule) => {
      const from = DateTime.fromFormat(
        DateTime.now().toFormat('yyyy-MM-dd') + ' ' + schedule.from,
        'yyyy-MM-dd HH:mm'
      );
      console.log(from.diff(DateTime.now(), 'minute').minutes);
      return from.diff(DateTime.now(), 'minute').minutes < 0;
    });
    if (isTimeUp.length > 0) {
      Swal.fire(
        '設定エラー',
        '起動時刻を過ぎているスケジュールがあります。',
        'error'
      );
      return;
    }

    // 起動
    onStartWithSchedule(schedules);

    // 起動成功ダイアログ表示
    Swal.fire('起動完了', '設定されたスケジュールで起動します。', 'success');
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
