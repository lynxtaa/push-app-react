import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { get } from 'idb-keyval'

const Home = () => {
	const [day, setDay] = useState(null)
	const [week, setWeek] = useState(null)

	useEffect(() => {
		get('route').then(data => {
			setDay((data && data.day) || 1)
			setWeek((data && data.week) || 1)
		})
	}, [])

	return day !== null && week !== null && <Redirect to={`/${week}/${day}`} />
}

export default Home
