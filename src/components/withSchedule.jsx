import React from 'react'
import schedule from '../store/schedule'

function withSchedule(WrappedComponent) {
	const WithSchedule = props => <WrappedComponent {...props} schedule={schedule} />
	return WithSchedule
}

export default withSchedule
