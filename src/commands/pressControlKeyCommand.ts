import { invoke } from '@tauri-apps/api/tauri';

// tauriコマンド実行
export const pressControlKey = async () => {
  await invoke('press_control_key');
};
