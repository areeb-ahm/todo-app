
import { useState } from 'react'

const PRIORITY_ACTIVE = {
  low: 'bg-emerald-600 text-white',
  medium: 'bg-yellow-600 text-white',
  high: 'bg-red-600 text-white'
}

export default function AddTodoForm({ onAdd }) {
  const [inputValue, setInputValue] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('medium')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault()
    const trimmed = String(inputValue ?? '').trim()
    if (trimmed === '') {
      setError('Task cannot be empty')
      return
    }
    if (trimmed.length > 120) {
      setError('Task must be under 120 characters')
      return
    }
    setError('')
    if (typeof onAdd === 'function') onAdd(trimmed, dueDate, priority)
    setInputValue('')
    setDueDate('')
    setPriority('medium')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSubmit(e)
  }

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => { setError(''); setInputValue(e.target.value) }}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          autoFocus
        />
        {inputValue.length > 80 && (
          <p className="text-xs text-slate-500 text-right mt-1">{inputValue.length}/120</p>
        )}
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors mt-2" />
        <div className="flex gap-2 mt-2">
          {['low', 'medium', 'high'].map((level) => (
            <button key={level} onClick={() => setPriority(level)} type="button"
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer capitalize ${priority === level ? PRIORITY_ACTIVE[level] : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
              {level}
            </button>
          ))}
        </div>
        {error !== '' && <p className="text-xs text-red-400 mt-1">{error}</p>}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer shrink-0"
      >
        Add
      </button>
    </div>
  )
}

