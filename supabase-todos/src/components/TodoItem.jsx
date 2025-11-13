// TODO: Componente que muestra un todo individual
// Recibe: { todo, onToggle, onDelete }

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <input type="checkbox" />
      <span>{todo.text}</span>
      <button>Eliminar</button>
    </li>
  );
}
