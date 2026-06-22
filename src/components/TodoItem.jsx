
import { useState, useEffect } from 'react'

const PRIORITY_COLORS = { low: 'bg-emerald-400', medium: 'bg-yellow-400', high: 'bg-red-400' }

export default function TodoItem({ todo, isEditing, onToggle, onDelete, onEditStart, onEditSave, onEditCancel }) {
	const [editText, setEditText] = useState(todo?.text ?? '')
	const [error, setError] = useState('')

	useEffect(() => {
		if (isEditing) {
			setEditText(todo?.text ?? '')
			setError('')
		}
	}, [isEditing, todo])

	if (isEditing) {
		return (
			<div className="flex items-center gap-2 bg-slate-800 border border-blue-500 rounded-xl px-4 py-3">
				<div className="flex-1">
					<input
						type="text"
						value={editText}
						onChange={(e) => { setError(''); setEditText(e.target.value) }}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								const trimmed = String(editText ?? '').trim()
								if (trimmed.length === 0) {
									onDelete(todo.id)
									return
								}
								if (trimmed.length > 120) {
									setError('Too long')
									return
								}
								onEditSave(todo.id, editText)
							}
							if (e.key === 'Escape') onEditCancel()
						}}
						className="w-full bg-transparent text-white text-sm focus:outline-none"
						autoFocus
					/>
					{error !== '' && <p className="text-xs text-red-400 mt-1">{error}</p>}
				</div>
				<button onClick={() => {
					const trimmed = String(editText ?? '').trim()
					if (trimmed.length === 0) { onDelete(todo.id); return }
					if (trimmed.length > 120) { setError('Too long'); return }
					onEditSave(todo.id, editText)
				}} className="text-xs text-emerald-400 hover:text-emerald-300 px-2 py-1 cursor-pointer">Save</button>
				<button onClick={onEditCancel} className="text-xs text-slate-400 hover:text-white px-2 py-1 cursor-pointer">Cancel</button>
			</div>
		)
	}

	return (
		<div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 group hover:border-slate-600 transition-colors">
			<div className={`w-2 h-2 rounded-full shrink-0 ${PRIORITY_COLORS[todo.priority] || 'bg-slate-500'}`}></div>
			<button
				onClick={() => onToggle(todo.id)}
				className={
					"shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer " +
					(todo.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-500 hover:border-blue-400')
				}
			>
				{todo.completed ? <span className="text-white text-xs">✓</span> : null}
			</button>

			<span className={"flex-1 text-sm " + (todo.completed ? 'line-through text-slate-500' : 'text-white')}>
				{todo.text}
			</span>

			{todo.dueDate && (
				<span className={`text-xs ml-2 ${new Date(todo.dueDate) < new Date() && !todo.completed ? 'text-red-400' : 'text-slate-500'}`}>
					Due: {new Date(todo.dueDate + 'T00:00:00').toLocaleDateString('en-PK', { month: 'short', day: 'numeric' })}
				</span>
			)}

			<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
				<button onClick={() => onEditStart(todo.id)} className="text-xs text-slate-400 hover:text-blue-400 px-2 py-1 rounded cursor-pointer">Edit</button>
				<button onClick={() => onDelete(todo.id)} className="text-xs text-slate-400 hover:text-red-400 px-2 py-1 rounded cursor-pointer">Delete</button>
			</div>
		</div>
	)
}

