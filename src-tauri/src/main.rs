#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use inputbot::KeybdKey::LControlKey;

#[tauri::command]
async fn press_control_key() {
    LControlKey.press();
    LControlKey.release();
}
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![press_control_key])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
