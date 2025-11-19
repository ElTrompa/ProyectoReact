# 📝 To-Do App React + Supabase

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=flat-square&logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-BaaS-3ECF8E?style=flat-square&logo=supabase)
![Node](https://img.shields.io/badge/Node-18+-339933?style=flat-square&logo=node.js)

**App To-Do funcional con React, Vite y Supabase (PostgreSQL)**

## ✨ Funcionalidades

✅ Crear tareas | 📋 Listar | ✏️ Editar estado | 🗑️ Eliminar | ☁️ Sincronizado

## 🚀 Instalación rápida

### 1. Clonar y dependencias
```bash
git clone https://github.com/ElTrompa/supabase-todos.git
cd supabase-todos
npm install
```

### 2. Variables de entorno (`.env`)
```env
VITE_SUPABASE_URL=https://tuproyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tuAnonKey
```

Obtén las claves en Supabase: **Settings → API**

### 3. Crear/actualizar base de datos
En Supabase → **SQL Editor → New Query** copie y ejecute las siguientes sentencias.

Si aún no tienes la tabla `todos`, crea la estructura base:

```sql
create extension if not exists pgcrypto;

create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.todos enable row level security;

drop policy if exists "todos_read_all" on public.todos;
drop policy if exists "todos_insert_all" on public.todos;
drop policy if exists "todos_update_all" on public.todos;
drop policy if exists "todos_delete_all" on public.todos;

create policy "todos_read_all"   on public.todos for select using (true);
create policy "todos_insert_all" on public.todos for insert with check (true);
create policy "todos_update_all" on public.todos for update using (true);
create policy "todos_delete_all" on public.todos for delete using (true);
```

Si tu aplicación utiliza la columna `importance` (ordenar por importancia, o guardarla al crear), añade la columna con:

```sql
-- Agrega la columna 'importance' con valor por defecto 'media'
ALTER TABLE public.todos
ADD COLUMN IF NOT EXISTS importance TEXT DEFAULT 'media';

-- Si quieres que nunca sea NULL:
ALTER TABLE public.todos
ALTER COLUMN importance SET NOT NULL;
```

> Nota: después de aplicar cambios de esquema en Supabase, reinicia el servidor de desarrollo para que el cliente re-levante la caché de esquema.

### 4. Ejecutar
```bash
npm run dev
```

🎉 Disponible en `http://localhost:5173`

## ⚠️ Problemas conocidos y soluciones

- Error: "Could not find the 'importance' column of 'todos' in the schema cache"
  - Causa: la tabla `todos` en la base de datos no contiene la columna `importance`, o el cliente Supabase tiene una caché de esquema desactualizada.
  - Solución rápida: ejecutar la sentencia SQL anterior para añadir `importance`, luego reiniciar el dev server (`npm run dev`).
  - Solución temporal aplicada en el cliente: `src/services/todosApi.js` incluye ahora un fallback que, si la inserción falla por ausencia de `importance`, reintenta la inserción sin esa columna para que la app no se rompa hasta aplicar la migración en la DB.

- Error al eliminar: "Cannot coerce the result to a single JSON object"
  - Causa: Supabase a veces devuelve un array con las filas borradas; usar `.single()` obliga a convertir a objeto único y falla si la respuesta es un array.
  - Solución aplicada: `src/services/todosApi.js` maneja la respuesta de `delete` sin `.single()` y devuelve la primera fila borrada si la respuesta viene como array.

## 📁 Estructura del proyecto

```
src/
├── services/       # supabaseClient.js, todosApi.js
├── hooks/          # useTodos.js
├── components/     # AddTodo, TodoList, TodoItem
├── pages/          # TodosPage.jsx
└── App.jsx
```

## 🛠️ Depuración rápida

- Reiniciar dev server después de cambios en el esquema de Supabase:

```powershell
cd .\supabase-todos\
npm run dev
```

- Si sigues viendo errores, revisa la consola del navegador y la salida de Vite para más detalles.

## 👤 Autor

**Andreu Rosell Izquierdo** | 🎓 DAM | 📅 Nov 2025