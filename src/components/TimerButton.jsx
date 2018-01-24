import React from 'react'
import PropTypes from 'prop-types'

class TimerButton extends React.Component {
	handleClick = () => this.props.onClick(this.props.value)

	render() {
		const { active, children } = this.props

		return (
			<label className={'btn btn-primary' + (active ? ' active' : '')} onClick={this.handleClick}>
				{children}
			</label>
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
