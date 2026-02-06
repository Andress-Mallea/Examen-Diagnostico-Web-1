import React, { useState, useEffect } from 'react';
import { Trash2, Plus, CheckCircle2, Circle, ClipboardList } from 'lucide-react';

export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    // Intentar cargar desde localStorage al iniciar
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("my-tasks-v1");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Guardar en localStorage automáticamente cuando la lista cambie
  useEffect(() => {
    localStorage.setItem("my-tasks-v1", JSON.stringify(todos));
  }, [todos]);

  const addTask = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    const newTodo = {
      id: crypto.randomUUID(),
      text: task,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTodos([newTodo, ...todos]);
    setTask("");
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-t-2xl p-6 shadow-sm border-b border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <ClipboardList className="w-6 h-6 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Mis Tareas</h1>
          </div>
          <p className="text-slate-500 text-sm">
            {todos.length > 0 
              ? `${completedCount} de ${todos.length} tareas completadas`
              : "No tienes tareas pendientes"}
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white p-6 shadow-sm">
          <form onSubmit={addTask} className="flex gap-2">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="¿Qué necesitas hacer hoy?"
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              disabled={!task.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors shadow-lg shadow-indigo-200"
            >
              <Plus className="w-6 h-6" />
            </button>
          </form>
        </div>

        {/* List Section */}
        <div className="bg-white rounded-b-2xl shadow-sm overflow-hidden">
          <ul className="divide-y divide-slate-100">
            {todos.length === 0 ? (
              <li className="p-12 text-center">
                <div className="flex flex-col items-center gap-2 opacity-20">
                  <ClipboardList className="w-12 h-12" />
                  <p className="font-medium">Lista vacía</p>
                </div>
              </li>
            ) : (
              todos.map((todo) => (
                <li 
                  key={todo.id} 
                  className="group flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                >
                  <div 
                    className="flex items-center gap-3 flex-1 cursor-pointer"
                    onClick={() => toggleTodo(todo.id)}
                  >
                    {todo.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-300 shrink-0 group-hover:text-indigo-400" />
                    )}
                    <span className={`text-slate-700 transition-all ${todo.completed ? 'line-through text-slate-400' : ''}`}>
                      {todo.text}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Eliminar tarea"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Footer info */}
        <p className="mt-8 text-center text-slate-400 text-xs uppercase tracking-widest font-semibold">
          Hecho con React & Tailwind
        </p>
      </div>
    </div>
  );
}
