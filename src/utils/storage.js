import { v4 as uuidv4 } from 'uuid'

export function getTodos() {
	const raw = localStorage.getItem('todos')
	if (!raw) return []
	try {
		const parsed = JSON.parse(raw)
		return Array.isArray(parsed) ? parsed : []
	} catch (_) {
		return []
	}
}

export function saveTodos(todos) {
	try {
		localStorage.setItem('todos', JSON.stringify(todos))
	} catch (_){ }
}

export function generateId() {
	return uuidv4()
}

