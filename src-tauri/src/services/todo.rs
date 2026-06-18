use tonic::{Request, Response, Status};
use crate::pb::todo::{todo_service_server, AddTodoItemResponse, DeleteTodoRequest, DeleteTodoResponse, GetTodosRequest, GetTodosResponse, TodoItem};

#[derive(Debug, Default)]
pub struct TodoService;

#[tonic::async_trait]
impl todo_service_server::TodoService for TodoService {
    async fn add_todo(
        &self,
        request: Request<TodoItem>,
    ) -> Result<Response<AddTodoItemResponse>, Status> {
        todo!()
    }

    async fn get_todos(&self, request: Request<GetTodosRequest>) -> Result<Response<GetTodosResponse>, Status> {
        todo!()
    }

    async fn delete_todo(&self, request: Request<DeleteTodoRequest>) -> Result<Response<DeleteTodoResponse>, Status> {
        todo!()
    }
}