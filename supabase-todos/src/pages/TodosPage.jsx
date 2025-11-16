import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import { useTodos } from '../hooks/useTodos';

export default function TodosPage() {
  const { todos, loading, error, create, toggle, remove } = useTodos();

  return (
    <main>
      <h1>To-Do App</h1>

      <AddTodo onAdd={create} />

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <TodoList items={todos} onToggle={toggle} onDelete={remove} />
    </main>
  );
}
