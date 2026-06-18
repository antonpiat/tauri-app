use dotenvy::dotenv;
use tonic::transport::Server;
use tonic_web::GrpcWebLayer;
use tower_http::cors::{Any, CorsLayer};

use crate::db::create_db_pool;
use crate::pb::auth::auth_service_server::AuthServiceServer;
use crate::pb::todo::todo_service_server::TodoServiceServer;
use crate::services::auth::AuthService;
use crate::services::todo::TodoService;

pub fn spawn() {
    std::thread::spawn(|| {
        let rt = tokio::runtime::Runtime::new().expect("Failed to create Tokio runtime");
        if let Err(e) = rt.block_on(start_server()) {
            eprintln!("gRPC server error: {e}");
        }
    });
}

pub async fn start_server() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();

    let address = "[::1]:50051".parse()?;
    let db_pool = create_db_pool().await;

    let auth_service = AuthService::new("jwt_secret".to_string(), db_pool);
    let todo_service = TodoService::default();

    Server::builder()
        .accept_http1(true)
        .layer(
            CorsLayer::new()
                .allow_origin(Any)
                .allow_methods(Any)
                .allow_headers(Any),
        )
        .layer(GrpcWebLayer::new())
        .add_service(AuthServiceServer::new(auth_service))
        .add_service(TodoServiceServer::new(todo_service))
        .serve(address)
        .await?;

    Ok(())
}
