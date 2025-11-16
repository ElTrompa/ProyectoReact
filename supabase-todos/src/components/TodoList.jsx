import TodoItem from './TodoItem';

export default function TodoList({ items, onToggle, onDelete }) {
  return (
    <ul>
      {items.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
