import { supabase } from './supabaseClient';

// Obtener todos
export async function getTodos() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Añadir tarea
export async function addTodo(text) {
  const { data, error } = await supabase
    .from('todos')
    .insert([{ text }])
    .select()
    .single(); 

  if (error) throw error;
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
    .select()
    .single(); 

  if (error) throw error;
  return data;
}
