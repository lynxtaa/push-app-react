import React from 'react'
import PropTypes from 'prop-types'

const TimerLabel = ({ children, onClick }) =>
	<label className="btn btn-outline-info" onClick={onClick}>{children}</label>

TimerLabel.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
}

export default TimerLabel
