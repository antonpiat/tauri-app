use sqlx::PgPool;
use tonic::{Request, Response, Status};
use crate::pb::auth::{auth_service_server, AuthResponse, AuthSignUpRequest, GetUserRequest, LoginRequest};

#[derive(Debug)]
pub struct AuthService {
    jwt_secret: String,
    db_pool: PgPool,
}

impl AuthService {
    pub fn new(jwt_secret: String, db_pool: PgPool) -> Self {
        Self {
            jwt_secret,
            db_pool,
        }
    }
}

struct TokenAuthResponse {
    access_token: String,
    refresh_token: String,
    expires_in: u64,
}

#[derive(serde::Serialize)]
struct Claims {
    sub: String,
    exp: usize,
    iat: usize,
}

#[tonic::async_trait]
impl auth_service_server::AuthService for AuthService {
    async fn register(&self, request: Request<AuthSignUpRequest>) -> Result<Response<AuthResponse>, Status> {
        todo!()
    }

    async fn login(&self, request: Request<LoginRequest>) -> Result<Response<AuthResponse>, Status> {
        todo!()
    }
    
    async fn get_user(&self, request: Request<GetUserRequest>) -> Result<Response<AuthResponse>, Status> {
        todo!()
    }
}