# Tauri + React + TypeScript + gRPC

A Tauri desktop app with a React frontend and an embedded gRPC server.

## Project Structure

```
tauri-app/
├── src/              # React frontend (gRPC-web client)
├── proto/            # Shared protobuf definitions
└── src-tauri/        # All Rust backend code
    ├── Cargo.toml
    ├── build.rs      # Tauri + proto compilation
    └── src/
        ├── main.rs       # Tauri entry point
        ├── lib.rs        # Tauri app + module exports
        ├── grpc.rs       # gRPC server (auto-starts with Tauri)
        ├── db.rs
        ├── services/     # auth, todo gRPC handlers
        ├── utils/
        └── bin/
            └── grpc_server.rs  # standalone server binary (optional)
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Prerequisites (Linux)

```bash
sudo apt update
sudo apt install libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libxdo-dev \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
```

## Development

```bash
# Install frontend dependencies
pnpm install

# Generate TypeScript proto clients
pnpm generate

# Run Tauri app (gRPC server starts automatically on [::1]:50051)
pnpm tauri dev

# Or run the gRPC server standalone (without Tauri UI)
cd src-tauri && cargo run --bin grpc-server
```

Set `DATABASE_URL` in a `.env` file at the project root before running.
