import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import './App.css';

function App() {
  const [isBusy, setIsBusy] = useState(true);
  const pressControlKey = async () => {
    await invoke('press_control_key');
    setIsBusy(true);
  };

  const releaseControlKey = async () => {
    await invoke('release_control_key');
    setIsBusy(false);
  };

  return (
    <>
      <div>
        <button type="button">起動する</button>
        <button type="button">停止する</button>
      </div>
    </>
  );
}

export default App;
