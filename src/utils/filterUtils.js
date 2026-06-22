
export function filterTodos(todos, filter) {
	if (!Array.isArray(todos)) return []
	switch (filter) {
		case 'active':
			return todos.filter((t) => t.completed === false)
		case 'completed':
			return todos.filter((t) => t.completed === true)
		default:
			return todos
	}
}

export function searchTodos(todos, query) {
	if (!Array.isArray(todos)) return []
	const q = String(query ?? '').trim()
	if (q === '') return todos
	const lower = q.toLowerCase()
	return todos.filter((t) => String(t.text ?? '').toLowerCase().includes(lower))
}

export function getStats(todos) {
	const arr = Array.isArray(todos) ? todos : []
	const total = arr.length
	let active = 0
	let completed = 0
	for (const t of arr) {
		if (t && t.completed === true) completed++
		else active++
	}
	return { total, active, completed }
}

