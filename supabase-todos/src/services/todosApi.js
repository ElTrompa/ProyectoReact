import { supabase } from './supabaseClient';

// Obtener todos
export async function getTodos(orderBy = 'created_at', ascending = false) {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order(orderBy, { ascending });

  if (error) throw error;
  return data;
}

// Añadir tarea
export async function addTodo(text, importance = 'media') {
  // First try inserting with the `importance` column.
  const { data, error } = await supabase
    .from('todos')
    .insert([{ text, importance }])
    .select()
    .single(); 

  // If the database doesn't have the `importance` column (schema mismatch),
  // retry inserting without it so the app keeps working until schema is updated.
  if (error) {
    const msg = (error.message || '').toLowerCase();
    const detail = (error.details || '').toLowerCase();
    if (msg.includes('importance') || detail.includes('importance')) {
      const fallback = await supabase
        .from('todos')
        .insert([{ text }])
        .select()
        .single();

      if (fallback.error) throw fallback.error;
      return fallback.data;
    }

    throw error;
  }

  return data;
}

// Alternar tarea
export async function updateTodo(id, done) {
  const { data, error } = await supabase
    .from('todos')
    .update({ done })
    .eq('id', id)
    .select()
    .single(); 

  if (error) throw error;
  return data;
}

// Eliminar
export async function deleteTodo(id) {
  const { data, error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    const msg = (error.message || '').toLowerCase();
    // Manejar el caso donde Supabase intenta forzar un único objeto
    if (msg.includes('cannot coerce the result to a single json object') && Array.isArray(data)) {
      return data[0] || null;
    }
    throw error;
  }

  // `data` puede ser un array de filas borradas; devolver la primera fila si existe.
  if (Array.isArray(data)) return data[0] || null;
  return data;
}
