import { useState, useEffect } from 'react'

export default function useFetchedData(url) {
	const [data, setData] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		setData(null)
		setError(null)

		const abortController = new AbortController()

		fetch(url, { signal: abortController.signal })
			.then(res => res.json())
			.then(setData)
			.catch(err => err.name !== 'AbortError' && setError(err))

		return () => abortController.abort()
	}, [url])

	return [data, error]
}
