import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import './App.css';

function App() {
  const durationTime = 60 * 1000; // 1分に一回押下する
  const [isBusy, setIsBusy] = useState(false);
  const [timerId, setTimerId] = useState(null as unknown as NodeJS.Timer);

  // tauriコマンド実行
  const pressControlKey = async () => {
    await invoke('press_control_key');
  };

  // コントロールキー押下プロセス開始
  const startPressControlKeyProcess = () => {
    setIsBusy(true);
    const id = setInterval(() => {
      pressControlKey();
    }, durationTime);
    setTimerId(id);
  };

  // コントロールキー押下プロセス停止
  const stopPressControlKeyProcess = () => {
    if (isBusy) {
      setIsBusy(false);
      clearInterval(timerId);
    }
  };

  return (
    <>
      <div>
        <button type="button" onClick={startPressControlKeyProcess}>
          起動する
        </button>
        <button type="button" onClick={stopPressControlKeyProcess}>
          停止する
        </button>
      </div>
    </>
  );
}

export default App;
