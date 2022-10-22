import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import './App.css';
import { Button } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Grid from '@mui/material/Grid';
import ShowStateComponent from './components/ShowStateComponent';
import Titlebar from './components/window/titlebar/Titlebar';

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
      <Titlebar />
      <ShowStateComponent show={isBusy} />
      <Grid container justifyContent="space-around" alignItems="center">
        <Grid item xs={4}>
          <Button
            variant="contained"
            startIcon={<PlayCircleOutlineIcon />}
            onClick={startPressControlKeyProcess}
            fullWidth={true}
          >
            起動
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            fullWidth={true}
            startIcon={<HighlightOffIcon />}
            onClick={stopPressControlKeyProcess}
          >
            停止
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
