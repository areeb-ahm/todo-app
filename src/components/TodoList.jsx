
import { useState } from 'react'
import TodoItem from './TodoItem'

export default function TodoList({ todos, editingId, onToggle, onDelete, onEditStart, onEditSave, onEditCancel, onReorder }) {
	const [draggedId, setDraggedId] = useState(null)
	const [dragOverId, setDragOverId] = useState(null)

	if (!Array.isArray(todos) || todos.length === 0) {
		return (
			<div className="text-center py-16 text-slate-500">
				<div className="text-4xl mb-3">✓</div>
				<p className="text-sm">No tasks here.</p>
			</div>
		)
	}

	return (
		<div className="space-y-2">
			{todos.map((todo) => (
				<div
					key={todo.id}
					draggable
					onDragStart={() => setDraggedId(todo.id)}
					onDragOver={(e) => { e.preventDefault(); setDragOverId(todo.id) }}
					onDrop={() => {
						if (!draggedId || draggedId === todo.id) return
						const from = todos.findIndex((t) => t.id === draggedId)
						const to = todos.findIndex((t) => t.id === todo.id)
						const reordered = [...todos]
						const [moved] = reordered.splice(from, 1)
						reordered.splice(to, 0, moved)
						if (typeof onReorder === 'function') onReorder(reordered)
						setDraggedId(null)
						setDragOverId(null)
					}}
					onDragEnd={() => { setDraggedId(null); setDragOverId(null) }}
					className={dragOverId === todo.id && draggedId !== todo.id ? 'opacity-50' : ''}
				>
					<TodoItem
						todo={todo}
						isEditing={editingId === todo.id}
						onToggle={onToggle}
						onDelete={onDelete}
						onEditStart={onEditStart}
						onEditSave={onEditSave}
						onEditCancel={onEditCancel}
					/>
				</div>
			))}
		</div>
	)
}

