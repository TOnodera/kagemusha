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
    setIsRunning(true);
    const id = setInterval(() => {
      pressControlKey();
    }, durationTime);
    setTimerId(id);
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
        <ScheduleCards />
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
