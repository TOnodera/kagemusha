import ScheduleSelector from '../../molecule/schedule-selector/ScheduleSelector';
import AddButton from '../../atom/button/add-button/AddButton';
import BasicButton from '../../atom/button/basic-button/BasicButton';
import FadeIn from '../../atom/button/fade-in/FadeIn';
import Card from '../../atom/card/card/Card';
import style from './style.module.scss';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import ValidationUtils from '../../../utils/ValidationUtils';
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';
import Overlay from '../../atom/overlay/Overlay';
import Loading from '../../atom/loading/Loading';
import ErrorButton from '../../atom/button/error-button/ErrorButton';
import { pressControlKey } from '../../../commands/pressControlKeyCommand';
import { DURATION } from '../../../consts/time';
import ReservedElement from '../../atom/elements/reserved-element/ReservedElement';

interface Props {
  isRunningFlag: boolean;
  setRunningFlagIsOn: () => void;
  setRunningFlagIsOff: () => void;
}
export default function ScheduleCard(props: Props) {
  const makeDefaultSchedule = (): Schedule => {
    return { id: uuid(), from: '00:00', to: '00:00' };
  };

  const { isRunningFlag, setRunningFlagIsOn, setRunningFlagIsOff } = props;
  // ステータス
  const [schedules, setSchedules] = useState([makeDefaultSchedule()]);
  const [timeoutIds, setTimeoutIds] = useState(
    [] as { scheduleId: string; timeoutId: number }[]
  );
  const [isScheduled, setIsScheduled] = useState(false);
  const [isScheduledTimerRunning, setIsScheduledTimerRunning] = useState(false);
  const [runningTimerId, setRunningTimerId] = useState({
    scheduleId: '',
    timerId: 0
  });

  // スケジュールされているかどうかの更新処理
  useEffect(() => {
    setIsScheduled(timeoutIds.length > 0);
  }, [timeoutIds]);

  // スケジュール追加時の処理
  const onAddButtonClick = () => {
    setSchedules((schedules) => {
      return [...schedules, makeDefaultSchedule()];
    });
  };

  // スケジュール削除時の処理
  const onDeleteSchedule = (scheduleId: string) => {
    // 1個しかない場合は削除させない
    const count = schedules.length;
    if (count <= 1) {
      return;
    }
    // データ更新
    setSchedules((schedules) => {
      return [...schedules.filter((schedule) => schedule.id !== scheduleId)];
    });
  };

  // セレクタ変更時の処理
  const onChange = (scheduleTime: ScheduleTime) => {
    const newSchedules: Schedule[] = schedules.map((schedule) => {
      if (schedule.id === scheduleTime.id) {
        return {
          id: scheduleTime.id,
          from: `${scheduleTime.fromHour}:${scheduleTime.fromMinute}`,
          to: `${scheduleTime.toHour}:${scheduleTime.toMinute}`
        } as Schedule;
      }
      return schedule;
    });
    setSchedules(newSchedules);
  };

  // スケジュールで起動の場合の処理
  const onStartWithSchedule = (schedules: Schedule[]) => {
    schedules.forEach((schedule) => {
      // 実行開始設定
      const today = DateTime.now().toFormat('yyyy-MM-dd');
      const startTime = DateTime.fromFormat(
        `${today} ${schedule.from}`,
        'yyyy-MM-dd HH:mm'
      );
      const waitMilis = startTime.diff(
        DateTime.now(),
        'millisecond'
      ).milliseconds;
      // 現在時刻から開始時刻までまつ
      const timeoutId = window.setTimeout(() => {
        // 「押下プロセス」
        const timerId = window.setInterval(() => {
          const endTime = DateTime.fromFormat(
            `${today} ${schedule.to}`,
            'yyyy-MM-dd HH:mm'
          );
          // 終了時刻過ぎたら停止
          if (0 < DateTime.now().diff(endTime, 'minute').minutes) {
            clearInterval(timerId);
            // 状態更新
            setRunningFlagIsOff();
            setIsScheduledTimerRunning(false);
            setTimeoutIds((timeoutIds) =>
              timeoutIds.filter((to) => to.timeoutId !== timeoutId)
            );
          }
          pressControlKey();
        }, DURATION);
        // id解放
        clearTimeout(timeoutId);
        // 状態更新
        setRunningFlagIsOn();
        setIsScheduledTimerRunning(true);
        setRunningTimerId({ scheduleId: schedule.id, timerId });
      }, waitMilis);
      setTimeoutIds((timeoutIds) => [
        ...timeoutIds,
        { scheduleId: schedule.id, timeoutId }
      ]);
    });
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

  // スケジュールで起動した処理を停止
  const onStopButtonClick = () => {
    setRunningFlagIsOff();
    setIsScheduledTimerRunning(false);
    clearInterval(runningTimerId.timerId);
    setTimeoutIds((timeoutIds) =>
      timeoutIds.filter(
        (timeoutId) => timeoutId.scheduleId !== runningTimerId.scheduleId
      )
    );
  };

  // 起動予約をキャンセルする
  const onCancelSchedule = () => {
    Swal.fire({
      title: '予約済みのスケジュールを解除しますか？',
      showCancelButton: true,
      confirmButtonText: '解除'
    }).then((result) => {
      if (result.isConfirmed) {
        // すべてのsetTimeoutをクリア
        timeoutIds.filter((timeoutId) => {
          clearTimeout(timeoutId.timeoutId);
          return false;
        });
        setTimeoutIds([]);
        setIsScheduledTimerRunning(false);
      }
    });
  };
  return (
    <>
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
        <div
          className={style.startButtonWrapper}
          style={{ display: isScheduled ? 'none' : 'block' }}
        >
          <BasicButton
            text={'このスケジュールで起動する'}
            onClick={onDispatchSchedule}
          />
        </div>
        <ReservedElement show={isScheduled} onClick={onCancelSchedule} />
      </Card>
      <Overlay isDisplay={isScheduledTimerRunning}>
        <Loading text="スケジュール実行中" />
        <ErrorButton text="停止" onClick={onStopButtonClick} />
      </Overlay>
    </>
  );
}
