import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';
const client = generateClient<Schema>();

function App() {
  const { signOut } = useAuthenticator();

  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
	const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

	function createTodo() {
		const content = newTodo.trim();
		if (!content) return;
		client.models.Todo.create({ content });
		setNewTodo("");
  }

  
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
		<main className="app">
			<header className="app-header">
				<h1 className="title">My Todos</h1>
				<button className="btn btn-secondary" onClick={signOut}>Sign out</button>
			</header>

			<section className="card">
				<div className="todo-input-row">
					<input
						className="input"
						type="text"
						placeholder="Add a new task..."
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") createTodo();
						}}
					/>
					<button className="btn btn-primary" onClick={createTodo}>Add</button>
				</div>

				<ul className="todo-list">
					{todos.map((todo) => (
						<li className="todo-item" key={todo.id}>
							<span className="todo-text">{todo.content}</span>
							<button
								className="icon-btn"
								aria-label="Delete todo"
								title="Delete"
								onClick={() => deleteTodo(todo.id)}
							>
								✕
							</button>
						</li>
					))}
					{todos.length === 0 && (
						<li className="empty-state">No tasks yet. Add your first task above.</li>
					)}
				</ul>
			</section>

			<footer className="app-footer">
				<span>🥳 App successfully hosted. Try creating a new todo.</span>
				<a
					className="link"
					href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates"
					target="_blank"
					rel="noreferrer"
				>
					Read the next step of the tutorial
				</a>
			</footer>
		</main>
  );
}

export default App;
