import React from 'react'
import PropTypes from 'prop-types'

import TimerButton from '@components/TimerButton'
import Alert from '@components/Alert'
import ButtonGroup from '@components/ButtonGroup'
import TimerLabel from '@components/TimerLabel'

class Timer extends React.Component {
	constructor(props) {
		super(props)

		const [{ seconds }] = this.props.times
		this.state = { counter: seconds, countdown: seconds }

		this.handleClick = this.handleClick.bind(this)
		this.resetCountdown = this.resetCountdown.bind(this)
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
			}
		}, 1000)
	}

	render() {
		const { counter, countdown } = this.state

		return (
			<div>
				{countdown === 0 && <Alert onClick={this.resetCountdown}><b>Do next!</b></Alert>}

				<ButtonGroup>
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
					<TimerLabel onClick={this.runTimer}>{countdown}</TimerLabel>
				</ButtonGroup>
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

