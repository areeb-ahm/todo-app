
import { useState } from 'react'


export default function AddTodoForm({ onAdd }) {
	const [inputValue, setInputValue] = useState('')
	const [dueDate, setDueDate] = useState('')
	const [error, setError] = useState('')

	function handleSubmit(e) {
	const [priority, setPriority] = useState('medium')

	const PRIORITY_ACTIVE = {
	  low: 'bg-emerald-600 text-white',
	  medium: 'bg-yellow-600 text-white',
	  high: 'bg-red-600 text-white'
	}
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
		onAdd(trimmed, dueDate)
		setInputValue('')
		onAdd(trimmed, dueDate, priority)
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

