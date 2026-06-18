pub mod pb {
    pub mod todo {
        tonic::include_proto!("todo");
    }

    pub mod auth {
        tonic::include_proto!("auth");
    }
}

pub mod db;
pub mod grpc;
pub mod services;
pub mod utils;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    grpc::spawn();

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
