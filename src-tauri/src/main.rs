#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::{thread, time::Duration};
use tokio::sync::mpsc;

use inputbot::KeybdKey::LControlKey;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn press_control_key() {
    /*
    loop {
        thread::sleep(Duration::from_secs(1));
        LControlKey.press();
        LControlKey.release();
        println!("コントロールキー押下");
    }
    */
}

async fn async_process_model(
    mut input_rx: mpsc::Receiver<bool>,
    output_tx: mpsc::Sender<bool>,
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    while let Some(input) = input_rx.recv().await {
        output_tx.send(input).await?;
    }
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![press_control_key])
        .setup(|app| Ok(()))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
