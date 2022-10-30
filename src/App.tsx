import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import './App.scss';
import Titlebar from './components/window/titlebar/Titlebar';
import ScheduleCards from './components/organization/schedule-cards/ScheduleCards';
import DefaultCard from './components/atom/card/default-card/DefaultCard';
import ContentsArea from './components/atom/contents-area/ContentsArea';
import Overlay from './components/atom/overlay/Overlay';
import Loading from './components/atom/loading/Loading';
import ErrorButton from './components/atom/button/error-button/ErrorButton';
import { DateTime } from 'luxon';

function App() {
  const durationTime = 60 * 1000; // 1分に一回押下する
  const [isRunning, setIsRunning] = useState(false);
  const [timerId, setTimerId] = useState(null as unknown as NodeJS.Timer);

  // tauriコマンド実行
  const pressControlKey = async () => {
    await invoke('press_control_key');
  };

  // コントロールキー押下プロセス開始
  const startPressControlKeyProcess = () => {
    const id = setInterval(() => {
      pressControlKey();
    }, durationTime);
    setIsRunning(true);
    setTimerId(id);
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
      const timeoutId = setTimeout(() => {
        // 「押下プロセス」
        const timerId = setInterval(() => {
          const endTime = DateTime.fromFormat(
            `${today} ${schedule.to}`,
            'yyyy-MM-dd HH:mm'
          );
          // 終了時刻過ぎたら停止
          if (0 < DateTime.now().diff(endTime, 'minute').minutes) {
            clearInterval(timerId);
            setIsRunning(false);
          }
          pressControlKey();
        }, durationTime);
        // id解放
        clearTimeout(timeoutId);
        // 状態変更
        setTimerId(timerId);
        setIsRunning(true);
      }, waitMilis);
    });
  };

  // コントロールキー押下プロセス停止
  const stopPressControlKeyProcess = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(timerId);
    }
  };

  return (
    <>
      <Titlebar />
      <ContentsArea>
        <DefaultCard onStartButton={startPressControlKeyProcess} />
        <ScheduleCards onStartWithSchedule={onStartWithSchedule} />
      </ContentsArea>
      <Overlay isDisplay={isRunning}>
        <Loading
          text="実行中"
          onClick={() => {
            stopPressControlKeyProcess();
          }}
        />
        <ErrorButton text="停止" onClick={stopPressControlKeyProcess} />
      </Overlay>
    </>
  );
}

export default App;
