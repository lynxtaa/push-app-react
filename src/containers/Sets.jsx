import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { set } from 'idb-keyval'

import NavPills from '@components/NavPills'
import PushListContainer from './PushListContainer'
import useFetchedData from '../hooks/useFetchedData'

const Sets = ({ match }) => {
	const [schedule, error] = useFetchedData('/api/schedule')

	useEffect(() => {
		set('route', match.params)
	}, [match.params])

	const { day, week } = match.params

	if (error) {
		return <h2 className="text-danger">{error.message}</h2>
	}

	if (!schedule) {
		return <h2>Loading...</h2>
	}

	if (!day) {
		return <Redirect to={`/${week}/1`} />
	}

	const sets = schedule
		.find(({ weekNum }) => weekNum == week)
		.days[day - 1].map((set, i) => ({ id: `${week}-${day}-${i}`, set }))

	const links = [1, 2, 3].map(day => ({
		link: `/${week}/${day}`,
		text: `Day ${day}`,
	}))

	return (
		<div>
			<NavPills links={links} />
			<PushListContainer sets={sets} />
		</div>
	)
}

Sets.propTypes = {
	match: PropTypes.object.isRequired,
}

export default Sets
