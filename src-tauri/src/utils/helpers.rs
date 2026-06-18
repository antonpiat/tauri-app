use crate::pb::auth::AuthStatus;

pub fn auth_status_to_string(status: AuthStatus) -> &'static str {
    match status {
        AuthStatus::Pending => "PENDING",
        AuthStatus::Completed => "COMPLETED",
    }
}