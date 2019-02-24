import React from 'react'
import PropTypes from 'prop-types'

const TimerButton = ({ onClick, value, active, children }) => (
	<button
		className={'btn btn-primary' + (active ? ' active' : '')}
		onClick={onClick}
		type="button"
		value={value}
	>
		{children}
	</button>
)

TimerButton.propTypes = {
	active: PropTypes.bool,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
	value: PropTypes.number.isRequired,
}

TimerButton.defaultProps = { active: false }

export default TimerButton
