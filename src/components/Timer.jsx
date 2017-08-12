import React from 'react'
import PropTypes from 'prop-types'

import TimerButton from './TimerButton'
import Alert from './Alert'
import toastr from 'toastr'

class Timer extends React.Component {
	constructor(props) {
		super(props)

		const [{ seconds }] = this.props.times
		this.state = { counter: seconds, countdown: seconds }

		toastr.options.positionClass = 'toast-top-center'
		toastr.options.onclick = this.resetCountdown.bind(this)

		this.handleClick = this.handleClick.bind(this)
		this.runTimer = this.runTimer.bind(this)
	}

	handleClick(value) {
		this.stopTimer()
		this.setState({ counter: value, countdown: value })
	}

	resetCountdown() {
		this.setState(prev => ({ countdown: prev.counter }))
	}

	stopTimer() {
		clearInterval(this.interval)
	}

	runTimer() {
		this.interval = setInterval(() => {
			if (this.state.countdown > 0) {
				this.setState(prev => ({ countdown: prev.countdown - 1 }))
			}
			else {
				this.stopTimer()
				toastr.info('Do next!')
			}
		}, 1000)
	}

	render() {
		const { counter, countdown } = this.state

		return (
			<div className="btn-group">
				{this.props.times.map(({ seconds, label }) => (
					<TimerButton
						active={counter == seconds}
						key={seconds}
						onClick={this.handleClick}
						value={seconds}
					>
						{label}
					</TimerButton>
				))}
				<label className="btn btn-outline-info" onClick={this.runTimer}>{countdown}</label>
			</div>
		)
	}
}

Timer.propTypes = {
	times: PropTypes.arrayOf(PropTypes.shape({
		seconds: PropTypes.number.isRequired,
		label: PropTypes.string.isRequired,
	})).isRequired,
}

export default Timer

