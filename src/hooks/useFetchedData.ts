import { useState, useEffect } from 'react'

export default function useFetchedData<T>(url: string): [T | null, Error | null] {
	const [data, setData] = useState<T | null>(null)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		setData(null)
		setError(null)

		const abortController = new AbortController()

		fetch(url, { signal: abortController.signal })
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Error fetching from ${response.url}: ${response.status}`)
				}

				return response.json()
			})
			.then(setData)
			.catch((err: Error) => err.name !== 'AbortError' && setError(err))

		return () => abortController.abort()
	}, [url])

	return [data, error]
}
