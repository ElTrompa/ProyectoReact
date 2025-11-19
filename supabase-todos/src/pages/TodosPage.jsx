import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import { useTodos } from '../hooks/useTodos';

export default function TodosPage() {
  const { todos, loading, error, create, toggle, remove, setOrderBy, setAscending } = useTodos();
  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
    setAscending(e.target.value === 'importance'); // importancia: alta primero
  };

  return (
    <main>
      <h1>To-Do App</h1>

      <AddTodo onAdd={create} />

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="order-select">Ordenar por: </label>
        <select id="order-select" onChange={handleOrderChange}>
          <option value="created_at">Fecha de creación</option>
          <option value="importance">Importancia</option>
        </select>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <TodoList items={todos} onToggle={toggle} onDelete={remove} />
    </main>
  );
}
