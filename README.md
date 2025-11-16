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

Obtén en Supabase: **Settings → API**

### 3. Crear base de datos
En Supabase → **SQL Editor → New Query**:

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

### 4. Ejecutar
```bash
npm run dev
```

🎉 Disponible en `http://localhost:5173`

## 📁 Estructura

```
src/
├── services/       # supabaseClient.js, todosApi.js
├── hooks/          # useTodos.js
├── components/     # AddTodo, TodoList, TodoItem
├── pages/          # TodosPage.jsx
└── App.jsx
```

## 👤 Autor

**Andreu Rosell Izquierdo** | 🎓 DAM | 📅 Nov 2025