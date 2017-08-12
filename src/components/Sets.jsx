import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

import { getSets } from '../store/scheduleSelectors'

import NavPills from './NavPills'
import PushList from './PushList'

const linkFromDay = week => day => ({ link: `/${week}/${day}`, text: `Day ${day}` })

const Sets = ({ match }) => {
	const { day, week } = match.params

	return day ? (
		<div>
			<NavPills links={[1, 2, 3].map(linkFromDay(week))} />
			<PushList sets={getSets(week, day)} />
		</div>
	) : <Redirect to={`/${week}/1`} />
}

Sets.propTypes = {
	match: PropTypes.object.isRequired,
}

export default Sets
