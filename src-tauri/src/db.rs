use dotenvy::dotenv;
use sqlx::{Pool, Postgres};
use sqlx::postgres::PgPoolOptions;

pub async fn create_db_pool() -> Pool<Postgres> {
    dotenv().ok();
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Cannot connect to database")
}