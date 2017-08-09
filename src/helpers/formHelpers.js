export function extract(handler) {
	return function(event) {
		const {name, value, type, checked} = event.target
		handler(event, name, type == 'checkbox' ? checked : value)
	}
}
