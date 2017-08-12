import React from 'react'
import PropTypes from 'prop-types'
import withSchedule from './withSchedule'

const Sets = ({ match, schedule }) => {
	const { day, week } = match.params

	return <p>{ schedule.find(({ weekNum }) => weekNum == week).days[day - 1].join(',') }</p>
}

Sets.propTypes = {
	match: PropTypes.object.isRequired,
	schedule: PropTypes.array.isRequired,
}

export default withSchedule(Sets)
