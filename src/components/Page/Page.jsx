import React from 'react'
import PropTypes from 'prop-types'

const Page = ({ match }) => {
	const { day, week } = match.params

	return <p>Week: { week }. Day: { day }</p>
}

Page.propTypes = {
	match: PropTypes.object.isRequired,
}

export default Page
