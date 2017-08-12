export function loadState() {
	const serialized = localStorage.getItem('state')
	return serialized ? JSON.parse(serialized) : {}
}

export function saveState(state) {
	const serialized = JSON.stringify(state)
	localStorage.setItem('state', serialized)
}
