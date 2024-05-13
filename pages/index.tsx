import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Authenticator } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  // useEffect(() => {
  //   const sub = client.models.Todo.observeQuery().subscribe({
  //     next: ({items}) => setTodos([...items]),
  //   });
  //   return () => sub.unsubscribe();
  // }
  // , []);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
    <main>
      <h1>My todos asldkjaslkdhalsdk </h1>
      <h1>Hello {user?.signInDetails?.loginId} </h1>
      <button onClick={signOut}>Sign out</button>
      <br />
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}><button onClick={e => deleteTodo(todo.id)}>Delete</button> {todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/gen2/start/quickstart/nextjs-pages-router/">
          Review next steps of this tutorial.
        </a>
      </div>
    </main>
      )}
    </Authenticator>
  );
}
