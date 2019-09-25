import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { get } from 'idb-keyval'

interface Data {
	day?: number
	week?: number
}

function Home() {
	const [day, setDay] = useState<number>()
	const [week, setWeek] = useState<number>()

	useEffect(() => {
		get<Data>('route').then(data => {
			setDay((data && data.day) || 1)
			setWeek((data && data.week) || 1)
		})
	}, [])

	return day && week ? <Redirect to={`/${week}/${day}`} /> : null
}

export default Home
