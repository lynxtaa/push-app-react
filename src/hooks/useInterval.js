import { useEffect, useRef } from 'react'

export default function useInterval(callback, delay) {
	const savedCallback = useRef()

	useEffect(() => {
		savedCallback.current = callback
	})

	useEffect(() => {
		if (delay !== null) {
			const id = setInterval(() => savedCallback.current(), delay)
			return () => clearInterval(id)
		}
	}, [delay])
}
