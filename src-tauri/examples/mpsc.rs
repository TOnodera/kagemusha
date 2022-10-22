use std::{
    sync::mpsc::{self, Receiver, Sender},
    thread,
    time::Duration,
};
struct PressKeyController {
    is_running: bool,
}

fn main() {
    let (tx, rx): (Sender<bool>, Receiver<bool>) = mpsc::channel();
    let mut is_running = true;
    let thread_tx = tx.clone();
    thread::spawn(move || {
        while is_running {
            is_running = rx.recv().unwrap();
            println!("listening...");
        }
    });

    thread::spawn(move || {
        let mut cnt = 0;
        while true {
            thread::sleep(Duration::from_secs(1));
            println!("送信側カウント中...");
            if cnt > 10 {
                thread_tx.send(false);
                break;
            }
        }
    });
}
