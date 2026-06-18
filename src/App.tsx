import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { Auth, Todos } from "./client.ts";
import { TodoItem, TodoStatus } from "./proto/todo.ts";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchTodos = () => {
    setLoading(true);
    new Todos()
      .getTodos({ userId: "user123" })
      .then((response) => {
        setTodos(response.response.items);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = () => {
    setSubmitting(true);
    new Todos()
      .addTodo({
        id: crypto.randomUUID(),
        message: name.trim() || "New Todo",
        status: "PENDING" as unknown as TodoStatus,
        userId: "user123",
      })
      .then((response) => {
        setGreetMsg(response.response.message);
        setName("");
        fetchTodos();
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
        setGreetMsg("Failed to add todo. Is the gRPC server running?");
      })
      .finally(() => setSubmitting(false));
  };

  const createUser = () => {
    new Auth()
      .register({
        username: "Antonpiat",
        email: "antonpiat11@gmail.com",
        password: "12345678",
        status: 0,
      })
      .then((response) => {
        console.log("Register fetched:", response);
        setGreetMsg("User registered successfully!");
      })
      .catch((error) => {
        console.error("Error registering users:", error);
        setGreetMsg("Registration failed. Check the console for details.");
      });
  };

  const statusColor = (status: TodoStatus) => {
    switch (status) {
      case TodoStatus.COMPLETED:
        return "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30";
      default:
        return "bg-indigo-500/15 text-indigo-400 ring-indigo-500/30";
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised/60 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            gRPC connected · [::1]:50051
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Tauri gRPC
            </span>
          </h1>
          <p className="mx-auto max-w-md text-zinc-400 text-sm leading-relaxed">
            A desktop todo app powered by Tauri, React, and an embedded gRPC server.
          </p>

          {/* Tech logos */}
          <div className="flex items-center justify-center gap-6 pt-2">
            {[
              { href: "https://vite.dev", src: "/vite.svg", alt: "Vite", hover: "hover:drop-shadow-[0_0_1.5em_#747bff]" },
              { href: "https://tauri.app", src: "/tauri.svg", alt: "Tauri", hover: "hover:drop-shadow-[0_0_1.5em_#24c8db]" },
              { href: "https://react.dev", src: reactLogo, alt: "React", hover: "hover:drop-shadow-[0_0_1.5em_#61dafb]" },
            ].map(({ href, src, alt, hover }) => (
              <a
                key={alt}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={`opacity-60 transition-all duration-300 hover:opacity-100 hover:scale-110 ${hover}`}
              >
                <img src={src} alt={alt} className="h-10 w-10" />
              </a>
            ))}
          </div>
        </header>

        {/* Status toast */}
        {greetMsg && (
          <div
            role="status"
            className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-300 backdrop-blur-sm"
          >
            {greetMsg}
          </div>
        )}

        {/* Add todo card */}
        <section className="rounded-2xl border border-border bg-surface-raised/80 p-6 shadow-xl shadow-black/20 backdrop-blur-sm">
          <h2 className="mb-4 text-lg font-semibold text-zinc-100">Add a todo</h2>
          <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
            }}
          >
            <input
              id="greet-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20"
            />
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            >
              {submitting ? "Adding…" : "Add todo"}
            </button>
          </form>
        </section>

        {/* Todo list */}
        <section className="rounded-2xl border border-border bg-surface-raised/80 p-6 shadow-xl shadow-black/20 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-100">Your todos</h2>
            <button
              onClick={fetchTodos}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-white/5 hover:text-zinc-200"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12 text-zinc-500">
              <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Loading todos…
            </div>
          ) : todos.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border py-12 text-center">
              <p className="text-zinc-500 text-sm">No todos yet. Add one above to get started.</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="group flex items-center justify-between rounded-xl border border-border bg-surface/60 px-4 py-3 transition hover:border-indigo-500/30 hover:bg-surface"
                >
                  <span className="text-sm text-zinc-200">{todo.message}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusColor(todo.status)}`}
                  >
                    {TodoStatus[todo.status]}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Auth card */}
        <section className="rounded-2xl border border-border bg-surface-raised/80 p-6 shadow-xl shadow-black/20 backdrop-blur-sm">
          <h2 className="mb-1 text-lg font-semibold text-zinc-100">Authentication</h2>
          <p className="mb-4 text-sm text-zinc-500">Register a demo user via the gRPC auth service.</p>
          <button
            onClick={createUser}
            className="rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            Register demo user
          </button>
        </section>

        <footer className="text-center text-xs text-zinc-600">
          Built with Tauri · Vite · React · Tailwind CSS
        </footer>
      </div>
    </div>
  );
}

export default App;
