import { useState } from 'react';

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState('');
  const [importance, setImportance] = useState('media');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, importance);
    setText('');
    setImportance('media');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nueva tarea..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={importance} onChange={e => setImportance(e.target.value)}>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
      <button type="submit">Añadir</button>
    </form>
  );
}
