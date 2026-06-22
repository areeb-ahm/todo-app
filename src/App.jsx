import { useState } from 'react'
import { getTodos, saveTodos, generateId } from './utils/storage'
import { filterTodos, searchTodos, getStats } from './utils/filterUtils'
import Header from './components/Header'
import AddTodoForm from './components/AddTodoForm'
import FilterBar from './components/FilterBar'
import TodoList from './components/TodoList'
import StatsBar from './components/StatsBar'

export default function App() {
  const [todos, setTodos] = useState(() => getTodos())
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [editingId, setEditingId] = useState(null)

  const searched = searchTodos(todos, searchQuery)
  const displayed = filterTodos(searched, filter)
  const stats = getStats(todos)

  function handleAddTodo(text, dueDate, priority) {
    const trimmed = String(text ?? '').trim()
    if (trimmed === '') return
    const newTodo = { id: generateId(), text: trimmed, completed: false, createdAt: new Date().toISOString(), dueDate: dueDate || null, priority: priority || 'medium' }
    const newTodos = [...todos, newTodo]
    saveTodos(newTodos)
    setTodos(newTodos)
  }

  function handleToggleComplete(id) {
    const updated = todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    saveTodos(updated)
    setTodos(updated)
  }

  function handleDeleteTodo(id) {
    const remaining = todos.filter((t) => t.id !== id)
    saveTodos(remaining)
    setTodos(remaining)
  }

  function handleEditSave(id, newText) {
    const trimmed = String(newText ?? '').trim()
    if (trimmed === '') {
      handleDeleteTodo(id)
      return
    }
    const updated = todos.map((t) => (t.id === id ? { ...t, text: trimmed } : t))
    saveTodos(updated)
    setTodos(updated)
    setEditingId(null)
  }

  function handleEditStart(id) {
    setEditingId(id)
  }

  function handleEditCancel() {
    setEditingId(null)
  }

  function handleClearCompleted() {
    const remaining = todos.filter((t) => t.completed === false)
    saveTodos(remaining)
    setTodos(remaining)
  }

  function handleReorder(reordered) {
    saveTodos(reordered)
    setTodos(reordered)
  }

  return (
    <div className="min-h-screen bg-slate-900 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <Header />
        <StatsBar stats={stats} />
        <AddTodoForm onAdd={handleAddTodo} />
        <FilterBar filter={filter} onFilterChange={setFilter} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <TodoList
          todos={displayed}
          editingId={editingId}
          onToggle={handleToggleComplete}
          onDelete={handleDeleteTodo}
          onEditStart={handleEditStart}
          onEditSave={handleEditSave}
          onEditCancel={handleEditCancel}
          onReorder={handleReorder}
        />
        {stats.completed > 0 && (
          <button onClick={handleClearCompleted} className="w-full text-sm text-slate-400 hover:text-red-400 transition-colors py-2 cursor-pointer">
            Clear {stats.completed} completed task{stats.completed > 1 ? 's' : ''}
          </button>
        )}
      </div>
    </div>
  )
}
