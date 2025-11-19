export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id, todo.done)}
      />
      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <span className="item-meta">{todo.importance ? `Importancia: ${todo.importance}` : ''}</span>
      <button onClick={() => onDelete(todo.id)}>Eliminar</button>
    </li>
  );
}
