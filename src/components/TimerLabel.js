import React from 'react'
import PropTypes from 'prop-types'

const TimerLabel = ({ children, onClick }) => (
	<button className="btn btn-outline-info" onClick={onClick} type="button">
		{children}
	</button>
)

TimerLabel.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
}

export default TimerLabel
