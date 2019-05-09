import { useEffect, useRef } from 'react'

export default function useInterval(callback: () => void, delay: number | null) {
	const savedCallback = useRef<Function>(callback)

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
