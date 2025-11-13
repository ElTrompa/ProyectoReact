// TODO: Componente con un input y botón "Añadir"
// Recibe por props onAdd(text)

export default function AddTodo({ onAdd }) {
  return (
    <form>
      <input placeholder="Nueva tarea..." />
      <button type="submit">Añadir</button>
    </form>
  );
}
