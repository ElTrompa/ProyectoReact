import { useState, useEffect, useCallback } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../services/todosApi';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderBy, setOrderBy] = useState('created_at');
  const [ascending, setAscending] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTodos(orderBy, ascending);
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [orderBy, ascending]);

  const create = async (text, importance = 'media') => {
    try {
      const newTodo = await addTodo(text, importance);
      setTodos(prev => [newTodo, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggle = async (id, currentDone) => {
    try {
      const updated = await updateTodo(id, !currentDone);
      setTodos(prev =>
        prev.map(t => (t.id === id ? updated : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, [load]);

  return { todos, loading, error, create, toggle, remove, setOrderBy, setAscending };
}
