use tauri_app_lib::grpc;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    grpc::start_server().await
}
