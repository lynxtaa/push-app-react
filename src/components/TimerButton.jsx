import React from 'react'
import PropTypes from 'prop-types'

class TimerButton extends React.Component {
	handleClick = () => this.props.onClick(this.props.value)

	render() {
		return (
			<button
				className={'btn btn-primary' + (this.props.active ? ' active' : '')}
				onClick={this.handleClick}
				type="button"
			>
				{this.props.children}
			</button>
		)
	}
}

TimerButton.propTypes = {
	active: PropTypes.bool,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
	value: PropTypes.number.isRequired,
}

TimerButton.defaultProps = { active: false }

export default TimerButton
