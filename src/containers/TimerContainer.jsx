import React from 'react'
import PropTypes from 'prop-types'

import TimerButton from '@components/TimerButton'
import Alert from '@components/Alert'
import ButtonGroup from '@components/ButtonGroup'
import TimerLabel from '@components/TimerLabel'

class Timer extends React.Component {
	state = {
		countdown: this.props.times[0].seconds,
		counter: this.props.times[0].seconds,
	}

	handleClick = value => {
		this.stopTimer()
		this.setState({ counter: value, countdown: value })
	}

	resetCountdown = () => this.setState(prev => ({ countdown: prev.counter }))

	stopTimer = () => {
		clearInterval(this.interval)
		this.interval = false
	}

	toogleTimer = () => {
		if (this.interval) {
			this.stopTimer()
			this.resetCountdown()
		}
		else {
			this.interval = setInterval(() => this.state.countdown > 0 ?
				this.setState(prev => ({ countdown: prev.countdown - 1 })) :
				this.stopTimer()
			, 1000)
		}
	}

	render() {
		const { counter, countdown } = this.state

		return (
			<div className="mb-3">
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
					<TimerLabel onClick={this.toogleTimer}>{countdown}</TimerLabel>
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

