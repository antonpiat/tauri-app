fn main() -> Result<(), Box<dyn std::error::Error>> {
    tauri_build::build();

    tonic_prost_build::configure()
        .type_attribute(
            "auth.User",
            "#[derive(serde::Serialize, serde::Deserialize)]",
        )
        .type_attribute(
            "todo.TodoItem",
            "#[derive(serde::Serialize, serde::Deserialize)]",
        )
        .build_server(true)
        .compile_protos(
            &[
                "../proto/auth.proto",
                "../proto/todo.proto",
                "../proto/common.proto",
            ],
            &["../proto"],
        )?;

    Ok(())
}
