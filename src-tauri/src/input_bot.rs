use std::sync::mpsc;
use std::thread;

async fn press_control_key(){
    loop {
        thread::sleep(Duration::from_secs(1));
        LControlKey.press();
        LControlKey.release();
        println!("コントロールキー押下");
    }
}